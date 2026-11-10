import { randomBytes } from 'node:crypto'
import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const configured = Boolean(process.env.DATABASE_URL || process.env.DATABASE_URL_3 || process.env.POSTGRES_URL || process.env.POSTGRES_URL_3)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedServices = new Set([
  'PC Maintenance',
  'Windows Installation & Activation',
  'Software Centre',
  'Security Centre',
  'Hardware Support',
  'Remote Support',
  'Service Booking',
  'Repair Tracking',
  'IT Knowledge Base',
  'Quotations & Invoices',
])
const statuses: Record<string, string> = {
  received: 'Request received',
  reviewing: 'Under review',
  quoted: 'Quotation ready',
  approved: 'Approved',
  in_progress: 'Work in progress',
  ready: 'Ready for collection',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export async function POST(request: Request) {
  if (!configured || !pool) {
    return NextResponse.json({ error: 'Online service booking is temporarily unavailable. Please contact the support desk directly.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
  }

  const fields = ['name', 'email', 'phone', 'serviceType', 'deviceDetails', 'issueDescription'] as const
  const validFields = fields.every((field) =>
    typeof body[field] === 'string' &&
    body[field].trim().length > 0 &&
    body[field].length <= (field === 'issueDescription' ? 2000 : 300)
  )

  if (!validFields || !emailPattern.test(body.email.trim()) || !allowedServices.has(body.serviceType.trim())) {
    return NextResponse.json({ error: 'Complete all required fields with a valid email address and select a listed service.' }, { status: 400 })
  }

  const rawDate = typeof body.preferredDate === 'string' ? body.preferredDate : ''
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(rawDate)
  let preferredDate: string | null = null

  if (rawDate) {
    if (!dateMatch) return NextResponse.json({ error: 'Preferred service date is invalid.' }, { status: 400 })
    const year = Number(dateMatch[1])
    const month = Number(dateMatch[2])
    const day = Number(dateMatch[3])
    const candidate = new Date(Date.UTC(year, month - 1, day))
    if (candidate.getUTCFullYear() !== year || candidate.getUTCMonth() !== month - 1 || candidate.getUTCDate() !== day) {
      return NextResponse.json({ error: 'Preferred service date is invalid.' }, { status: 400 })
    }
    preferredDate = rawDate
  }

  const trackingCode = 'AVX-' + randomBytes(6).toString('hex').toUpperCase()

  try {
    await pool.query(
      'INSERT INTO computer_service_requests (tracking_code, customer_name, customer_email, customer_phone, service_type, device_details, issue_description, preferred_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [trackingCode, body.name.trim(), body.email.trim().toLowerCase(), body.phone.trim(), body.serviceType.trim(), body.deviceDetails.trim(), body.issueDescription.trim(), preferredDate],
    )
    return NextResponse.json({ ok: true, trackingCode, message: 'Your service request has been recorded.' }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[computer-service] request persistence failed', error)
    return NextResponse.json({ error: 'We could not save your request. Please try again or contact the support desk.' }, { status: 503 })
  }
}

export async function GET(request: Request) {
  if (!configured || !pool) return NextResponse.json({ error: 'Repair tracking is temporarily unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })

  const url = new URL(request.url)
  const code = (url.searchParams.get('code') || '').trim().toUpperCase()
  const email = (url.searchParams.get('email') || '').trim().toLowerCase()

  if (!/^AVX-[A-F0-9]{12}$/.test(code) || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Enter a valid tracking code and the email used for the booking.' }, { status: 400 })
  }

  try {
    const result = await pool.query(
      'SELECT tracking_code, service_type, device_details, status, quote_amount, quote_currency, created_at, updated_at FROM computer_service_requests WHERE tracking_code = $1 AND lower(customer_email) = $2 LIMIT 1',
      [code, email],
    )

    if (!result.rows.length) {
      return NextResponse.json({ error: 'No matching request was found. Check the tracking code and email.' }, { status: 404 })
    }

    const item = result.rows[0]
    return NextResponse.json({
      request: {
        trackingCode: item.tracking_code,
        serviceType: item.service_type,
        device: item.device_details,
        statusCode: item.status,
        status: statuses[item.status] || 'Status unavailable',
        quote: item.quote_amount == null ? null : { amount: item.quote_amount, currency: item.quote_currency },
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      },
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[computer-service] tracking lookup failed', error)
    return NextResponse.json({ error: 'Unable to retrieve the repair status right now.' }, { status: 503 })
  }
}
