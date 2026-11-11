'use client'

import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const requiredConfig = ['apiKey', 'authDomain', 'projectId', 'appId'] as const
const missingConfig = requiredConfig.filter((key) => !firebaseConfig[key])

export const firebaseConfigured = missingConfig.length === 0

function getFirebaseApp() {
  if (!firebaseConfigured) {
    throw new Error(`Firebase client configuration is incomplete: ${missingConfig.join(', ')}`)
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp())
}

export function getFirebaseDb() {
  return getFirestore(getFirebaseApp())
}

/** Analytics is optional and browser-only; it is not initialized during SSR. */
export async function getFirebaseAnalytics() {
  if (typeof window === 'undefined') return null

  const { isSupported, getAnalytics } = await import('firebase/analytics')
  if (!(await isSupported())) return null

  return getAnalytics(getFirebaseApp())
}
