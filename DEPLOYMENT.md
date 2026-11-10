# Altavox Tech deployment operations

## Quality gate

Pull requests and pushes to `main` run the GitHub Actions quality gate. It installs the committed pnpm lockfile, runs TypeScript checks, and creates a production build. The workflow listens to pull requests against any base branch so it also works for stacked pull requests. A green Vercel deployment alone is not a replacement for these checks.

## Deployment desk configuration

The private `/deployment-desk` page reads recent deployment metadata live from the Vercel API and recent workflow runs live from the GitHub Actions API. It does not fabricate deployment records. Configure these variables in Vercel Project Settings for each environment where the desk should work:

- `DEPLOYMENT_DESK_KEY`: a unique, high-entropy secret used to access the desk. Do not reuse a Vercel token or a user password.
- `VERCEL_TOKEN`: a Vercel access token with the minimum required read access to deployments.
- `VERCEL_PROJECT_ID`: the project ID for the Altavox Tech Vercel project.
- `VERCEL_TEAM_ID`: optional when the project belongs to a team; set it when required by the API account context.
- `GITHUB_TOKEN`: optional fine-grained GitHub token with read-only Actions access. Public workflow metadata may be available without it, but authentication helps avoid low anonymous API rate limits.

After changing environment variables, redeploy the environment. The access key is compared using a constant-time byte comparison, held in page memory, and not saved in browser storage. API responses disable caching. Provider tokens are never sent to the browser.

## Smoke test

After a deployment is ready and its URL is known, run:

```sh
BASE_URL=https://your-preview-url.vercel.app pnpm run smoke
```

The smoke checker requires HTTP 200 HTML responses from `/`, `/solutions`, `/projects`, `/start-project`, and `/privacy`. Run it against the exact preview deployment before merging; do not substitute an older preview URL.

## Safe release sequence

1. Open a pull request and wait for GitHub quality checks and the matching Vercel preview.
2. Run the smoke checker against that preview and review the build/runtime logs.
3. Confirm the deployed commit SHA matches the reviewed PR head.
4. Merge only after checks pass and a human reviews the diff.
5. Verify the production domain and key routes after release. If checks fail, roll back to the last known-good deployment through Vercel.

No credentials should be committed to this repository. Keep production data and secrets out of logs and dashboard responses.
