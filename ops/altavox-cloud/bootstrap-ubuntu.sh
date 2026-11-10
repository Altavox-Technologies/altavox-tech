#!/usr/bin/env bash
set -Eeuo pipefail

# Installs Docker Engine from Docker's official Ubuntu repository.
# Coolify installation is separately gated because it downloads and runs
# a third-party installer and should only happen on a reviewed, fresh server.

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run with sudo/root: sudo bash $0" >&2
  exit 1
fi

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This bootstrap supports Ubuntu/Debian systems using apt-get; use Ubuntu 22.04/24.04 for the documented path." >&2
  exit 1
fi

. /etc/os-release
if [[ "${ID:-}" != "ubuntu" ]]; then
  echo "Unsupported OS: ${PRETTY_NAME:-unknown}. This script intentionally targets Ubuntu." >&2
  exit 1
fi

case "${VERSION_ID:-}" in
  22.04|24.04) ;;
  *)
    echo "Unsupported Ubuntu version: ${VERSION_ID:-unknown}. Use Ubuntu 22.04 or 24.04." >&2
    exit 1
    ;;
esac

if [[ "${ALTAVOX_INSTALL_COOLIFY:-NO}" == "YES" ]]; then
  echo "WARNING: this will run the official Coolify installer on this server."
  echo "Continue only on a fresh server you control, after reviewing the installer source."
  if [[ "${ALTAVOX_CONFIRM_HOSTING_INSTALL:-}" != "I_CONTROL_THIS_SERVER" ]]; then
    echo "Set ALTAVOX_CONFIRM_HOSTING_INSTALL=I_CONTROL_THIS_SERVER to confirm." >&2
    exit 1
  fi
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl --fail --silent --show-error --location https://download.docker.com/linux/ubuntu/gpg   -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

arch="$(dpkg --print-architecture)"
codename="$(
  . /etc/os-release
  echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}"
)"
printf 'Types: deb\nURIs: https://download.docker.com/linux/ubuntu\nSuites: %s\nComponents: stable\nArchitectures: %s\nSigned-By: /etc/apt/keyrings/docker.asc\n'   "$codename" "$arch" > /etc/apt/sources.list.d/docker.sources

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

docker --version
docker compose version
systemctl --no-pager --full status docker

if [[ "${ALTAVOX_INSTALL_COOLIFY:-NO}" == "YES" ]]; then
  installer="$(mktemp)"
  trap 'rm -f "$installer"' EXIT
  curl --fail --silent --show-error --location https://cdn.coollabs.io/coolify/install.sh -o "$installer"
  bash "$installer"
  echo "Coolify installer completed. Verify its service health, restrict admin access, and configure DNS/TLS before use."
else
  cat <<'NEXT'
Docker Engine is installed and enabled.
Coolify was not installed. To install the initial self-hosted deployment engine on this reviewed host, run:
  sudo env ALTAVOX_INSTALL_COOLIFY=YES ALTAVOX_CONFIRM_HOSTING_INSTALL=I_CONTROL_THIS_SERVER bash ops/altavox-cloud/bootstrap-ubuntu.sh
NEXT
fi
