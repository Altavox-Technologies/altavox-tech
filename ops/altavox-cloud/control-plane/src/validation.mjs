export function validSlug(value) {
  return typeof value === "string" && /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(value);
}

export function validRepoUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "github.com" &&
      url.username === "" && url.password === "" &&
      /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export function validGitRef(value) {
  return typeof value === "string" && value.length > 0 && value.length <= 255 &&
    !value.startsWith("-") && !/[\s\\~^:?*\[\]]/.test(value) && !value.includes("..");
}

export function validCommit(value) {
  return typeof value === "string" && /^[a-f0-9]{40}$/i.test(value);
}
