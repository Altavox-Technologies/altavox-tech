# Altavox Tech — Cloud Firestore

## Architecture

PostgreSQL (Drizzle) remains the system of record for users, sessions, orders,
payments, inquiries, inventory, and other transactional records.

Cloud Firestore is an additive real-time projection layer. It is intended for
published public content and live event streams. Never treat a Firestore event as
proof that a payment, order, or provisioning operation succeeded.

## Collections

- `publicContent/{documentId}`: published website content. Public reads require
  `published == true`; writes require the Firebase custom claim `admin: true`.
- `realtimeChannels/{channelId}/events/{eventId}`: live event feed. Reads require
  Firebase Authentication. Only trusted server/admin code can write.
  Allowed channels: `site-announcements`, `admin-activity`.
- `users/{userId}/private/{document=**}`: owner-readable private projection.
  Client writes are denied.

## Authentication boundary

Altavox currently uses Better Auth. Better Auth sessions are not automatically
Firebase Authentication sessions. Do not let the browser access Firestore using
an unauthenticated Firebase client, and do not copy a user-supplied role into a
Firebase token.

The integration must validate the Better Auth session on the server, map the
verified Better Auth user ID to the Firebase UID, and mint a Firebase custom
token from a service account. The `admin` claim must be derived server-side
from the existing verified-admin policy (`isAdminEmail`), never from client
input. Admin SDK calls bypass Firestore Security Rules, so server routes must
perform their own authorization checks.

## Required Firebase configuration

Create a Firebase project and enable Cloud Firestore (Native mode) and
Firebase Authentication (custom-token sign-in). Configure:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Keep service-account credentials server-only. Never use a `NEXT_PUBLIC_`
prefix for the private key or service-account email.

## Deploy and verify

Install the Firebase CLI in a trusted development environment, then run:

```bash
firebase emulators:exec --only firestore "node scripts/test-firestore-rules.mjs"
firebase deploy --only firestore:rules,firestore:indexes
```

Before production use, add emulator-based allow/deny tests for every collection,
verify Better Auth-to-Firebase custom-token exchange, and confirm that admin
writes are denied for non-admin users. Security Rules do not protect Admin SDK
or server REST calls; those require server-side authorization and IAM.

## Operational constraints

- PostgreSQL remains authoritative for payments and all transactional state.
- Use an outbox/event publisher from PostgreSQL transactions for reliable
  cross-database events; do not dual-write critical operations in a request.
- Make event publishing idempotent using a stable event ID/correlation ID.
- Set retention/TTL for high-volume event collections and monitor read/write
  costs.
- Firestore listeners must unsubscribe on component unmount and surface
  permission/network errors explicitly.
