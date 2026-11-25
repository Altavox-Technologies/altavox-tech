'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import {
  ADMIN_EMAIL,
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  isFirebaseAdminUser,
  testConnection,
} from '@/lib/firebase'

interface FirebaseContextValue {
  user: User | null
  loading: boolean
  isAdmin: boolean
  authError: string
  signInWithGoogle: () => Promise<User | null>
  signOutFirebase: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextValue>({
  user: null,
  loading: true,
  isAdmin: false,
  authError: '',
  signInWithGoogle: async () => null,
  signOutFirebase: async () => {},
})

async function ensureUserProfileDocuments(firebaseUser: User) {
  if (!firebaseUser.emailVerified || !firebaseUser.email) return

  const publicRef = doc(db, 'users', firebaseUser.uid)
  try {
    const existingPublic = await getDoc(publicRef)
    if (!existingPublic.exists()) {
      await setDoc(publicRef, {
        uid: firebaseUser.uid,
        displayName: (firebaseUser.displayName || firebaseUser.email.split('@')[0] || 'User').slice(0, 120),
        role: 'student',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`)
  }

  const privateRef = doc(db, 'users', firebaseUser.uid, 'private', 'profile')
  try {
    const existingPrivate = await getDoc(privateRef)
    if (!existingPrivate.exists()) {
      await setDoc(privateRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email.slice(0, 254),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}/private/profile`)
  }
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    void testConnection()

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser && currentUser.emailVerified) {
        try {
          await ensureUserProfileDocuments(currentUser)
        } catch (err) {
          console.error('[FirebaseProvider] Profile sync skipped:', err)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthError('')
    try {
      const credential = await signInWithPopup(auth, googleProvider)
      if (credential.user && credential.user.emailVerified) {
        await ensureUserProfileDocuments(credential.user)
      }
      return credential.user
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed.'
      if (!message.includes('popup-closed-by-user')) {
        setAuthError(message)
      }
      return null
    }
  }

  const signOutFirebase = async () => {
    setAuthError('')
    await signOut(auth)
  }

  const isAdmin = Boolean(
    user &&
      (isFirebaseAdminUser(user) ||
        user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase())
  ) && Boolean(user?.emailVerified)

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        authError,
        signInWithGoogle,
        signOutFirebase,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebaseAuth() {
  return useContext(FirebaseContext)
}
