import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface ErpProject {
  id: string
  code: string
  name: string
  client: string
  status: 'ACTIVE' | 'PLANNING' | 'COMPLETED' | 'PAUSED'
  leadEngineer: string
  budgetUSD: number
  spentUSD: number
  progressPercent: number
  targetDate: string
  milestones: { title: string; dueDate: string; completed: boolean }[]
}

interface FinancialApproval {
  id: string
  approvalCode: string
  category: 'CAPEX_HARDWARE' | 'FIBER_TRANSIT' | 'PAYROLL' | 'LICENSING'
  requestedBy: string
  amountUSD: number
  vendor: string
  justification: string
  status: 'APPROVED' | 'PENDING' | 'REJECTED'
  requestedAt: string
}

let erpProjects: ErpProject[] = [
  {
    id: 'prj-01',
    code: 'PRJ-JASLYN-EXP',
    name: 'Jaslyn Net Multi-POP 10Gbps Core Fiber Upgrade',
    client: 'Jaslyn Telecommunications Ltd',
    status: 'ACTIVE',
    leadEngineer: 'Amani Bakari',
    budgetUSD: 14500,
    spentUSD: 8200,
    progressPercent: 68,
    targetDate: 'December 20, 2026',
    milestones: [
      { title: 'MikroTik CCR2116 core router installation', dueDate: 'Nov 1, 2026', completed: true },
      { title: 'TIX Dar es Salaam BGP peering link turn-up', dueDate: 'Nov 15, 2026', completed: true },
      { title: 'Arusha POP redundant microwave failover test', dueDate: 'Dec 5, 2026', completed: false },
      { title: 'PPPoE automated unblocking stress test (1,000 subs)', dueDate: 'Dec 18, 2026', completed: false }
    ]
  },
  {
    id: 'prj-02',
    code: 'PRJ-SAMMENA-SIMS',
    name: 'Sammena School Academic ERP & Biometric Attendance Engine',
    client: 'Sammena Educational Academy',
    status: 'ACTIVE',
    leadEngineer: 'Grace Mchome',
    budgetUSD: 6800,
    spentUSD: 5400,
    progressPercent: 85,
    targetDate: 'November 30, 2026',
    milestones: [
      { title: 'Student registry PostgreSQL schema & migration', dueDate: 'Oct 15, 2026', completed: true },
      { title: 'Biometric fingerprint reader sync daemon', dueDate: 'Nov 5, 2026', completed: true },
      { title: 'Bursar fee reconciliation & parent SMS alert hooks', dueDate: 'Nov 20, 2026', completed: false }
    ]
  },
  {
    id: 'prj-03',
    code: 'PRJ-MRISHO-STORE',
    name: 'Mrisho Art Global E-Commerce & Curated Gallery Platform',
    client: 'Mrisho Art Gallery',
    status: 'COMPLETED',
    leadEngineer: 'Michael Kweka',
    budgetUSD: 4200,
    spentUSD: 4150,
    progressPercent: 100,
    targetDate: 'November 2, 2026',
    milestones: [
      { title: 'High-res image streaming & sandboxed iframe viewer', dueDate: 'Oct 10, 2026', completed: true },
      { title: 'PayPal Business international card checkout', dueDate: 'Oct 28, 2026', completed: true },
      { title: 'Production cutover and DNS verification', dueDate: 'Nov 2, 2026', completed: true }
    ]
  }
]

let financialApprovals: FinancialApproval[] = [
  {
    id: 'appr-01',
    approvalCode: 'APPR-2026-0881',
    category: 'CAPEX_HARDWARE',
    requestedBy: 'Amani Bakari (Carrier Ops)',
    amountUSD: 2450.0,
    vendor: 'MikroTik Certified Regional Distributor',
    justification: 'Purchase of 2x MikroTik CCR2004-16G-2S+ for Zanzibar Edge POP deployment.',
    status: 'APPROVED',
    requestedAt: '2026-11-04T10:00:00Z'
  },
  {
    id: 'appr-02',
    approvalCode: 'APPR-2026-0884',
    category: 'FIBER_TRANSIT',
    requestedBy: 'Michael Kweka (CTO)',
    amountUSD: 1800.0,
    vendor: 'Tanzania Telecommunications Corp (TTCL)',
    justification: 'Q4 2026 dedicated IP transit cross-connect link renewal at Dar TIX facility.',
    status: 'APPROVED',
    requestedAt: '2026-11-08T14:30:00Z'
  },
  {
    id: 'appr-03',
    approvalCode: 'APPR-2026-0889',
    category: 'LICENSING',
    requestedBy: 'Grace Mchome (Lead Engineer)',
    amountUSD: 650.0,
    vendor: 'Global Security Code Signing Authority',
    justification: 'Annual cryptographic EV code-signing certificate for RouterOS Windows management utility.',
    status: 'PENDING',
    requestedAt: '2026-11-10T16:00:00Z'
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    projects: erpProjects,
    approvals: financialApprovals,
    totalActiveBudget: erpProjects.reduce((acc, p) => acc + p.budgetUSD, 0),
    totalSpent: erpProjects.reduce((acc, p) => acc + p.spentUSD, 0)
  })
}

export async function POST(req: NextRequest) {
  try {
    const { action, approvalId, decision } = await req.json()

    if (action === 'decide_approval') {
      const appr = financialApprovals.find((a) => a.id === approvalId)
      if (!appr) {
        return NextResponse.json({ error: 'Approval request not found.' }, { status: 404 })
      }

      appr.status = decision === 'approve' ? 'APPROVED' : 'REJECTED'

      return NextResponse.json({
        success: true,
        message: `Financial request ${appr.approvalCode} marked as ${appr.status}.`,
        approval: appr
      })
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'ERP processing error.' }, { status: 500 })
  }
}
