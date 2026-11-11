import { NextRequest, NextResponse } from 'next/server'
import { EntitlementEngine, ENTITLEMENT_CATALOG, SubscriptionPlanId } from '@/lib/entitlements/engine'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orgId = searchParams.get('orgId')
  const featureId = searchParams.get('featureId')

  // If specific entitlement check is requested
  if (orgId && featureId) {
    const result = EntitlementEngine.evaluateEntitlement(orgId, featureId)
    return NextResponse.json({
      success: true,
      orgId,
      featureId,
      evaluation: result
    })
  }

  const subscriptions = EntitlementEngine.getSubscriptions()
  return NextResponse.json({
    success: true,
    subscriptions,
    catalog: ENTITLEMENT_CATALOG
  })
}

export async function POST(req: NextRequest) {
  try {
    const { orgId, newPlanId, billingInterval = 'monthly' } = await req.json()

    if (!orgId || !newPlanId) {
      return NextResponse.json({ error: 'Organization ID and new plan ID are required.' }, { status: 400 })
    }

    const updated = EntitlementEngine.updateSubscriptionPlan(
      orgId,
      newPlanId as SubscriptionPlanId,
      billingInterval
    )

    if (!updated) {
      return NextResponse.json({ error: 'Subscription not found for this organization.' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Organization subscription upgraded to ${updated.planName}.`,
      subscription: updated
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process subscription upgrade.' }, { status: 500 })
  }
}
