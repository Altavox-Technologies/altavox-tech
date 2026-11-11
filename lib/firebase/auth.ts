'use client'

import { signInWithCustomToken } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase/client'

/**
 * Exchanges the current Better Auth session for a short-lived Firebase
 * custom token. The server derives UID and admin claims from the verified
 * Better Auth session; never accept either value from the browser.
 */
export async function connectFirebaseSession() {
  const response = await fetch('/api/firebase/token', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' },
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.error ?? 'Unable to establish Firebase session')
  }

  const { token } = (await response.json()) as { token: string }
  return signInWithCustomToken(getFirebaseAuth(), token)
}
