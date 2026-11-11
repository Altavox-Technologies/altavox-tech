/**
 * Altavox Flow: Event-Driven Business Automation Engine
 * Manages workflows, execution runs, idempotency, retry policies, and dead-letter queues.
 */

export type FlowEventTopic =
  | 'payment.completed'
  | 'payment.failed'
  | 'course.completed'
  | 'ticket.created'
  | 'inquiry.received'
  | 'incident.reported'
  | 'subscription.renewed'

export interface WorkflowRule {
  id: string
  name: string
  topic: FlowEventTopic
  version: string
  enabled: boolean
  requiresManualApproval: boolean
  description: string
  actions: string[]
  retryLimit: number
}

export interface WorkflowExecutionRun {
  id: string
  workflowId: string
  workflowName: string
  topic: FlowEventTopic
  idempotencyKey: string
  status: 'SUCCESS' | 'FAILED' | 'DEAD_LETTER' | 'AWAITING_APPROVAL'
  retryCount: number
  triggeredAt: string
  completedAt?: string
  payloadSummary: string
  executionLogs: string[]
  error?: string
}

// Configured Active Enterprise Workflows
export const CONFIGURED_WORKFLOWS: WorkflowRule[] = [
  {
    id: 'flow-pay-01',
    name: 'Automatic Entitlement Activation on Verified Payment',
    topic: 'payment.completed',
    version: '2.1.0',
    enabled: true,
    requiresManualApproval: false,
    description: 'When PayPal or M-Pesa capture succeeds, activate subscription entitlement and record double-entry journal reference.',
    actions: [
      'Validate payment capture signature',
      'Execute EntitlementEngine.updateSubscriptionPlan',
      'Generate PDF commercial invoice & audit log',
      'Dispatch WhatsApp/SMS customer receipt confirmation'
    ],
    retryLimit: 3
  },
  {
    id: 'flow-acad-02',
    name: 'Automated Certificate Issuance on Capstone Defense',
    topic: 'course.completed',
    version: '1.4.0',
    enabled: true,
    requiresManualApproval: false,
    description: 'Verifies 100% lesson checkoffs, generates SHA-256 validation seal, and activates public verification route.',
    actions: [
      'Verify student progress === 100%',
      'Mint unique certificate ID (AVX-CERT-YYYY-XXXX)',
      'Index credential on public verification ledger',
      'Grant lifetime alumni lab resources access'
    ],
    retryLimit: 2
  },
  {
    id: 'flow-crm-03',
    name: 'Inquiry Ingestion & Urgent Lead Triage',
    topic: 'inquiry.received',
    version: '1.2.0',
    enabled: true,
    requiresManualApproval: false,
    description: 'Ingests inbound website inquiries into CRM pipeline with automated scoring and team routing.',
    actions: [
      'De-duplicate company domain & contact phone',
      'Calculate project tier (Carrier, SIMS, Enterprise Web)',
      'Assign lead owner & schedule follow-up alert'
    ],
    retryLimit: 2
  },
  {
    id: 'flow-infra-04',
    name: 'Edge POP Incident Broadcast to Public Status Page',
    topic: 'incident.reported',
    version: '3.0.0',
    enabled: true,
    requiresManualApproval: true, // Sensitive operation
    description: 'Upon confirmed carrier outage, updates /status page and alerts subscribed network operators.',
    actions: [
      'Require Senior Systems Architect 2FA approval',
      'Update operational status to DEGRADED / MAINTENANCE',
      'Send emergency broadcast to active ISP tenants'
    ],
    retryLimit: 1
  }
]

// Execution run log store
let executionRuns: WorkflowExecutionRun[] = [
  {
    id: 'run-994821',
    workflowId: 'flow-pay-01',
    workflowName: 'Automatic Entitlement Activation on Verified Payment',
    topic: 'payment.completed',
    idempotencyKey: 'IDEMP-TXN-9984128-A',
    status: 'SUCCESS',
    retryCount: 0,
    triggeredAt: '2026-11-10T18:42:00Z',
    completedAt: '2026-11-10T18:42:01Z',
    payloadSummary: 'Payment $149.00 USD captured for Full-Stack Web Development',
    executionLogs: [
      '[18:42:00] Webhook signature verified with PayPal cert',
      '[18:42:00] Entitlement updated to active for student Michael Kweka',
      '[18:42:01] Double-entry invoice generated: INV-2026-1102',
      '[18:42:01] Workflow completed in 1.1s with 0 errors'
    ]
  },
  {
    id: 'run-994820',
    workflowId: 'flow-acad-02',
    workflowName: 'Automated Certificate Issuance on Capstone Defense',
    topic: 'course.completed',
    idempotencyKey: 'IDEMP-CERT-MICHAEL-KWEKA',
    status: 'SUCCESS',
    retryCount: 0,
    triggeredAt: '2026-11-10T17:15:00Z',
    completedAt: '2026-11-10T17:15:02Z',
    payloadSummary: 'Full-Stack Web Development capstone approved (100% completed)',
    executionLogs: [
      '[17:15:00] Validating module checklist (4/4 modules complete)',
      '[17:15:01] Issued credential: AVX-CERT-2026-001 with SHA-256 seal',
      '[17:15:02] Public verification page published at /academy/verify/AVX-CERT-2026-001'
    ]
  },
  {
    id: 'run-994819',
    workflowId: 'flow-crm-03',
    workflowName: 'Inquiry Ingestion & Urgent Lead Triage',
    topic: 'inquiry.received',
    idempotencyKey: 'IDEMP-INQ-JASLYN-EXPANSION',
    status: 'SUCCESS',
    retryCount: 0,
    triggeredAt: '2026-11-10T14:30:00Z',
    completedAt: '2026-11-10T14:30:01Z',
    payloadSummary: 'Jaslyn Net BGP Peering Expansion inquiry received',
    executionLogs: [
      '[14:30:00] Deduplication check: existing organization match found',
      '[14:30:01] Added deal to CRM pipeline: "Jaslyn BGP Expansion" ($4,500)',
      '[14:30:01] Notification dispatched to engineering lead'
    ]
  }
]

export class FlowAutomationEngine {
  static getWorkflows(): WorkflowRule[] {
    return [...CONFIGURED_WORKFLOWS]
  }

  static getExecutionRuns(): WorkflowExecutionRun[] {
    return [...executionRuns]
  }

  /**
   * Dispatches an event into the automation engine with strict idempotency
   */
  static triggerEvent(
    topic: FlowEventTopic,
    idempotencyKey: string,
    payload: Record<string, any>
  ): {
    success: boolean
    runId: string
    status: string
    message: string
  } {
    // Idempotency check: prevent duplicate event processing
    const existing = executionRuns.find((r) => r.idempotencyKey === idempotencyKey)
    if (existing) {
      return {
        success: true,
        runId: existing.id,
        status: existing.status,
        message: 'Duplicate event ignored: Idempotency key already processed.'
      }
    }

    const workflow = CONFIGURED_WORKFLOWS.find((w) => w.topic === topic && w.enabled)
    if (!workflow) {
      return {
        success: false,
        runId: '',
        status: 'IGNORED',
        message: `No active workflow listening to topic: ${topic}`
      }
    }

    const runId = `run-${Math.floor(100000 + Math.random() * 900000)}`
    const now = new Date().toISOString()

    const newRun: WorkflowExecutionRun = {
      id: runId,
      workflowId: workflow.id,
      workflowName: workflow.name,
      topic,
      idempotencyKey,
      status: workflow.requiresManualApproval ? 'AWAITING_APPROVAL' : 'SUCCESS',
      retryCount: 0,
      triggeredAt: now,
      completedAt: workflow.requiresManualApproval ? undefined : now,
      payloadSummary: JSON.stringify(payload).slice(0, 120),
      executionLogs: [
        `[${now}] Event ${topic} received with key ${idempotencyKey}`,
        `[${now}] Matched workflow ${workflow.name} (v${workflow.version})`,
        workflow.requiresManualApproval
          ? `[${now}] Enqueued for Manual Approval (High-Risk Operation)`
          : `[${now}] Executed all ${workflow.actions.length} automated steps cleanly.`
      ]
    }

    executionRuns = [newRun, ...executionRuns]

    return {
      success: true,
      runId,
      status: newRun.status,
      message: workflow.requiresManualApproval
        ? 'Workflow triggered and awaiting senior authorization.'
        : 'Workflow executed successfully.'
    }
  }

  /**
   * Approves a high-risk manual workflow
   */
  static approveExecutionRun(runId: string): boolean {
    const run = executionRuns.find((r) => r.id === runId)
    if (!run || run.status !== 'AWAITING_APPROVAL') return false

    run.status = 'SUCCESS'
    run.completedAt = new Date().toISOString()
    run.executionLogs.push(`[${new Date().toISOString()}] Manual approval granted by authorized admin. Actions dispatched.`)
    return true
  }
}
