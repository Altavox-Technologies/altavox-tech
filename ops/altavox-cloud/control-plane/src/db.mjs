import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

export const pool = new Pool({
  connectionString,
  max: Number.parseInt(process.env.DB_POOL_MAX ?? "10", 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
});

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cloud_deployments (
      id UUID PRIMARY KEY,
      project_slug TEXT NOT NULL,
      repository_url TEXT NOT NULL,
      git_ref TEXT NOT NULL,
      commit_sha TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('queued','building','built','deploying','ready','failed','cancelled')),
      idempotency_key TEXT UNIQUE,
      requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      error_code TEXT,
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS cloud_deployments_requested_at_idx ON cloud_deployments (requested_at DESC)`);
}

export async function closePool() {
  await pool.end();
}
