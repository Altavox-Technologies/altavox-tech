import 'server-only'

import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function getFirebaseAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured')
  }

  if (getApps().length) return getApp()

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  })
}

export async function createFirebaseCustomToken(uid: string, admin: boolean) {
  const auth = getAuth(getFirebaseAdminApp())
  return auth.createCustomToken(uid, admin ? { admin: true } : {})
}
