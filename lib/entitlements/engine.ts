/**
 * Altavox Entitlement & Subscription Engine
 * Server-authoritative evaluation of customer capabilities, feature flags, usage limits, and grace periods.
 */

export type SubscriptionPlanId = 'free' | 'starter' | 'professional' | 'enterprise_carrier' | 'academy_corporate'

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'grace_period'

export interface EntitlementRule {
  featureId: string
  name: string
  description: string
  minPlan: SubscriptionPlanId
  includedLimits?: {
    seats?: number
    aiTokensMonthly?: number
    apiKeys?: number
    edgeNodes?: number
    bandwidthGbps?: number
  }
}

export interface CustomerSubscriptionRecord {
  id: string
  customerId: string
  organizationId: string
  organizationName: string
  planId: SubscriptionPlanId
  planName: string
  status: SubscriptionStatus
  seatsAllocated: number
  seatsUsed: number
  billingInterval: 'monthly' | 'annual'
  currentPeriodStart: string
  currentPeriodEnd: string
  gracePeriodEndsAt?: string
  cancelAtPeriodEnd: boolean
  provider: 'paypal' | 'mpesa' | 'invoice_wire'
  providerSubscriptionId?: string
  amount: number
  currency: 'USD' | 'TZS'
  purchasedAddons: string[]
}

export const ENTITLEMENT_CATALOG: Record<string, EntitlementRule> = {
  'edge_pop_hosting': {
    featureId: 'edge_pop_hosting',
    name: 'Dedicated Edge POP Infrastructure',
    description: 'Managed bare-metal and containerized POP hosting in Dar es Salaam, Arusha, or Zanzibar.',
    minPlan: 'enterprise_carrier',
    includedLimits: { edgeNodes: 3, bandwidthGbps: 5 }
  },
  'routeros_automation': {
    featureId: 'routeros_automation',
    name: 'Carrier RouterOS v7 Automated Unblocking',
    description: 'Sub-second mobile money bandwidth throttling without active TCP stream drops.',
    minPlan: 'enterprise_carrier'
  },
  'academy_team_seats': {
    featureId: 'academy_team_seats',
    name: 'Academy Corporate Team Access',
    description: 'Access to all 20 accredited technical courses with automated certificate tracking.',
    minPlan: 'academy_corporate',
    includedLimits: { seats: 10 }
  },
  'ai_document_intelligence': {
    featureId: 'ai_document_intelligence',
    name: 'Altavox AI RFC & Document Analysis',
    description: 'Server-side Gemini 2.5 Flash architecture analysis and DDL risk validation.',
    minPlan: 'professional',
    includedLimits: { aiTokensMonthly: 500_000 }
  },
  'api_developer_keys': {
    featureId: 'api_developer_keys',
    name: 'Developer REST API & Webhooks Access',
    description: 'Programmatic API keys with HMAC-SHA256 event streams.',
    minPlan: 'starter',
    includedLimits: { apiKeys: 5 }
  },
  'priority_sla_desk': {
    featureId: 'priority_sla_desk',
    name: '1-Hour Critical Incident SLA Response',
    description: 'Direct phone & priority ticketing access to lead carrier systems architects.',
    minPlan: 'enterprise_carrier'
  }
}

const PLAN_HIERARCHY: Record<SubscriptionPlanId, number> = {
  free: 0,
  starter: 1,
  professional: 2,
  academy_corporate: 3,
  enterprise_carrier: 4
}

// In-memory persistent subscription store for production simulation
let subscriptionsStore: CustomerSubscriptionRecord[] = [
  {
    id: 'sub-org-jaslyn-01',
    customerId: 'usr_jaslyn_exec',
    organizationId: 'org_jaslyn_telecom',
    organizationName: 'Jaslyn Telecommunications Ltd',
    planId: 'enterprise_carrier',
    planName: 'Enterprise Carrier Infrastructure SLA',
    status: 'active',
    seatsAllocated: 25,
    seatsUsed: 12,
    billingInterval: 'monthly',
    currentPeriodStart: '2026-11-01T00:00:00Z',
    currentPeriodEnd: '2026-12-01T00:00:00Z',
    cancelAtPeriodEnd: false,
    provider: 'paypal',
    providerSubscriptionId: 'I-PP-SUB-99412',
    amount: 450.0,
    currency: 'USD',
    purchasedAddons: ['additional_edge_node_znz', 'ai_high_concurrency']
  },
  {
    id: 'sub-org-sammena-02',
    customerId: 'usr_sammena_bursar',
    organizationId: 'org_sammena_school',
    organizationName: 'Sammena Educational Academy',
    planId: 'academy_corporate',
    planName: 'Academy Team Seat License',
    status: 'active',
    seatsAllocated: 15,
    seatsUsed: 15,
    billingInterval: 'annual',
    currentPeriodStart: '2026-06-15T00:00:00Z',
    currentPeriodEnd: '2027-06-15T00:00:00Z',
    cancelAtPeriodEnd: false,
    provider: 'invoice_wire',
    providerSubscriptionId: 'INV-SAM-2026',
    amount: 790.0,
    currency: 'USD',
    purchasedAddons: ['biometric_sync_queue']
  },
  {
    id: 'sub-org-mrisho-03',
    customerId: 'usr_mrisho_curator',
    organizationId: 'org_mrisho_art',
    organizationName: 'Mrisho Art Gallery',
    planId: 'professional',
    planName: 'Professional Digital Commerce',
    status: 'active',
    seatsAllocated: 5,
    seatsUsed: 3,
    billingInterval: 'monthly',
    currentPeriodStart: '2026-10-20T00:00:00Z',
    currentPeriodEnd: '2026-11-20T00:00:00Z',
    cancelAtPeriodEnd: false,
    provider: 'paypal',
    providerSubscriptionId: 'I-PP-SUB-88123',
    amount: 79.0,
    currency: 'USD',
    purchasedAddons: ['isolated_sandbox_stream']
  }
]

export class EntitlementEngine {
  static getSubscriptions(): CustomerSubscriptionRecord[] {
    return [...subscriptionsStore]
  }

  static getSubscriptionByOrg(orgId: string): CustomerSubscriptionRecord | undefined {
    return subscriptionsStore.find((s) => s.organizationId === orgId)
  }

  /**
   * Server-authoritative check whether an organization can access a given feature.
   */
  static evaluateEntitlement(
    orgId: string,
    featureId: string
  ): {
    authorized: boolean
    reason: string
    plan: SubscriptionPlanId
    status: SubscriptionStatus
  } {
    const sub = this.getSubscriptionByOrg(orgId)

    if (!sub) {
      return {
        authorized: false,
        reason: 'No subscription found for this organization. Upgrade required.',
        plan: 'free',
        status: 'unpaid'
      }
    }

    // Check account status validity (active, trialing, or grace period)
    const validStatuses: SubscriptionStatus[] = ['active', 'trialing', 'grace_period']
    if (!validStatuses.includes(sub.status)) {
      return {
        authorized: false,
        reason: `Subscription is currently ${sub.status}. Please update payment details.`,
        plan: sub.planId,
        status: sub.status
      }
    }

    const rule = ENTITLEMENT_CATALOG[featureId]
    if (!rule) {
      return {
        authorized: true,
        reason: 'Feature is unconstrained or public.',
        plan: sub.planId,
        status: sub.status
      }
    }

    // Check plan hierarchy or addon
    const requiredLevel = PLAN_HIERARCHY[rule.minPlan]
    const customerLevel = PLAN_HIERARCHY[sub.planId]

    if (customerLevel >= requiredLevel || sub.purchasedAddons.includes(featureId)) {
      return {
        authorized: true,
        reason: `Feature unlocked under ${sub.planName}.`,
        plan: sub.planId,
        status: sub.status
      }
    }

    return {
      authorized: false,
      reason: `Requires ${rule.minPlan.toUpperCase()} tier or specific add-on. Current tier: ${sub.planId}.`,
      plan: sub.planId,
      status: sub.status
    }
  }

  /**
   * Modify or upgrade subscription with auditable history
   */
  static updateSubscriptionPlan(
    orgId: string,
    newPlanId: SubscriptionPlanId,
    billingInterval: 'monthly' | 'annual'
  ): CustomerSubscriptionRecord | null {
    const index = subscriptionsStore.findIndex((s) => s.organizationId === orgId)
    if (index === -1) return null

    const planPrices: Record<SubscriptionPlanId, number> = {
      free: 0,
      starter: 29,
      professional: 79,
      academy_corporate: 790,
      enterprise_carrier: 450
    }

    const sub = subscriptionsStore[index]
    const updated: CustomerSubscriptionRecord = {
      ...sub,
      planId: newPlanId,
      planName: `${newPlanId.replace(/_/g, ' ').toUpperCase()} Plan`,
      amount: planPrices[newPlanId],
      billingInterval,
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    subscriptionsStore[index] = updated
    return updated
  }
}
