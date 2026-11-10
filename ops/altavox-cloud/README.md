# Altavox Cloud: self-hosted foundation

This directory is the infrastructure starting point for hosting workloads on Altavox-managed Linux servers. It is deliberately separate from the Altavox marketing website and its Vercel deployment.

## Target architecture

- **Control plane:** a starter Node.js API and PostgreSQL deployment registry now exist under `control-plane/`. The API has liveness/readiness checks, token-protected listing and idempotent deployment-request creation. It is not yet a complete customer control plane.
- **Build plane:** isolated build workers create OCI images from pinned source revisions. Build jobs must not run with unrestricted host privileges.
- **Runtime plane:** Docker/containerd hosts run customer workloads with CPU, memory, disk and network limits.
- **Ingress:** managed reverse proxy routes project domains and provisions TLS certificates.
- **State:** PostgreSQL for durable control-plane records, object storage for build artifacts/log archives, and a queue for asynchronous build/deploy jobs.
- **Operations:** health checks, structured logs, metrics, backups, alerts and tested rollback procedures.

## First bootstrap

Use a fresh Ubuntu 22.04/24.04 x86_64 server with a public IP. For an initial proof of concept, budget at least 2 vCPU and 4 GB RAM; production capacity depends on workload. Keep SSH access working before changing firewall rules.

1. Create a server with the provider of your choice. This repository does not provision paid infrastructure automatically.
2. Connect over SSH as a sudo-capable user and copy this repository or the bootstrap script onto the server.
3. Review `bootstrap-ubuntu.sh` before running it.
4. Run Docker setup:
   ```sh
   sudo bash ops/altavox-cloud/bootstrap-ubuntu.sh
   ```
5. To install the initial self-hosted deployment control plane, explicitly opt in and confirm server ownership:
   ```sh
   sudo env ALTAVOX_INSTALL_COOLIFY=YES ALTAVOX_CONFIRM_HOSTING_INSTALL=I_CONTROL_THIS_SERVER bash ops/altavox-cloud/bootstrap-ubuntu.sh
   ```
   This downloads and executes Coolify's official installer. Coolify is an initial self-hosted deployment engine, not Altavox's final product identity. Altavox's customer-facing control plane and APIs must be built and owned in this repository.
6. Configure DNS only after the server IP and intended domain are known. Do not publish an admin console openly without access restrictions.

## Required safety boundaries

- Never commit production secrets, private keys, provider tokens or customer environment files.
- Do not expose the Docker socket to public APIs or customer workloads.
- Build and runtime workloads need separate identities and least-privilege permissions.
- Do not run untrusted builds as root on the host. Isolate builds and apply resource quotas.
- Do not mark a deployment successful until the image is built, the runtime starts, a health check passes and the routed endpoint responds.
- Persist deployment state and logs; use idempotency keys to prevent duplicate deploy jobs.
- Require backups and a tested restore procedure before production customer workloads.
- Keep Vercel as an optional website preview provider only until Altavox's own runtime has passed end-to-end acceptance tests.

## Current status

This folder defines a repeatable bootstrap path. It does **not** mean a server has been created or a hosting service is online. Record the actual server ID/IP, DNS, TLS, test results and release commit in the operations runbook after those steps have been performed.
