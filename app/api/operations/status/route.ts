import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { auth } from '@/lib/auth'
import { isAdminEmail } from '@/lib/admin'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdminEmail(session.user.email, session.user.emailVerified)) {
    return NextResponse.json({ error: 'Administrator access required' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }
  const requestId = crypto.randomUUID()
  const db = getDb()
  if (!db) return NextResponse.json({ error: 'Operations database is unavailable', requestId }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const result = await db.execute(sql`SELECT (SELECT count(*)::int FROM public.devices) AS devices, (SELECT count(*)::int FROM public.telemetry) AS telemetry, (SELECT count(*)::int FROM public.network_commands WHERE status = 'queued') AS queued_commands, (SELECT count(*)::int FROM public.audit_logs) AS audit_events`)
    return NextResponse.json({ data: result.rows[0] ?? null, requestId }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Operations data is unavailable', requestId }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
