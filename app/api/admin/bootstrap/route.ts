import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function allowedAdmin(email: string) {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .includes(email)
}

export async function POST(request: Request) {
  const setupToken = process.env.ADMIN_SETUP_TOKEN ?? ''
  if (process.env.ADMIN_SETUP_ENABLED !== 'true' || setupToken.length < 32) {
    return NextResponse.json({ error: 'Administrator setup is currently closed.' }, { status: 404, headers: { 'Cache-Control': 'no-store' } })
  }

  const origin = request.headers.get('origin')
  if (!origin || new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > 16_384) return NextResponse.json({ error: 'Request is too large.' }, { status: 413, headers: { 'Cache-Control': 'no-store' } })

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid setup request.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const submittedToken = typeof body.token === 'string' ? body.token : ''
  const submitted = Buffer.from(submittedToken)
  const expected = Buffer.from(setupToken)
  const tokenMatches = submitted.length === expected.length && timingSafeEqual(submitted, expected)

  if (!tokenMatches || !emailPattern.test(email) || !allowedAdmin(email) || password.length < 12 || password.length > 128) {
    return NextResponse.json({ error: 'Setup could not be authorized. Check the one-time token, approved email and password requirements.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password, name: 'Altavox Administrator' },
    })
    return NextResponse.json({ ok: true, message: 'Account created. Complete the approved email-verification step before administrator access is granted.' }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Account setup failed. The account may already exist or authentication is unavailable.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } })
  }
}
