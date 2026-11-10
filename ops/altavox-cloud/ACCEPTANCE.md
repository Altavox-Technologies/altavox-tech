# Altavox Cloud acceptance checklist

Do not call the platform production-ready until every applicable check has evidence.

## Infrastructure
- [ ] Server provider, server ID, region, OS and public IP recorded.
- [ ] SSH access and recovery access tested.
- [ ] Firewall exposes only required ports; admin access is restricted.
- [ ] DNS resolves to the intended ingress host.
- [ ] TLS certificate is valid and renews automatically.
- [ ] Monitoring, disk alerts and backup policy are active.

## Deployment lifecycle
- [ ] Connect a test Git repository with least-privilege permissions.
- [ ] Pin every build to an immutable commit SHA.
- [ ] Queue a build and retain logs without leaking secrets.
- [ ] Build failure produces a failed state and never replaces the live release.
- [ ] Successful build produces a versioned OCI image.
- [ ] Runtime health check passes before traffic is switched.
- [ ] Failed health check automatically preserves or restores the last healthy release.
- [ ] Repeated webhook delivery does not create duplicate deployment jobs.
- [ ] Runtime restart and host reboot behavior are verified.

## Isolation and security
- [ ] Customer workloads cannot access host Docker socket, control-plane secrets or other tenants' data.
- [ ] CPU, memory, disk and build-time limits are enforced.
- [ ] GitHub webhook signatures are verified.
- [ ] Secrets are redacted from logs and never returned to browsers.
- [ ] Admin actions are authenticated, authorized and audited.
- [ ] Dependency and container image scans are run in CI.

## Product behavior
- [ ] Deployment gets a stable status and immutable deployment ID.
- [ ] Preview URL and production URL route to the intended release.
- [ ] Custom domain validation and HTTPS issuance are tested.
- [ ] Logs, health state, deploy history and rollback work from the Altavox interface.
- [ ] Restore from backup is tested, not merely configured.

## Evidence
Record the tested commit, date, command output, deployment ID, URL and pass/fail for each check. Never substitute screenshots of a dashboard or placeholder metrics for actual runtime evidence.
