'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  User,
  ShieldCheck,
  CreditCard,
  Download,
  BookOpen,
  LifeBuoy,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'invoices' | 'organization' | 'tickets'>('overview')
  const [currentOrg, setCurrentOrg] = useState('Jaslyn Telecommunications Ltd')

  const clientSubscriptions = [
    {
      id: 'sub-carrier-01',
      name: 'Managed Edge POP & RouterOS SLA',
      tier: 'Enterprise Carrier',
      status: 'Active',
      renewalDate: 'December 1, 2026',
      amount: '$450.00 / month',
      nodes: 'DAR-01, ARK-POP'
    },
    {
      id: 'sub-lms-02',
      name: 'Altavox Academy Corporate Team Seat License',
      tier: 'Team Access (10 Seats)',
      status: 'Active',
      renewalDate: 'January 15, 2027',
      amount: '$790.00 / year',
      nodes: '20 Enrolled Engineers'
    }
  ]

  const invoices = [
    {
      id: 'INV-2026-1102',
      date: 'November 1, 2026',
      service: 'Managed Edge POP Infrastructure Support',
      amount: '$450.00 USD',
      status: 'Paid',
      paymentRail: 'PayPal Business'
    },
    {
      id: 'INV-2026-1015',
      date: 'October 15, 2026',
      service: 'MikroTik RouterOS v7 Engineering Licenses',
      amount: 'TZS 1,200,000',
      status: 'Paid',
      paymentRail: 'Vodacom M-Pesa Merchant'
    },
    {
      id: 'INV-2026-0901',
      date: 'September 1, 2026',
      service: 'Next.js SIS Biometric System Architecture Phase 1',
      amount: '$1,850.00 USD',
      status: 'Paid',
      paymentRail: 'Wire Transfer / Swift'
    }
  ]

  const orgMembers = [
    { name: 'Michael Kweka', email: 'm.kweka@jaslyn.co.tz', role: 'Owner / Org Admin', status: 'Active' },
    { name: 'Grace Mchome', email: 'g.mchome@jaslyn.co.tz', role: 'Network Operations Lead', status: 'Active' },
    { name: 'Amani Bakari', email: 'a.bakari@jaslyn.co.tz', role: 'Billing Systems Engineer', status: 'Active' }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Portal Header */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-12 sm:py-16 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                  <Building2 className="size-3.5" /> Altavox Business & Client Portal
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Enterprise Client Dashboard
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Tenant Organization: <strong className="text-white">{currentOrg}</strong> • Tenant ID: <span className="font-mono text-orange-400">TEN-TZ-8841</span>
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'overview' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('subscriptions')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'subscriptions' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  SLA Subscriptions ({clientSubscriptions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('invoices')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'invoices' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Billing Invoices
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('organization')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'organization' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Team Access
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stat Tiles */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Active Services</span>
                    <ShieldCheck className="size-4 text-emerald-600" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-[#07294d]">3 Contracts</p>
                  <p className="mt-1 text-xs text-emerald-700 font-medium">All POPs Operational</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Academy Seats</span>
                    <BookOpen className="size-4 text-[#f26522]" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-[#07294d]">10 Allocated</p>
                  <p className="mt-1 text-xs text-slate-500">6 active enrolled engineers</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Outstanding Invoices</span>
                    <CreditCard className="size-4 text-sky-600" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-[#07294d]">$0.00 USD</p>
                  <p className="mt-1 text-xs text-slate-500">Account in good standing</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Priority Support</span>
                    <LifeBuoy className="size-4 text-amber-600" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-[#07294d]">1h SLA</p>
                  <p className="mt-1 text-xs text-slate-500">Direct carrier desk access</p>
                </div>
              </div>

              {/* Active Contracts & Quick Actions */}
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-base font-bold text-[#07294d]">Active Enterprise SLA Services</h2>
                    <Link href="/contact" className="text-xs font-bold text-[#f26522] hover:underline">
                      Request Scope Change
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {clientSubscriptions.map((sub) => (
                      <div key={sub.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-[#07294d]">{sub.name}</h3>
                          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                            {sub.status}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase">Tier</span>
                            <span className="font-medium text-slate-800">{sub.tier}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase">Billed Amount</span>
                            <span className="font-bold text-[#07294d]">{sub.amount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Link Launcher */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-[#07294d]">Quick Tenant Actions</h3>
                  
                  <Link
                    href="/academy/dashboard"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="size-4 text-[#f26522]" />
                      <span>Launch Team Learning Dashboard</span>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/support"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <LifeBuoy className="size-4 text-sky-600" />
                      <span>Open Critical Incident Ticket</span>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </Link>

                  <Link
                    href="/cloud"
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-emerald-600" />
                      <span>View Cloud & POP Telemetry</span>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs max-w-5xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#07294d]">Billing Invoices & Receipts</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified commercial payment records processed via PayPal Business and authorized mobile-money merchants.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase font-mono">
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Billing Service</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#07294d]">{inv.id}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{inv.service}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.paymentRail}</td>
                        <td className="py-3.5 px-4 text-slate-500">{inv.date}</td>
                        <td className="py-3.5 px-4 font-bold text-[#07294d]">{inv.amount}</td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORGANIZATION MEMBERS */}
          {activeTab === 'organization' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs max-w-4xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#07294d]">Team Members & Access Roles</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authorized organization personnel with access to portal telemetry and billing records.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('New member invitation modal opened for organization: ' + currentOrg)}
                  className="rounded-lg bg-[#f26522] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#d9531e] flex items-center gap-1.5"
                >
                  <Plus className="size-3.5" /> Invite Member
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {orgMembers.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs font-mono">
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#07294d]">{m.name}</h4>
                        <p className="text-[11px] text-slate-500">{m.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-slate-700">{m.role}</span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
              {clientSubscriptions.map((s) => (
                <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#f26522]">{s.tier}</span>
                    <h3 className="text-base font-bold text-[#07294d] mt-1">{s.name}</h3>
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      Includes 24/7 proactive ping telemetry, multi-region failover monitoring, and priority engineer dispatch.
                    </p>
                    <div className="mt-4 border-t border-slate-100 pt-3 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Nodes:</span>
                        <span className="font-mono text-slate-800">{s.nodes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Next Renewal:</span>
                        <span className="text-slate-800 font-medium">{s.renewalDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#07294d]">{s.amount}</span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1">
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
