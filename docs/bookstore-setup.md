# Altavox Bookstore setup

The bookstore uses the existing PostgreSQL connection configured by the application.

## Database

Apply `db/migrations/20261030_bookstore.sql` to the same PostgreSQL database used by Altavox Tech. The migration creates the product catalogue, orders, order items, payment records, customer library and download audit tables.

Do not publish the bookstore until the migration has completed successfully.

## Administrator access

Set `ADMIN_EMAILS` in the production environment to a comma-separated list of existing, authenticated Altavox user email addresses. Only those accounts can create book records through the management API. New records are saved as drafts.

## Current operational boundary

- Public catalogue reads only published records.
- Order creation requires a signed-in customer and calculates prices from database records.
- Orders remain pending until a real payment provider confirms settlement.
- Digital library access is based on rows in `book_library`; the application does not expose private file keys to browsers.
- Printed stock and delivery are recorded, but no courier integration is implied.

## Required before live selling

1. Configure and test a real payment provider and its signed callback/webhook.
2. On verified payment only, update payment and order status and create the matching digital library grants.
3. Configure private object storage for PDF/EPUB files and issue short-lived, authenticated download links.
4. Configure `BOOKSTORE_FLAT_DELIVERY_FEE_TZS` as a server-side fixed delivery charge, then implement actual delivery zones/rates, fulfilment workflow and customer notifications.
5. Test database migration, order rollback, duplicate payment callbacks, stock concurrency and access control.

No payment is treated as successful based on a browser redirect or customer-submitted reference alone.


## Controlled administrator bootstrap

- Set `ADMIN_EMAILS` to the exact administrator email address(es) that have been approved.
- Generate a unique `ADMIN_SETUP_TOKEN` of at least 32 characters and set `ADMIN_SETUP_ENABLED=true` only for the short account-creation window.
- Open `/admin/setup`, use the approved email address and one-time token, and create a strong password.
- Independently verify ownership of the approved email address, then set the Better Auth user record's `emailVerified` flag to true in the database. Example SQL: `UPDATE "user" SET "emailVerified" = TRUE WHERE lower(email) = lower('approved@example.com');` Replace the example with the approved address only after verification. The application requires both this flag and an exact `ADMIN_EMAILS` match.
- Immediately set `ADMIN_SETUP_ENABLED=false` and rotate/remove `ADMIN_SETUP_TOKEN` after setup.
- Never put the setup token in source control, client-side environment variables, chat messages, or public issue reports.
