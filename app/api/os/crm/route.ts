import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface CrmLead {
  id: string
  name: string
  organization: string
  email: string
  phone: string
  stage: 'LEAD' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'CLOSED'
  estimatedValueUSD: number
  serviceTrack: 'Carrier ISP' | 'School SIMS' | 'Custom Enterprise' | 'Academy Corporate'
  notes: string
  createdAt: string
  lastContactAt: string
}

let crmLeads: CrmLead[] = [
  {
    id: 'lead-01',
    name: 'Juma Mwinyi',
    organization: 'Kilimanjaro Regional Fiber Network',
    email: 'j.mwinyi@krfn.co.tz',
    phone: '+255 784 112 900',
    stage: 'NEGOTIATION',
    estimatedValueUSD: 8500,
    serviceTrack: 'Carrier ISP',
    notes: 'Requires dual-homed BGP setup and automated M-Pesa billing unblocking daemon for 800 clients.',
    createdAt: '2026-10-25T11:00:00Z',
    lastContactAt: '2026-11-09T15:20:00Z'
  },
  {
    id: 'lead-02',
    name: 'Sister Mary Teresa',
    organization: 'St. Joseph Technical Secondary Schools Group',
    email: 'admin@stjoseph.ac.tz',
    phone: '+255 715 443 201',
    stage: 'PROPOSAL_SENT',
    estimatedValueUSD: 4200,
    serviceTrack: 'School SIMS',
    notes: 'Quotation sent for 3 campus licenses with parent SMS integration and biometric attendance gates.',
    createdAt: '2026-11-02T09:30:00Z',
    lastContactAt: '2026-11-08T10:00:00Z'
  },
  {
    id: 'lead-03',
    name: 'David Mwambene',
    organization: 'Nyika Logistics & Transport Hub',
    email: 'dmwambene@nyika.co.tz',
    phone: '+255 754 887 123',
    stage: 'QUALIFIED',
    estimatedValueUSD: 6000,
    serviceTrack: 'Custom Enterprise',
    notes: 'IoT fleet fuel sensor telemetry and PostgreSQL accounting integration.',
    createdAt: '2026-11-07T14:00:00Z',
    lastContactAt: '2026-11-10T11:00:00Z'
  },
  {
    id: 'lead-04',
    name: 'Rashid Selemani',
    organization: 'Zanzibar Port Cold Storage Cooperative',
    email: 'r.selemani@znzports.co.tz',
    phone: '+255 777 908 122',
    stage: 'WON',
    estimatedValueUSD: 3800,
    serviceTrack: 'Carrier ISP',
    notes: 'Signed 12-month SLA for managed wireless bridge to storage terminal.',
    createdAt: '2026-10-12T08:00:00Z',
    lastContactAt: '2026-11-05T16:00:00Z'
  }
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format')

  // CSV export support
  if (format === 'csv') {
    const headers = ['ID', 'Name', 'Organization', 'Email', 'Phone', 'Stage', 'Value_USD', 'Track', 'LastContact']
    const rows = crmLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.organization}"`,
      l.email,
      l.phone,
      l.stage,
      l.estimatedValueUSD,
      `"${l.serviceTrack}"`,
      l.lastContactAt
    ])
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="altavox_crm_pipeline_export.csv"'
      }
    })
  }

  const pipelineSummary = {
    totalPipelineValueUSD: crmLeads.reduce((acc, l) => acc + l.estimatedValueUSD, 0),
    activeDeals: crmLeads.length,
    wonDealsValueUSD: crmLeads.filter((l) => l.stage === 'WON').reduce((acc, l) => acc + l.estimatedValueUSD, 0)
  }

  return NextResponse.json({
    success: true,
    leads: crmLeads,
    summary: pipelineSummary
  })
}

export async function POST(req: NextRequest) {
  try {
    const { name, organization, email, phone, estimatedValueUSD, serviceTrack, notes } = await req.json()

    if (!name || !email || !organization) {
      return NextResponse.json({ error: 'Name, organization, and email are required.' }, { status: 400 })
    }

    // Deduplication check
    const duplicate = crmLeads.find(
      (l) => l.email.toLowerCase() === email.toLowerCase() || l.organization.toLowerCase() === organization.toLowerCase()
    )
    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          warning: 'Duplicate lead detected: Organization or email already active in pipeline.',
          existingLeadId: duplicate.id
        },
        { status: 409 }
      )
    }

    const newLead: CrmLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      stage: 'LEAD',
      estimatedValueUSD: Number(estimatedValueUSD) || 2000,
      serviceTrack: serviceTrack || 'Custom Enterprise',
      notes: (notes || 'Ingested via CRM console').trim(),
      createdAt: new Date().toISOString(),
      lastContactAt: new Date().toISOString()
    }

    crmLeads = [newLead, ...crmLeads]

    return NextResponse.json({
      success: true,
      message: `Lead for ${newLead.organization} created and placed in pipeline.`,
      lead: newLead
    })
  } catch (err) {
    return NextResponse.json({ error: 'CRM processing error.' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, stage, notes } = await req.json()
    const lead = crmLeads.find((l) => l.id === id)

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 })
    }

    if (stage) lead.stage = stage
    if (notes) lead.notes = notes
    lead.lastContactAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: `Lead ${lead.organization} updated to ${lead.stage}.`,
      lead
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 })
  }
}
