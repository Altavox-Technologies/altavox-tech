import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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

let governanceRequests: GovernanceRequest[] = [
  {
    id: 'gov-01',
    requestType: 'DATA_EXPORT',
    requesterEmail: 'student@altavox.space',
    requesterName: 'Michael Kweka',
    status: 'COMPLETED',
    createdAt: '2026-11-04T12:00:00Z',
    referenceCode: 'DSR-EXP-9921'
  }
]

export async function POST(req: NextRequest) {
  try {
    const { requestType, requesterEmail, requesterName, details, organization } = await req.json()

    if (!requesterEmail || !requestType) {
      return NextResponse.json({ error: 'Email and request type are required.' }, { status: 400 })
    }

    const referenceCode = `DSR-${requestType.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`

    const newReq: GovernanceRequest = {
      id: `gov-${Date.now()}`,
      requestType,
      requesterEmail: requesterEmail.trim(),
      requesterName: (requesterName || 'User').trim(),
      organization,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      referenceCode
    }

    governanceRequests = [newReq, ...governanceRequests]

    return NextResponse.json({
      success: true,
      message: `Your ${requestType.replace(/_/g, ' ')} request has been registered with reference ${referenceCode}. Our privacy and compliance desk will process this within 14 business days.`,
      referenceCode
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to register data governance request.' }, { status: 500 })
  }
}
