import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdminEmail } from '@/lib/admin'

export interface VerifiedAdminActor {
  email: string
  method: 'session' | 'control_plane_token'
}

function hasValidControlPlaneBearer(request: Request): boolean {
  const token = process.env.ALTAVOX_CONTROL_PLANE_TOKEN
  if (!token || token.length < 24) return false
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) return false
  const presented = Buffer.from(header.slice(7).trim())
  const expected = Buffer.from(token)
  return presented.length === expected.length && timingSafeEqual(presented, expected)
}

export async function getVerifiedAdminActor(
  request: Request
): Promise<VerifiedAdminActor | null> {
  if (hasValidControlPlaneBearer(request)) {
    return { email: 'control-plane@altavox.space', method: 'control_plane_token' }
  }

  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (
      session?.user?.email &&
      isAdminEmail(session.user.email, Boolean(session.user.emailVerified))
    ) {
      return { email: session.user.email, method: 'session' }
    }
  } catch {
    // Database/session store not reachable or unauthenticated
  }

  return null
}

export async function requireAdminApiAccess(request: Request) {
  const actor = await getVerifiedAdminActor(request)
  if (!actor) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: 'Administrator authentication is required.' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } }
      ),
    }
  }
  return { ok: true as const, actor }
}
