import { randomUUID } from 'node:crypto'
import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { inquiries } from '@/lib/db/schema'
import { requireAdminApiAccess } from '@/lib/api-auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxFieldLength = 2_000
const optionalFields = ['organization', 'service', 'projectType', 'timeline'] as const

function cleanOptional(value: unknown) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export async function GET(request: Request) {
  const authCheck = await requireAdminApiAccess(request)
  if (!authCheck.ok) return authCheck.response

  const db = getDb()
  if (!db) {
    return NextResponse.json(
      { inquiries: [], dbConfigured: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  try {
    const rows = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(100)
    return NextResponse.json(
      { inquiries: rows, dbConfigured: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('[inquiry] admin list failed', error)
    return NextResponse.json(
      { error: 'Unable to fetch inquiries.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rl = checkRateLimit(`inquiries:${ip}`, 10, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before submitting another inquiry.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfterSeconds),
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const requestId = randomUUID()
  const body = await request.json().catch(() => null)
  const requiredFields = ['name', 'email', 'description'] as const
  const valid =
    body &&
    requiredFields.every(
      (field) =>
        typeof body[field] === 'string' &&
        body[field].trim().length > 0 &&
        body[field].length <= maxFieldLength
    )

  const phoneValid =
    body &&
    (body.phone == null ||
      (typeof body.phone === 'string' && body.phone.trim().length <= 40))

  if (!valid || !phoneValid || !emailPattern.test(body.email.trim())) {
    return NextResponse.json(
      { error: 'Invalid enquiry', requestId },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const optionalValues = Object.fromEntries(
    optionalFields.map((field) => [field, cleanOptional(body[field])])
  )

  const db = getDb()
  if (!db) {
    console.error('[inquiry] database connection is unavailable', { requestId })
    return NextResponse.json(
      { error: 'Inquiry delivery is not configured', requestId },
      { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } }
    )
  }

  try {
    await db.insert(inquiries).values({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      description: body.description.trim(),
      organization: optionalValues.organization,
      service: optionalValues.service,
      projectType: optionalValues.projectType,
      timeline: optionalValues.timeline,
      phone: cleanOptional(body.phone),
    })
  } catch (error) {
    console.error('[inquiry] persistence failed', { requestId, error })
    return NextResponse.json(
      { error: 'Unable to save enquiry', requestId },
      { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } }
    )
  }

  return NextResponse.json(
    { ok: true, requestId },
    { status: 201, headers: { 'Cache-Control': 'no-store' } }
  )
}
