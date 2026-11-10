# Altavox Cloud server runbook

## Configure secrets

On the server, clone the repository and create a private environment file. Generate each secret independently:

```sh
cp ops/altavox-cloud/.env.example ops/altavox-cloud/.env
openssl rand -hex 32
```

Paste one generated value into `ALTAVOX_DB_PASSWORD` and a separate generated value into `ALTAVOX_CONTROL_PLANE_TOKEN`. Keep the file readable only by the operator account:

```sh
chmod 600 ops/altavox-cloud/.env
```

Do not paste secrets into chat, commit them, or print them in shell logs.

## Start the control-plane API

```sh
docker compose --env-file ops/altavox-cloud/.env -f ops/altavox-cloud/compose.yaml up -d --build
docker compose --env-file ops/altavox-cloud/.env -f ops/altavox-cloud/compose.yaml ps
curl --fail http://127.0.0.1:8787/health/live
curl --fail http://127.0.0.1:8787/health/ready
```

The API binds to loopback only. Put it behind an authenticated TLS ingress after reviewing firewall rules and admin access. Do not expose port 8787 directly to the public internet.

## Submit a deployment request

This API currently records a request in PostgreSQL with status `queued`. It does **not yet build or run customer code**; a separately isolated worker and runtime orchestrator must be implemented and tested before these records can be treated as actual deployments.

```sh
export ALTAVOX_CONTROL_PLANE_TOKEN='(load from your private server environment)'
curl --fail-with-body -X POST http://127.0.0.1:8787/v1/deployments \
  -H "Authorization: Bearer ${ALTAVOX_CONTROL_PLANE_TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: test-project-main-0001' \
  --data '{"projectSlug":"demo-site","repositoryUrl":"https://github.com/example/demo-site","gitRef":"main","commitSha":"0123456789abcdef0123456789abcdef01234567"}'
```

Use a real repository and full commit SHA when testing. The sample SHA and repository above are format examples only, not real deployment evidence.

List recent requests:

```sh
curl --fail-with-body http://127.0.0.1:8787/v1/deployments \
  -H "Authorization: Bearer ${ALTAVOX_CONTROL_PLANE_TOKEN}"
```

## Stop the services

```sh
docker compose --env-file ops/altavox-cloud/.env -f ops/altavox-cloud/compose.yaml down
```

Do not add `--volumes` unless intentionally deleting the database volume and its data.
