'use client'

import React from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { FirebaseProvider } from '@/components/firebase-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <FirebaseProvider>{children}</FirebaseProvider>
    </ErrorBoundary>
  )
}
