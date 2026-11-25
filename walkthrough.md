# Security Summary

We hardened the Altavox Tech web application and its Firebase Cloud Firestore backend so sensitive customer records, payment flows, developer secrets, and internal operations remain protected:

- **Default-closed Cloud Firestore security rules**: Public read access is restricted to published projects (`visibility == 'public'`) and published completion certificates (`/certificates/{id}`). User PII (`/users/{uid}/private/{docId}`), enrollment records, and lesson progress are locked to the signed-in account owner or verified administrators (`yurianarshad@gmail.com`). Self-granting active paid enrollments from the browser is blocked by Firestore rules (`status == 'pending'`).
- **Administrator authentication across internal APIs**: Developer API key endpoints (`/api/developers/keys`), customer inquiry queues (`/api/inquiries`), full support ticket queues (`/api/support/tickets`), and all seven Enterprise OS routes (`/api/os/*`) now verify an authenticated administrator session or timing-safe `ALTAVOX_CONTROL_PLANE_TOKEN` Bearer credential before returning or modifying records. Public ticket lookups require both an exact ticket reference and matching contact email.
- **PayPal order & webhook integrity**: Academy and bookstore checkout redirect customers to PayPal's official approval URL instead of bypassing approval, verify captures in integer cents against server-quoted pricing, refuse mock/unconfigured capture tokens, enforce a 256 KB size cap and timestamp window on webhooks, and validate all five PayPal transmission signature headers.
- **Rate limiting & abuse prevention**: Sliding-window per-IP throttling protects public submissions and lookups (`/api/inquiries`, `/api/support/tickets`, `/api/computer/requests`, `/api/trust/data-request`, `/api/payments/paypal/create-order`, `/api/ai/assistant`, `/api/ai/summarize`).
- **Browser & iframe compatibility**: `next.config.mjs` removes header blocks that prevented workspace previews from rendering while keeping `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Strict-Transport-Security`, and `Cross-Origin-Opener-Policy: same-origin-allow-popups` for Google OAuth sign-in popups.

## PoC Verification

1. **Firestore Rules Lint & Structural Verification**:
   - Command: `bunx eslint firestore.rules && bun firestore.rules.test.ts`
   - Verified `/firestore.rules` passes ESLint and all schema/ownership/RBAC assertions before deployment via `DeployRules`.
2. **PayPal Approval Bypass Rejection**:
   - Invoked `capturePayPalOrder` with `providerOrderId: "MOCK-PAYPAL-BYPASS"` -> verified it returns `{ success: false, status: 'failed', transactionId: '' }` with zero enrollment granted.
3. **Unauthenticated Admin & OS API Access Rejection**:
   - Unauthenticated `GET` requests to `/api/developers/keys`, `/api/inquiries`, `/api/support/tickets` (without matching ticket+email), and `/api/os/{erp,crm,analytics,flow,productops,security,subscriptions}` return `401 Unauthorized` with `Cache-Control: no-store`.
4. **Public Checkout without Payment Secrets**:
   - Unconfigured `POST /api/payments/paypal/create-order` returns HTTP `503` without fabricating fake orders or mock URLs.
