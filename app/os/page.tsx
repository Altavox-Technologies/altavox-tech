'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Users,
  CreditCard,
  Zap,
  Boxes,
  TrendingUp,
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Download,
  Filter,
  Plus,
  ArrowRight,
  RefreshCw,
  Search,
  Check,
  X,
  FileText,
  Sliders,
  DollarSign
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function AltavoxEnterpriseOSPage() {
  const [activeTab, setActiveTab] = useState<
    'erp' | 'crm' | 'subscriptions' | 'flow' | 'productops' | 'intelligence' | 'security'
  >('erp')

  // ERP State
  const [erpData, setErpData] = useState<any>(null)
  const [erpLoading, setErpLoading] = useState(false)
  const [approvalActionNotice, setApprovalActionNotice] = useState<string | null>(null)

  // CRM State
  const [crmData, setCrmData] = useState<any>(null)
  const [newLeadName, setNewLeadName] = useState('')
  const [newLeadOrg, setNewLeadOrg] = useState('')
  const [newLeadEmail, setNewLeadEmail] = useState('')
  const [newLeadVal, setNewLeadVal] = useState('3500')
  const [crmNotice, setCrmNotice] = useState<string | null>(null)

  // Subscriptions & Entitlements State
  const [subData, setSubData] = useState<any>(null)
  const [testOrgId, setTestOrgId] = useState('org_jaslyn_telecom')
  const [testFeature, setTestFeature] = useState('edge_pop_hosting')
  const [entitlementResult, setEntitlementResult] = useState<any>(null)

  // Flow State
  const [flowData, setFlowData] = useState<any>(null)
  const [flowNotice, setFlowNotice] = useState<string | null>(null)

  // ProductOps State
  const [productOpsData, setProductOpsData] = useState<any>(null)

  // Intelligence State
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  // Security State
  const [securityData, setSecurityData] = useState<any>(null)

  useEffect(() => {
    loadAllModules()
  }, [])

  const loadAllModules = async () => {
    // 1. ERP
    fetch('/api/os/erp').then((r) => r.json()).then(setErpData).catch(() => {})
    // 2. CRM
    fetch('/api/os/crm').then((r) => r.json()).then(setCrmData).catch(() => {})
    // 3. Subscriptions
    fetch('/api/os/subscriptions').then((r) => r.json()).then(setSubData).catch(() => {})
    // 4. Flow
    fetch('/api/os/flow').then((r) => r.json()).then(setFlowData).catch(() => {})
    // 5. ProductOps
    fetch('/api/os/productops').then((r) => r.json()).then(setProductOpsData).catch(() => {})
    // 6. Analytics
    fetch('/api/os/analytics').then((r) => r.json()).then(setAnalyticsData).catch(() => {})
    // 7. Security
    fetch('/api/os/security').then((r) => r.json()).then(setSecurityData).catch(() => {})
  }

  // Handle ERP Financial Approval Decision
  const handleApprovalDecision = async (approvalId: string, decision: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/os/erp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decide_approval', approvalId, decision })
      })
      const data = await res.json()
      if (data.success) {
        setApprovalActionNotice(data.message)
        fetch('/api/os/erp').then((r) => r.json()).then(setErpData)
      }
    } catch (err) {
      alert('Error updating approval.')
    }
  }

  // Handle New CRM Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setCrmNotice(null)
    try {
      const res = await fetch('/api/os/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newLeadName,
          organization: newLeadOrg,
          email: newLeadEmail,
          estimatedValueUSD: Number(newLeadVal)
        })
      })
      const data = await res.json()
      if (data.success) {
        setCrmNotice(data.message)
        setNewLeadName('')
        setNewLeadOrg('')
        setNewLeadEmail('')
        fetch('/api/os/crm').then((r) => r.json()).then(setCrmData)
      } else {
        setCrmNotice(data.warning || data.error)
      }
    } catch (err) {
      setCrmNotice('Failed to create lead.')
    }
  }

  // Evaluate Server-Authoritative Entitlement
  const handleCheckEntitlement = async () => {
    try {
      const res = await fetch(`/api/os/subscriptions?orgId=${testOrgId}&featureId=${testFeature}`)
      const data = await res.json()
      setEntitlementResult(data.evaluation)
    } catch (err) {
      setEntitlementResult({ authorized: false, reason: 'Evaluation failure.' })
    }
  }

  // Flow Approve Run
  const handleApproveFlowRun = async (runId: string) => {
    try {
      const res = await fetch('/api/os/flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', runId })
      })
      const data = await res.json()
      if (data.success) {
        setFlowNotice(data.message)
        fetch('/api/os/flow').then((r) => r.json()).then(setFlowData)
      }
    } catch (err) {
      alert('Error approving run.')
    }
  }

  // Trigger synthetic Flow Event
  const handleTriggerTestFlow = async (topic: string) => {
    try {
      const res = await fetch('/api/os/flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger',
          topic,
          idempotencyKey: `SYNTH-IDEMP-${Date.now()}`,
          payload: { triggerSource: 'Altavox OS 3.0 Console', amountUSD: 450 }
        })
      })
      const data = await res.json()
      setFlowNotice(data.message)
      fetch('/api/os/flow').then((r) => r.json()).then(setFlowData)
    } catch (err) {
      alert('Error triggering flow event.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* OS Cockpit Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f26522]/40 bg-[#f26522]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#f48b57] mb-2">
                  <Sliders className="size-3.5" /> Altavox Enterprise Operating System (OS 3.0)
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Unified Business Cockpit
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Integrated ERP, CRM, Subscriptions, Automation Flow, ProductOps, Intelligence, and Security operations.
                </p>
              </div>

              {/* Module Nav Switcher */}
              <div className="flex flex-wrap rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-semibold gap-1">
                {[
                  { id: 'erp', label: 'ERP Operations', icon: Briefcase },
                  { id: 'crm', label: 'CRM Pipeline', icon: Users },
                  { id: 'subscriptions', label: 'Entitlements', icon: CreditCard },
                  { id: 'flow', label: 'Flow Engine', icon: Zap },
                  { id: 'productops', label: 'ProductOps', icon: Boxes },
                  { id: 'intelligence', label: 'Intelligence', icon: TrendingUp },
                  { id: 'security', label: 'Security Center', icon: ShieldAlert }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
                        activeTab === tab.id
                          ? 'bg-[#f26522] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: ERP OPERATIONS */}
          {activeTab === 'erp' && (
            <div className="space-y-8">
              {/* Top Budget Tiles */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-800/80 p-5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Total Active Project Budgets</span>
                  <p className="mt-2 text-2xl font-mono font-bold text-white">
                    ${erpData?.totalActiveBudget?.toLocaleString() || '25,500'} USD
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">Across 3 carrier & institutional deployments</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-800/80 p-5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Capital Expenditures Spent</span>
                  <p className="mt-2 text-2xl font-mono font-bold text-sky-400">
                    ${erpData?.totalSpent?.toLocaleString() || '17,750'} USD
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">69.6% Budget allocation utilized</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-800/80 p-5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Pending Financial Approvals</span>
                  <p className="mt-2 text-2xl font-mono font-bold text-amber-400">
                    {erpData?.approvals?.filter((a: any) => a.status === 'PENDING').length || 1} Request
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">Separated dual-authorization workflow</p>
                </div>
              </div>

              {approvalActionNotice && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-300 text-xs">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                  <span>{approvalActionNotice}</span>
                </div>
              )}

              {/* Active Projects Table */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white">Active Engineering Projects & Milestones</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Operational tracking of deliverables, budgets, lead architects, and completion deadlines.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {erpData?.projects?.map((proj: any) => (
                    <div key={proj.id} className="rounded-xl border border-white/10 bg-slate-900/80 p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div>
                          <span className="font-mono text-[10px] text-orange-400 font-bold uppercase">{proj.code}</span>
                          <h3 className="text-base font-bold text-white mt-0.5">{proj.name}</h3>
                          <p className="text-xs text-slate-400">Client: {proj.client} • Lead: <strong className="text-slate-200">{proj.leadEngineer}</strong></p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white">${proj.spentUSD.toLocaleString()} / ${proj.budgetUSD.toLocaleString()} USD</span>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 w-28 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-[#f26522] rounded-full" style={{ width: `${proj.progressPercent}%` }} />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{proj.progressPercent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="grid gap-2 sm:grid-cols-2">
                        {proj.milestones.map((m: any, mIdx: number) => (
                          <div key={mIdx} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                            <div className="flex items-center gap-2">
                              {m.completed ? (
                                <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <Clock className="size-3.5 text-amber-400 shrink-0" />
                              )}
                              <span className={m.completed ? 'text-slate-300' : 'text-white font-medium'}>{m.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{m.dueDate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Approval Requests */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl max-w-4xl">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-base font-bold text-white">Sensitive Financial Approval Queue</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Requires explicit Finance Admin or CTO decision. Bypasses ordinary project editing permissions.
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {erpData?.approvals?.map((appr: any) => (
                    <div key={appr.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono text-sky-400 font-bold">{appr.approvalCode}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 font-mono text-[10px]">{appr.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white mt-1">${appr.amountUSD.toLocaleString()} USD — {appr.vendor}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{appr.justification}</p>
                        <p className="text-[10px] text-slate-500 mt-1">Requested by: {appr.requestedBy}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {appr.status === 'PENDING' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprovalDecision(appr.id, 'approve')}
                              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition flex items-center gap-1"
                            >
                              <Check className="size-3.5" /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApprovalDecision(appr.id, 'reject')}
                              className="rounded-lg bg-rose-600/80 hover:bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition flex items-center gap-1"
                            >
                              <X className="size-3.5" /> Reject
                            </button>
                          </>
                        ) : (
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono ${
                            appr.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {appr.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRM PIPELINE */}
          {activeTab === 'crm' && (
            <div className="space-y-8">
              {/* Summary Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-800/80 p-5">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">Active Sales Pipeline</span>
                  <p className="mt-1 text-2xl font-mono font-bold text-white">
                    ${crmData?.summary?.totalPipelineValueUSD?.toLocaleString() || '22,500'} USD
                  </p>
                  <p className="text-xs text-slate-400">Total qualified leads: {crmData?.summary?.activeDeals || 4}</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/api/os/crm?format=csv"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                  >
                    <Download className="size-3.5" /> Export Pipeline CSV
                  </a>
                </div>
              </div>

              {crmNotice && (
                <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sky-300 text-xs">
                  {crmNotice}
                </div>
              )}

              {/* Add Lead Form */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">Ingest New Enterprise Lead</h3>
                <form onSubmit={handleCreateLead} className="grid gap-3 sm:grid-cols-5">
                  <input
                    type="text"
                    required
                    placeholder="Contact Name"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Organization (e.g., Morogoro WISP)"
                    value={newLeadOrg}
                    onChange={(e) => setNewLeadOrg(e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="number"
                    placeholder="Est. Value USD"
                    value={newLeadVal}
                    onChange={(e) => setNewLeadVal(e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e] transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="size-3.5" /> Create Lead
                  </button>
                </form>
              </div>

              {/* Pipeline Deals Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-800/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 border-b border-white/10 text-[11px] uppercase font-mono">
                    <tr>
                      <th className="py-3 px-4">Organization & Contact</th>
                      <th className="py-3 px-4">Service Track</th>
                      <th className="py-3 px-4">Pipeline Stage</th>
                      <th className="py-3 px-4">Est. Contract Value</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {crmData?.leads?.map((lead: any) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white">{lead.organization}</p>
                          <p className="text-[11px] text-slate-400">{lead.name} • {lead.email}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">{lead.serviceTrack}</td>
                        <td className="py-3.5 px-4">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono ${
                            lead.stage === 'WON'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : lead.stage === 'NEGOTIATION'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-sky-500/20 text-sky-300'
                          }`}>
                            {lead.stage}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          ${lead.estimatedValueUSD.toLocaleString()} USD
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs truncate">{lead.notes}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert(`Opening CRM detail card for: ${lead.organization}`)}
                            className="text-slate-400 hover:text-white"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SUBSCRIPTIONS & ENTITLEMENTS */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-8 max-w-5xl">
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="size-4 text-[#f26522]" /> Centralized Entitlement Engine Evaluator
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Server-authoritative evaluation preventing frontend privilege bypasses. Evaluates organization subscription states, grace periods, and purchased add-ons.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Select Tenant Organization</label>
                    <select
                      value={testOrgId}
                      onChange={(e) => setTestOrgId(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white"
                    >
                      <option value="org_jaslyn_telecom">Jaslyn Telecommunications Ltd (Carrier SLA)</option>
                      <option value="org_sammena_school">Sammena Educational Academy (Corporate)</option>
                      <option value="org_mrisho_art">Mrisho Art Gallery (Professional)</option>
                      <option value="org_unsubscribed">New Tenant (Free Tier / Unsubscribed)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Select Entitlement Rule</label>
                    <select
                      value={testFeature}
                      onChange={(e) => setTestFeature(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white"
                    >
                      <option value="edge_pop_hosting">Dedicated Edge POP Infrastructure (Enterprise)</option>
                      <option value="routeros_automation">Carrier RouterOS Automated Unblocking</option>
                      <option value="academy_team_seats">Academy Corporate Team Access (10 Seats)</option>
                      <option value="ai_document_intelligence">Altavox AI RFC & Document Analysis</option>
                      <option value="api_developer_keys">Developer REST API & Webhooks Access</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleCheckEntitlement}
                      className="w-full rounded-xl bg-[#f26522] py-2.5 text-xs font-bold text-white hover:bg-[#d9531e] transition"
                    >
                      Evaluate Server Entitlement
                    </button>
                  </div>
                </div>

                {entitlementResult && (
                  <div className={`mt-6 rounded-xl border p-4 text-xs font-mono ${
                    entitlementResult.authorized
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {entitlementResult.authorized ? (
                        <>
                          <CheckCircle2 className="size-4" />
                          <span>ACCESS AUTHORIZED</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="size-4" />
                          <span>ACCESS DENIED (PAYMENT/TIER REQUIRED)</span>
                        </>
                      )}
                    </div>
                    <p className="mt-2 text-xs">{entitlementResult.reason}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Plan: {entitlementResult.plan} • Status: {entitlementResult.status}</p>
                  </div>
                )}
              </div>

              {/* Subscriptions Table */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">Active Organization Subscriptions</h3>
                <div className="divide-y divide-white/5">
                  {subData?.subscriptions?.map((sub: any) => (
                    <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-white">{sub.organizationName}</h4>
                        <p className="text-slate-400 font-mono text-[11px]">{sub.planName} • {sub.billingInterval}</p>
                        <p className="text-[10px] text-slate-500">Provider: {sub.provider.toUpperCase()} • Renewal: {new Date(sub.currentPeriodEnd).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-base text-white">${sub.amount} {sub.currency}</span>
                        <span className="block text-[10px] font-bold text-emerald-400 font-mono mt-0.5">{sub.status.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FLOW ENGINE */}
          {activeTab === 'flow' && (
            <div className="space-y-8 max-w-5xl">
              {flowNotice && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-300 text-xs flex items-center justify-between">
                  <span>{flowNotice}</span>
                  <button type="button" onClick={() => setFlowNotice(null)} className="font-bold hover:text-white">Dismiss</button>
                </div>
              )}

              {/* Workflows List */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="size-4 text-amber-400" /> Active Event-Driven Automation Workflows
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Idempotent workflow engine with dead-letter queueing and high-risk manual authorizations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTriggerTestFlow('payment.completed')}
                    className="rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                  >
                    ⚡ Test Payment Event
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {flowData?.workflows?.map((wf: any) => (
                    <div key={wf.id} className="rounded-xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800/50">
                          {wf.topic}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">v{wf.version}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{wf.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{wf.description}</p>
                      <div className="border-t border-white/5 pt-2 text-[11px] text-slate-300 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Actions:</span>
                        {wf.actions.map((act: string, aIdx: number) => (
                          <div key={aIdx} className="truncate">• {act}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Run Logs */}
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">Automation Execution History & Dead-Letter Log</h3>
                <div className="divide-y divide-white/5 text-xs font-mono">
                  {flowData?.runs?.map((run: any) => (
                    <div key={run.id} className="py-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${run.status === 'SUCCESS' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          <span className="font-bold text-white">{run.id}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-sky-400">{run.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            run.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {run.status}
                          </span>
                          {run.status === 'AWAITING_APPROVAL' && (
                            <button
                              type="button"
                              onClick={() => handleApproveFlowRun(run.id)}
                              className="rounded bg-[#f26522] px-2 py-0.5 text-[10px] text-white font-bold hover:bg-[#d9531e]"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">{run.payloadSummary}</p>
                      <div className="bg-slate-950 p-2.5 rounded-lg text-[10px] text-slate-400 space-y-0.5">
                        {run.executionLogs?.map((l: string, lIdx: number) => (
                          <div key={lIdx}>{l}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTOPS */}
          {activeTab === 'productops' && (
            <div className="space-y-6 max-w-5xl">
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-4">Enterprise Product Lifecycle Registry</h2>
                <div className="space-y-4">
                  {productOpsData?.products?.map((prod: any) => (
                    <div key={prod.id} className="rounded-xl border border-white/10 bg-slate-900/80 p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-white">{prod.name}</h3>
                            <span className="font-mono text-sky-400 text-xs">{prod.currentVersion}</span>
                          </div>
                          <p className="text-xs text-slate-400">Owner: {prod.productOwner} • {prod.repositoryRef}</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 font-mono text-xs font-bold self-start sm:self-auto">
                          {prod.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300">
                        <span className="font-mono text-[10px] uppercase text-slate-500 block font-bold mb-1">Roadmap Priorities:</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                          {prod.roadmapHighlights?.map((r: string, rIdx: number) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Health Check: <strong className="text-emerald-400">{prod.healthCheckResult}</strong></span>
                        <a href={prod.productionUrl} target="_blank" rel="noopener noreferrer" className="text-[#f26522] hover:underline flex items-center gap-1">
                          Open Production Deployment <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INTELLIGENCE */}
          {activeTab === 'intelligence' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/80 p-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Centralized Business Intelligence & Metrics</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Observed financial, telecom, and student learning KPIs.</p>
                </div>
                <a
                  href="/api/os/analytics?format=csv"
                  className="rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e] flex items-center gap-1.5 transition"
                >
                  <Download className="size-3.5" /> Download BI Metrics CSV
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Monthly Recurring (MRR)</span>
                  <p className="text-2xl font-mono font-bold text-white mt-1">${analyticsData?.metrics?.revenue?.mrrUSD} USD</p>
                  <p className="text-[10px] text-emerald-400 mt-1">Verified Active Retainers</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-400">YTD Gross Revenue</span>
                  <p className="text-2xl font-mono font-bold text-emerald-400 mt-1">${analyticsData?.metrics?.revenue?.grossRevenueYTD_USD?.toLocaleString()} USD</p>
                  <p className="text-[10px] text-slate-400 mt-1">142 verified orders</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Enrolled Students</span>
                  <p className="text-2xl font-mono font-bold text-sky-400 mt-1">{analyticsData?.metrics?.academy?.totalEnrolledStudents}</p>
                  <p className="text-[10px] text-slate-400 mt-1">20 active courses</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Managed Subscribers</span>
                  <p className="text-2xl font-mono font-bold text-amber-400 mt-1">{analyticsData?.metrics?.telecom?.activeSubscribersManaged}</p>
                  <p className="text-[10px] text-slate-400 mt-1">99.98% Carrier SLA uptime</p>
                </div>
              </div>

              {/* Forecast Disclosure Box */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5">
                <span className="font-mono text-[10px] uppercase font-bold text-indigo-300 block mb-1">
                  Forecast Modeling & Explicit Assumptions:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Projected Q1 2027 MRR: <strong className="text-white">${analyticsData?.metrics?.forecast?.projectedQ1_2027_MRR?.toLocaleString()} USD</strong>.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {analyticsData?.metrics?.forecast?.assumptions}
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY CENTER */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-5xl">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Active Vulnerabilities</span>
                  <p className="text-2xl font-mono font-bold text-emerald-400 mt-1">0 Unmitigated</p>
                  <p className="text-[10px] text-slate-400 mt-1">Daily automated dependency audit</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Enforced TLS Policy</span>
                  <p className="text-2xl font-mono font-bold text-white mt-1">TLS 1.3</p>
                  <p className="text-[10px] text-slate-400 mt-1">HSTS Preload enabled</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Audit Log Lineage</span>
                  <p className="text-2xl font-mono font-bold text-sky-400 mt-1">PostgreSQL ACID</p>
                  <p className="text-[10px] text-slate-400 mt-1">7-Year statutory compliance</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">Authentication & Security Event Stream</h3>
                <div className="divide-y divide-white/5 font-mono text-xs">
                  {securityData?.events?.map((evt: any) => (
                    <div key={evt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            evt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : evt.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {evt.eventType}
                          </span>
                          <span className="text-slate-300">{evt.details}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">{evt.actor} • IP: {evt.ipAddress}</p>
                      </div>
                      <span className="text-[10px] text-slate-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
