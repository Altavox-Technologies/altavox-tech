import test from "node:test";
import assert from "node:assert/strict";
import { validSlug, validRepoUrl, validGitRef, validCommit } from "../src/validation.mjs";

test("project slugs accept DNS-safe lowercase names", () => {
  assert.equal(validSlug("school-portal-2"), true);
  assert.equal(validSlug("UPPERCASE"), false);
  assert.equal(validSlug("-starts-wrong"), false);
  assert.equal(validSlug("has spaces"), false);
});

test("repository URL must be a public GitHub HTTPS repository URL", () => {
  assert.equal(validRepoUrl("https://github.com/acme/site"), true);
  assert.equal(validRepoUrl("https://github.com/acme/site.git"), true);
  assert.equal(validRepoUrl("http://github.com/acme/site"), false);
  assert.equal(validRepoUrl("https://github.com.evil.test/acme/site"), false);
  assert.equal(validRepoUrl("https://user:password@github.com/acme/site"), false);
  assert.equal(validRepoUrl("https://github.com/acme/site/issues"), false);
});

test("git refs reject option-like, whitespace and traversal-like input", () => {
  assert.equal(validGitRef("main"), true);
  assert.equal(validGitRef("release/2026-10"), true);
  assert.equal(validGitRef("-upload-pack"), false);
  assert.equal(validGitRef("main..secret"), false);
  assert.equal(validGitRef("main branch"), false);
});

test("commit identifiers must be full 40-character hexadecimal SHAs", () => {
  assert.equal(validCommit("0123456789abcdef0123456789abcdef01234567"), true);
  assert.equal(validCommit("abc123"), false);
  assert.equal(validCommit("../etc/passwd"), false);
});
