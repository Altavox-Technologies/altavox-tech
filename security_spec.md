# Altavox Tech Firestore Security Specification (Phase 0)

## 1. Data Invariants
1. **Default-Deny Safety Net**: Every path not explicitly matched is denied (`allow read, write: if false`).
2. **Project Portfolio Integrity**: Only verified administrators (`yurianarshad@gmail.com` with `email_verified == true` or registered `/admins/{uid}`) may create, update, or delete `/projects/{projectId}` documents. Public list queries are restricted strictly to `resource.data.visibility == 'public'`.
3. **PII Isolation**: User email, phone, and organization fields live strictly in `/users/{userId}/private/{docId}` and are readable/writable only by `request.auth.uid == userId` or verified admins. No blanket `isSignedIn()` reads exist anywhere.
4. **Privilege Escalation Prevention**: Users creating `/users/{userId}` are restricted to `role == 'student'` and cannot mutate `role` or `uid` on update. Admin creation on `/admins/{adminUid}` requires `isAdmin()`.
5. **Payment & Enrollment Integrity**: Students cannot self-grant `'active'` or `'completed'` enrollment status on `/enrollments/{enrollmentId}` without admin/verified order verification. Student lesson progress is isolated in `/lessonProgress/{progressId}` scoped strictly to `userId == request.auth.uid`.
6. **Certificate Immutability**: Public reads on `/certificates/{certificateId}` require valid document ID and never allow collection scraping (`allow list` restricted to `resource.data.userId == request.auth.uid`). Certificates can only be issued or revoked by verified admins.
7. **Temporal & Structural Integrity**: All `createdAt` and `updatedAt` timestamps must equal `request.time`, `createdAt` and `ownerUid`/`userId` are immutable after creation, and all string/array fields enforce explicit `.size()` boundaries.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unverified Admin Email Spoof**: `{ "email": "yurianarshad@gmail.com", "email_verified": false }` attempting write to `/projects/test-proj` -> **DENIED**.
2. **Shadow Field Injection on Project Create**: Valid `Project` fields + `"isFeaturedAdminOverride": true` -> **DENIED** by `keys().hasOnly(...)`.
3. **Self-Assigned Admin Role on Profile Create**: `{ "uid": "u1", "displayName": "Attacker", "role": "admin" }` to `/users/u1` -> **DENIED** (`incoming().role == 'student'`).
4. **Role Escalation via Partial Update**: User `u1` updating `/users/u1` with `{ "role": "admin", "updatedAt": request.time }` -> **DENIED** by `affectedKeys().hasOnly(['displayName', 'updatedAt'])` and `incoming().role == existing().role`.
5. **ID Poisoning (Oversized / Invalid Path ID)**: Creating `/projects/../../../etc/passwd` or a 500-char ID -> **DENIED** by `isValidId()`.
6. **Cross-Tenant PII Read**: Authenticated user `u2` reading `/users/u1/private/info` -> **DENIED** (`!isOwner(userId) && !isAdmin()`).
7. **Collection Scraping on Enrollments**: Authenticated user `u2` listing `/enrollments` without `where('userId', '==', 'u2')` -> **DENIED** by `resource.data.userId == request.auth.uid`.
8. **Self-Granted Paid Course Enrollment**: Authenticated user `u1` creating `/enrollments/e1` with `{ "status": "active" }` -> **DENIED** (`status == 'pending'` required for non-admin creates).
9. **Client Timestamp Backdating**: Creating `/projects/p1` with `createdAt: "2020-01-01T00:00:00Z"` instead of `request.time` -> **DENIED**.
10. **Immutable Owner Tampering**: Updating `/lessonProgress/lp1` and changing `userId` to `"u2"` -> **DENIED** (`incoming().userId == existing().userId`).
11. **Denial-of-Wallet Array Overflow**: Creating `/lessonProgress/lp1` with 200 items in `completedLessons` -> **DENIED** (`size() <= 50`).
12. **Certificate Forgery**: Authenticated student writing to `/certificates/AVX-CERT-FAKE` -> **DENIED** (`isAdmin()` required).
