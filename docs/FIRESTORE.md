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
  Allowed channels: `site-announcements`, `admin-activity`. The admin activity channel is restricted to verified admins.
- `users/{userId}/private/{document=**}`: owner-readable private projection.
  Client writes are denied.

## Authentication boundary

Altavox currently uses Better Auth. Better Auth sessions are not automatically
Firebase Authentication sessions. Do not let the browser access Firestore using
an unauthenticated Firebase client, and do not copy a user-supplied role into a
Firebase token.

The `/api/firebase/token` route validates the Better Auth session, maps the verified Better Auth user ID to the Firebase UID, and mints a Firebase custom token using the Admin SDK. The `admin` claim is derived server-side from the existing verified-admin policy (`isAdminEmail`), never from client input. The browser helper in `lib/firebase/auth.ts` exchanges that token for a Firebase session. Realtime listeners are exposed by `lib/firebase/realtime.ts`; call `connectFirebaseSession()` before subscribing. Admin SDK calls bypass Firestore Security Rules, so server routes must perform their own authorization checks.

## Required Firebase configuration

Firebase project is `altavox-tech` (project number `184390554889`). The registered Web App configuration is wired through public environment variables. Enable Cloud Firestore (Native mode) and Firebase Authentication with the custom-token provider. Configure:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Keep service-account credentials server-only. Never use a `NEXT_PUBLIC_`
prefix for the private key or service-account email.

## Deploy and verify

Set the public Firebase Web App variables and the three server-only Admin SDK variables in Vercel. Then install the Firebase CLI in a trusted development environment and run:

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
