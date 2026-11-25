import { randomInt } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedRequestTypes = new Set(['DATA_EXPORT', 'DATA_DELETION', 'RESPONSIBLE_DISCLOSURE'])

interface GovernanceRequest {
  id: string
  requestType: 'DATA_EXPORT' | 'DATA_DELETION' | 'RESPONSIBLE_DISCLOSURE'
  requesterEmail: string
  requesterName: string
  organization?: string
  status: 'RECEIVED' | 'IN_REVIEW' | 'COMPLETED'
  createdAt: string
  referenceCode: string
}

let governanceRequests: GovernanceRequest[] = []

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`trust-dsr:${ip}`, 6, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before submitting another governance request.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    )
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const { requestType, requesterEmail, requesterName, organization } = body

    if (
      typeof requestType !== 'string' ||
      !allowedRequestTypes.has(requestType) ||
      typeof requesterEmail !== 'string' ||
      !emailPattern.test(requesterEmail.trim()) ||
      requesterEmail.trim().length > 200
    ) {
      return NextResponse.json(
        { error: 'A valid request type and contact email are required.' },
        { status: 400 }
      )
    }

    const referenceCode = `DSR-${requestType.slice(0, 3)}-${randomInt(1000, 9999)}`

    const newReq: GovernanceRequest = {
      id: `gov-${Date.now()}`,
      requestType: requestType as GovernanceRequest['requestType'],
      requesterEmail: requesterEmail.trim().toLowerCase(),
      requesterName: (typeof requesterName === 'string' && requesterName.trim()
        ? requesterName.trim()
        : 'Requester'
      ).slice(0, 120),
      organization: typeof organization === 'string' ? organization.trim().slice(0, 120) : undefined,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      referenceCode
    }

    governanceRequests = [newReq, ...governanceRequests].slice(0, 100)

    return NextResponse.json(
      {
        success: true,
        message: `Your ${requestType.replace(/_/g, ' ')} request has been registered with reference ${referenceCode}. Our privacy and compliance desk will process this within 14 business days.`,
        referenceCode
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json({ error: 'Failed to register data governance request.' }, { status: 500 })
  }
}
