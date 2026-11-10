# Altavox Tech

Altavox Tech builds and maintains practical software systems, digital products, network operations tooling, and technical learning resources.

**Website:** https://altavox.space  
**Repository:** https://github.com/yurian51/altavox-tech

## Product areas

- **Jaslyn Net** — ISP billing, subscriber operations, and network automation.
- **Sammena** — school website and school information workflows.
- **Engineering services** — software development, infrastructure, integrations, and technical support.
- **Altavox Academy** — practical courses and technical learning resources.
- **Bookstore** — books and learning material published by Altavox.

The public website is a Next.js App Router application. It uses React, TypeScript, Tailwind CSS, and Motion. The repository also contains interactive technical tools and supporting application routes.

## Local development

Requirements:
- Node.js 22 or newer
- Bun 1.2.22

Install the exact locked dependencies and start the development server:

```bash
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000.

## Quality checks

```bash
bun run typecheck
bun run build
```

The `lint` script currently runs TypeScript's compiler in no-emit mode. It is a type-check, not an ESLint rule set.

## Deployment

The app is configured for Next.js standalone output. Deploy using a Node.js-compatible platform or a container that supports the generated standalone server. Configure required environment variables in the deployment platform; never commit credentials, private keys, or production connection strings.

Before promoting a release:
1. Install dependencies with the repository's chosen package manager.
2. Run the type-check and production build.
3. Verify the deployed homepage, key navigation routes, forms, and static assets.
4. Check the platform's runtime logs and health checks.

## Engineering principles

- Prefer verified product behavior over mock metrics or unsupported uptime claims.
- Keep secrets in environment variables.
- Make external integrations explicit about whether they are configured, degraded, or unavailable.
- Preserve accessibility, responsive behavior, and clear error states.
