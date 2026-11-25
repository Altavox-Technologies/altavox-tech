import { randomInt } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getVerifiedAdminActor } from '@/lib/api-auth'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

let tickets: SupportTicket[] = []

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ticketNumber = searchParams.get('ticketNumber')?.trim().toUpperCase()
  const email = searchParams.get('email')?.trim().toLowerCase()

  const adminActor = await getVerifiedAdminActor(req)

  if (!adminActor) {
    // Allow requester to look up only their own ticket with both ticketNumber and email
    if (ticketNumber && email && emailPattern.test(email)) {
      const matched = tickets.filter(
        (t) => t.ticketNumber === ticketNumber && t.contactEmail.toLowerCase() === email
      )
      return NextResponse.json(
        { success: true, tickets: matched },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }

    return NextResponse.json(
      { error: 'Authentication or matching ticket number and email is required.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    )
  }

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

  return NextResponse.json(
    { success: true, tickets: filtered },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(`support:${ip}`, 8, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many ticket submissions. Please wait before trying again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    )
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { category, priority = 'medium', subject, description, contactEmail, contactName } = body

    if (
      typeof subject !== 'string' ||
      subject.trim().length < 3 ||
      subject.trim().length > 200 ||
      typeof description !== 'string' ||
      description.trim().length < 10 ||
      description.trim().length > 3000 ||
      typeof contactEmail !== 'string' ||
      !emailPattern.test(contactEmail.trim())
    ) {
      return NextResponse.json(
        { error: 'Valid subject, description (10-3000 chars), and contact email are required.' },
        { status: 400 }
      )
    }

    const allowedCategories = ['network', 'billing', 'academy', 'cloud', 'general'] as const
    const allowedPriorities = ['low', 'medium', 'high', 'critical'] as const

    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `AVX-TKT-${randomInt(1000, 9999)}`,
      category: allowedCategories.includes(category) ? category : 'general',
      priority: allowedPriorities.includes(priority) ? priority : 'medium',
      subject: subject.trim(),
      description: description.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      contactName: (typeof contactName === 'string' && contactName.trim() ? contactName.trim() : 'Client Engineer').slice(0, 120),
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tickets = [newTicket, ...tickets].slice(0, 200)

    return NextResponse.json({
      success: true,
      message: `Support ticket ${newTicket.ticketNumber} created. An engineer will follow up within your SLA window.`,
      ticket: newTicket,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create support ticket.' }, { status: 500 })
  }
}
