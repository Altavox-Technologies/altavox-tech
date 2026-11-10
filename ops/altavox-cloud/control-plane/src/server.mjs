import { createServer } from "node:http";
import { randomUUID, timingSafeEqual } from "node:crypto";
import { URL } from "node:url";
import { pool, ensureSchema, closePool } from "./db.mjs";
import { validSlug, validRepoUrl, validGitRef, validCommit } from "./validation.mjs";

const port = Number.parseInt(process.env.PORT ?? "8787", 10);
const apiToken = process.env.ALTAVOX_CONTROL_PLANE_TOKEN;
const maxBodyBytes = 16 * 1024;

if (!apiToken || Buffer.byteLength(apiToken) < 32) {
  throw new Error("ALTAVOX_CONTROL_PLANE_TOKEN must be set to a random secret of at least 32 bytes");
}

function authorized(req) {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice(7));
  const expected = Buffer.from(apiToken);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function send(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

async function readJson(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBodyBytes) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Invalid JSON");
    error.statusCode = 400;
    throw error;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/health/live") {
      return send(res, 200, { status: "ok", service: "altavox-cloud-control-plane" });
    }

    if (req.method === "GET" && url.pathname === "/health/ready") {
      try {
        await pool.query("SELECT 1");
        return send(res, 200, { status: "ok", database: "ok" });
      } catch {
        return send(res, 503, { status: "not_ready", database: "unavailable" });
      }
    }

    if (!authorized(req)) {
      return send(res, 401, { error: "unauthorized" });
    }

    if (req.method === "GET" && url.pathname === "/v1/deployments") {
      const limitParam = Number.parseInt(url.searchParams.get("limit") ?? "25", 10);
      const limit = Number.isInteger(limitParam) ? Math.max(1, Math.min(limitParam, 100)) : 25;
      const result = await pool.query(
        "SELECT id, project_slug, repository_url, git_ref, commit_sha, status, requested_at, updated_at, error_code FROM cloud_deployments ORDER BY requested_at DESC LIMIT $1",
        [limit],
      );
      return send(res, 200, { data: result.rows });
    }

    if (req.method === "POST" && url.pathname === "/v1/deployments") {
      const body = await readJson(req);
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return send(res, 400, { error: "json_object_required" });
      }
      const projectSlug = body.projectSlug;
      const repositoryUrl = body.repositoryUrl;
      const gitRef = body.gitRef;
      const commitSha = typeof body.commitSha === "string" ? body.commitSha.toLowerCase() : body.commitSha;
      const idempotencyKey = req.headers["idempotency-key"];

      if (!validSlug(projectSlug)) return send(res, 400, { error: "invalid_project_slug" });
      if (!validRepoUrl(repositoryUrl)) return send(res, 400, { error: "repository_must_be_a_github_https_url" });
      if (!validGitRef(gitRef)) return send(res, 400, { error: "invalid_git_ref" });
      if (!validCommit(commitSha)) return send(res, 400, { error: "commit_sha_must_be_40_hex_characters" });
      if (typeof idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) {
        return send(res, 400, { error: "idempotency_key_required" });
      }

      const id = randomUUID();
      try {
        const result = await pool.query(
          `INSERT INTO cloud_deployments
            (id, project_slug, repository_url, git_ref, commit_sha, status, idempotency_key)
           VALUES ($1, $2, $3, $4, $5, 'queued', $6)
           ON CONFLICT (idempotency_key) DO NOTHING
           RETURNING id, project_slug, repository_url, git_ref, commit_sha, status, requested_at, updated_at`,
          [id, projectSlug, repositoryUrl.replace(/\/$/, ""), gitRef, commitSha, idempotencyKey],
        );
        if (result.rowCount === 1) return send(res, 202, { data: result.rows[0], accepted: true });

        const existing = await pool.query(
          "SELECT id, project_slug, repository_url, git_ref, commit_sha, status, requested_at, updated_at FROM cloud_deployments WHERE idempotency_key = $1",
          [idempotencyKey],
        );
        if (existing.rowCount === 1) return send(res, 200, { data: existing.rows[0], accepted: false, deduplicated: true });
        return send(res, 409, { error: "idempotency_conflict" });
      } catch (error) {
        if (error?.code === "23505") return send(res, 409, { error: "idempotency_conflict" });
        throw error;
      }
    }

    return send(res, 404, { error: "not_found" });
  } catch (error) {
    const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
    if (status >= 500) console.error(JSON.stringify({ level: "error", message: "request_failed", path: url.pathname }));
    return send(res, status, { error: status >= 500 ? "internal_error" : error.message });
  }
});

await ensureSchema();
server.listen(port, "0.0.0.0", () => {
  console.log(JSON.stringify({ level: "info", message: "control_plane_started", port }));
});

async function shutdown(signal) {
  console.log(JSON.stringify({ level: "info", message: "shutdown", signal }));
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
