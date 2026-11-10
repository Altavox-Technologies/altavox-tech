# Altavox production hardening

## Changes in this branch

- Removed the in-memory mock database fallback. Writes cannot silently succeed without persistent PostgreSQL.
- Production startup fails fast when BETTER_AUTH_SECRET is missing.
- Session cookies use HttpOnly, SameSite=Lax and Secure in production.
- Centralized the administrator email allowlist. Missing BOOKSTORE_ADMIN_EMAILS grants no admin access.
- Protected the enterprise inquiries dashboard with the same administrator authorization as bookstore management.
- Added .env.example with safe, non-working values.

## Required deployment configuration

1. Provision PostgreSQL and set DATABASE_URL using a TLS-enabled connection string.
2. Generate a unique BETTER_AUTH_SECRET (at least 32 random bytes) and store it only in hosting-provider secrets.
3. Set BETTER_AUTH_URL to the canonical HTTPS origin.
4. Set BOOKSTORE_ADMIN_EMAILS to verified staff accounts; avoid shared administrator logins.
5. Apply all SQL migrations in order and verify schema compatibility.
6. Run production build, type checks and smoke tests after configuration.

## Remaining launch blockers

- Private object storage and authenticated, expiring PDF/EPUB download links; digital books cannot be published until their private file key is present.
- Configure `BOOKSTORE_DEFAULT_DELIVERY_FEE_TZS` before accepting printed orders. Printed inventory is reserved transactionally and can be released by cancelling an unpaid order; an automated expiry job is not yet configured.
- Order receipts, customer notifications, automated reconciliation for missed provider callbacks and complete refund operations.
- Apply all migrations, verify bank-account reference handling with the merchant provider, and complete end-to-end tests.

Never mark an order paid based on a browser redirect, screenshot or customer-supplied reference. Only a verified signed server-to-server provider notification may grant paid status or digital library access.

## Validation

Repository edits do not execute package installation, type-checking, production build, browser tests or database migrations. Those checks must pass in CI or the deployment environment before merging.


## Book Hub functionality added in this branch

- Browser-persisted shopping cart with per-format quantities and a checkout page.
- Admin-authorized blog article creation, draft/publish state, public blog index and article pages. Apply `20261030_blog_posts.sql` before enabling the blog database routes.
- Book administrators can publish a reviewed book draft through the protected management API.
- Book order administration can inspect orders and cancel unpaid pending/failed orders, returning reserved printed stock.
- Printed inventory is decremented inside the order transaction and checked again before commit to prevent overselling.
- MALIPOPAY server-side collection initiation supports provider codes for M-Pesa (VODACOM), Airtel Money (AIRTEL), Mixx by Yas (TIGO), and CRDB/NMB account collections. The API token remains server-side. Confirm exact CRDB/NMB account-reference handling with the provider before enabling bank options.
- The payment webhook verifies the raw request body using the per-webhook HMAC secret and constant-time comparison. Only an exact, verified successful TZS amount marks an order paid and grants digital library entries.
- Payment provider references have a unique database index for idempotent processing. Apply `20261031_book_payments_unique.sql` after the bookstore schema migration.

## Payment onboarding and go-live

The integration uses the MALIPOPAY API documented at https://developers.malipopay.co.tz/. The merchant account owner must complete the provider's business verification, obtain the API token and configure the webhook signing secret. Configure the provider webhook URL as `https://YOUR_DOMAIN/api/bookstore/payments/webhook`. Test every intended mobile-money and bank channel using provider-authorized test recipients before requesting go-live approval. Do not treat the collection API's initial PROCESSING response as payment; only the signed final webhook can unlock the digital library.

For bank collections, the checkout asks the customer for the bank bill/account reference expected by the provider. Confirm the exact CRDB/NMB account-reference workflow with the merchant provider before enabling those options for customers.

A business owner or authorized adult representative should handle merchant registration, identity/business verification, and financial account agreements. Never commit API tokens or webhook secrets to Git.

## Remaining external / operational requirements

- Apply the new SQL migrations in order in the production database.
- Configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BOOKSTORE_ADMIN_EMAILS`, `BOOKSTORE_DEFAULT_DELIVERY_FEE_TZS`, `MALIPOPAY_API_TOKEN`, and `MALIPOPAY_WEBHOOK_SECRET` in the hosting provider's secret environment.
- Configure and test the MALIPOPAY webhook URL in the provider dashboard; their docs note that payment callbacks are not retried, so operational reconciliation is still required if a callback is missed.
- Provision private object storage, implement upload/download authorization and connect uploaded digital files to library delivery. The current book form still stores metadata and cover-image URLs, not protected PDF/EPUB uploads.
- Run type-check, production build, database migration and end-to-end payment tests in CI/deployment before production use.
