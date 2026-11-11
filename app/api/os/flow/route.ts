import { NextRequest, NextResponse } from 'next/server'
import { FlowAutomationEngine, FlowEventTopic } from '@/lib/flow/engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  const workflows = FlowAutomationEngine.getWorkflows()
  const runs = FlowAutomationEngine.getExecutionRuns()

  return NextResponse.json({
    success: true,
    workflows,
    runs,
    metrics: {
      totalWorkflows: workflows.length,
      activeRuns: runs.length,
      successRate: Math.round((runs.filter((r) => r.status === 'SUCCESS').length / runs.length) * 100)
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const { action, topic, idempotencyKey, payload, runId } = await req.json()

    if (action === 'trigger') {
      if (!topic || !idempotencyKey) {
        return NextResponse.json({ error: 'Topic and idempotencyKey are required.' }, { status: 400 })
      }

      const result = FlowAutomationEngine.triggerEvent(
        topic as FlowEventTopic,
        idempotencyKey,
        payload || {}
      )

      return NextResponse.json(result)
    }

    if (action === 'approve') {
      if (!runId) {
        return NextResponse.json({ error: 'Run ID is required.' }, { status: 400 })
      }

      const ok = FlowAutomationEngine.approveExecutionRun(runId)
      if (!ok) {
        return NextResponse.json({ error: 'Run not found or not in awaiting approval state.' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        message: `Execution run ${runId} approved and executed.`
      })
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Flow execution failure.' }, { status: 500 })
  }
}
