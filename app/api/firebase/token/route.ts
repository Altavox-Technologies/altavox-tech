import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdminEmail } from '@/lib/admin'
import { createFirebaseCustomToken } from '@/lib/firebase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const admin = isAdminEmail(session.user.email, Boolean(session.user.emailVerified))
    const token = await createFirebaseCustomToken(session.user.id, admin)

    return NextResponse.json(
      { token },
      { headers: { 'Cache-Control': 'no-store, private' } },
    )
  } catch (error) {
    console.error('[firebase-token] Failed to create Firebase session', error)
    return NextResponse.json(
      { error: 'Firebase authentication is not configured' },
      { status: 503 },
    )
  }
}
