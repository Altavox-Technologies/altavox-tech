import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export interface SupportTicket {
  id: string
  ticketNumber: string
  category: 'network' | 'billing' | 'academy' | 'cloud' | 'general'
  priority: 'low' | 'medium' | 'high' | 'critical'
  subject: string
  description: string
  contactEmail: string
  contactName: string
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'RESOLVED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}

let tickets: SupportTicket[] = [
  {
    id: 'tkt-01',
    ticketNumber: 'AVX-TKT-8841',
    category: 'network',
    priority: 'high',
    subject: 'RouterOS v7 PPPoE Radius disconnect latency during peak hours',
    description: 'We observed intermittent 2-second packet latency spikes during radius re-authentication across 400 subscriber sessions.',
    contactEmail: 'm.kweka@jaslyn.co.tz',
    contactName: 'Michael Kweka',
    status: 'IN_PROGRESS',
    createdAt: '2026-11-09T14:20:00Z',
    updatedAt: '2026-11-10T09:15:00Z'
  },
  {
    id: 'tkt-02',
    ticketNumber: 'AVX-TKT-8839',
    category: 'billing',
    priority: 'medium',
    subject: 'PayPal Webhook idempotency reconciliation confirmation',
    description: 'Confirming if transaction TXN-9984128 was automatically reconciled in internal double-entry ledger.',
    contactEmail: 'student@altavox.space',
    contactName: 'Grace Mchome',
    status: 'RESOLVED',
    createdAt: '2026-11-08T11:00:00Z',
    updatedAt: '2026-11-08T11:45:00Z'
  },
  {
    id: 'tkt-03',
    ticketNumber: 'AVX-TKT-8835',
    category: 'academy',
    priority: 'low',
    subject: 'Request for physical lab access at Arusha facility for RouterOS Trunking',
    description: 'Enrolled student requesting weekend physical bench access for MikroTik trunking lab.',
    contactEmail: 'student.arusha@altavox.space',
    contactName: 'Amani Bakari',
    status: 'CLOSED',
    createdAt: '2026-11-05T08:30:00Z',
    updatedAt: '2026-11-06T16:00:00Z'
  }
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.toLowerCase()
  const category = searchParams.get('category')

  let filtered = [...tickets]

  if (category && category !== 'all') {
    filtered = filtered.filter((t) => t.category === category)
  }

  if (query) {
    filtered = filtered.filter(
      (t) =>
        t.ticketNumber.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.contactEmail.toLowerCase().includes(query)
    )
  }

  return NextResponse.json({ success: true, tickets: filtered })
}

export async function POST(req: NextRequest) {
  try {
    const { category, priority = 'medium', subject, description, contactEmail, contactName } = await req.json()

    if (!subject || !description || !contactEmail) {
      return NextResponse.json({ error: 'Subject, description, and contact email are required.' }, { status: 400 })
    }

    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `AVX-TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      category: category || 'general',
      priority: priority || 'medium',
      subject: subject.trim(),
      description: description.trim(),
      contactEmail: contactEmail.trim(),
      contactName: (contactName || 'Client Engineer').trim(),
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    tickets = [newTicket, ...tickets]

    return NextResponse.json({
      success: true,
      message: `Support ticket ${newTicket.ticketNumber} created. An engineer will follow up within your SLA window.`,
      ticket: newTicket
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create support ticket.' }, { status: 500 })
  }
}
