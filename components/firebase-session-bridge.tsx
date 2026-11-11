'use client'

import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useSession } from '@/lib/auth-client'
import { connectFirebaseSession } from '@/lib/firebase/auth'
import { getFirebaseAnalytics, getFirebaseAuth, firebaseConfigured } from '@/lib/firebase/client'

/** Keeps the Firebase client identity in sync with the verified Better Auth session. */
export function FirebaseSessionBridge() {
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending || !firebaseConfigured) return

    let cancelled = false

    if (!session?.user?.id) {
      try {
        void signOut(getFirebaseAuth()).catch(() => undefined)
      } catch {
        // Firebase is optional until the project is fully configured.
      }
      return
    }

    void connectFirebaseSession()
      .then(() => {
        if (!cancelled) void getFirebaseAnalytics().catch(() => null)
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.warn('[firebase] Realtime identity is not available yet:', error)
        }
      })

    return () => {
      cancelled = true
    }
  }, [isPending, session?.user?.id])

  return null
}
