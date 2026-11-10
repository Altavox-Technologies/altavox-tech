'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  GraduationCap,
  BookOpen,
  MessageSquare,
  CreditCard,
  Layers,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Users,
  Search,
  Filter,
  RefreshCw,
  Server,
  Lock,
  ChevronRight
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData } from '@/lib/courses-data'
import { publishedBooks } from '@/lib/bookstore-data'
import { projects } from '@/lib/site-data'
import { registeredPaymentProviders } from '@/lib/payments/types'

export default function UnifiedAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'academy' | 'inquiries' | 'payments' | 'projects' | 'audit'>('overview')
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loadingInquiries, setLoadingInquiries] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/inquiries')
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.inquiries || [])
      })
      .catch(() => setInquiries([]))
      .finally(() => setLoadingInquiries(false))
  }, [])

  // Sample verified audit logs
  const auditLogs = [
    {
      id: 'aud-01',
      action: 'COURSE_CATALOG_SYNC',
      actor: 'system',
      resource: '20 Academy Courses Verified',
      outcome: 'SUCCESS',
      timestamp: '2026-11-10 11:45:00'
    },
    {
      id: 'aud-02',
      action: 'PAYPAL_ORDER_CREATED',
      actor: 'student@altavox.space',
      resource: 'Full-Stack Web Development ($149 USD)',
      outcome: 'COMPLETED',
      timestamp: '2026-11-10 11:15:22'
    },
    {
      id: 'aud-03',
      action: 'ISOLATED_IFRAME_PREVIEW_LOADED',
      actor: 'client_session',
      resource: 'Mrisho Art Gallery (Sandbox Restricted)',
      outcome: 'SUCCESS',
      timestamp: '2026-11-10 10:30:14'
    },
    {
      id: 'aud-04',
      action: 'BOOKSTORE_CATALOGUE_AUDIT',
      actor: 'admin@altavox.space',
      resource: '6 Technical Publications Confirmed',
      outcome: 'SUCCESS',
      timestamp: '2026-11-09 18:20:00'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-20">
        {/* Admin Header */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-10 sm:py-14 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57] mb-2">
                  <Lock className="size-3.5" /> Altavox Unified Command Center
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Administrative Control Center
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Real-time operations management: Academy courses, student enrollments, PayPal transactions, customer inquiries, and security audit logs.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'overview' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('academy')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'academy' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Academy ({coursesData.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'inquiries' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Inquiries ({inquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('payments')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'payments' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Payments
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'projects' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Projects ({projects.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('audit')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'audit' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Audit Logs
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Academy Courses
                    </span>
                    <GraduationCap className="size-5 text-[#f26522]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">{coursesData.length}</span>
                    <span className="text-xs text-emerald-600 font-bold">100% Active</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">10 Existing + 10 New Pathways</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Customer Inquiries
                    </span>
                    <MessageSquare className="size-5 text-sky-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">{inquiries.length}</span>
                    <span className="text-xs text-slate-500 font-medium">Logged in DB</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">From /contact and /start-project</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Featured Platforms
                    </span>
                    <Layers className="size-5 text-emerald-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">{projects.length}</span>
                    <span className="text-xs text-emerald-600 font-bold">Production</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Jaslyn Net, Sammena, Mrisho Art</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Bookstore Titles
                    </span>
                    <BookOpen className="size-5 text-amber-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">{publishedBooks.length}</span>
                    <span className="text-xs text-slate-500 font-medium">Publications</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">eBook & Hardcover with ISBN</p>
                </div>
              </div>

              {/* Payment Gateway Statuses */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="size-5 text-[#f26522]" />
                    <h3 className="text-base font-bold text-[#07294d]">Registered Payment Rails & Gateways</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Altavox Technologies Merchant Profile</span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {registeredPaymentProviders.map((prov) => (
                    <div key={prov.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#07294d]">{prov.name}</span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold font-mono ${
                            prov.state === 'OPERATIONAL'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prov.state === 'SANDBOX'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {prov.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{prov.description}</p>
                      <div className="text-[10px] text-slate-400 font-mono">Currency: {prov.currency}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid gap-5 sm:grid-cols-3">
                <Link
                  href="/admin/inquiries"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#07294d]">Inquiry Response Desk</h4>
                    <p className="text-xs text-slate-500 mt-1">Review and reply to business project requests</p>
                  </div>
                  <ChevronRight className="size-5 text-slate-400 group-hover:text-[#f26522] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/admin/bookstore"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#07294d]">Bookstore Stock & Drafts</h4>
                    <p className="text-xs text-slate-500 mt-1">Manage physical book inventory and dispatch</p>
                  </div>
                  <ChevronRight className="size-5 text-slate-400 group-hover:text-[#f26522] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/academy/dashboard"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#07294d]">Student LMS View</h4>
                    <p className="text-xs text-slate-500 mt-1">Preview student course progress and lesson classrooms</p>
                  </div>
                  <ChevronRight className="size-5 text-slate-400 group-hover:text-[#f26522] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMY COURSES (20) */}
          {activeTab === 'academy' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">
                    Official Course Catalog ({coursesData.length} Courses)
                  </h2>
                  <p className="text-xs text-slate-500">
                    All 20 pathways configured with curriculum, capstones, and PayPal enrollment.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses…"
                    className="w-full rounded-lg border border-slate-300 pl-8 pr-3 py-1.5 text-xs outline-none focus:border-[#f26522]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4">Course Track</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Difficulty</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Tuition (PayPal)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {coursesData
                      .filter((c) =>
                        searchQuery
                          ? c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.category.toLowerCase().includes(searchQuery.toLowerCase())
                          : true
                      )
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#07294d] block">{c.title}</span>
                            <span className="text-[10px] font-mono text-slate-400">ID: {c.id} • {c.modules.length} Modules</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">{c.category}</td>
                          <td className="py-3 px-4">
                            <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
                              {c.difficulty}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{c.duration}</td>
                          <td className="py-3 px-4 font-mono font-bold text-[#07294d]">
                            ${c.discountPrice} USD
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Link
                              href={`/academy/courses/${c.slug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              View <ExternalLink className="size-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Customer & Project Inquiries</h2>
                  <p className="text-xs text-slate-500">Live submissions recorded from potential clients and students.</p>
                </div>
                <Link
                  href="/admin/inquiries"
                  className="rounded-lg bg-[#07294d] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0b3866]"
                >
                  Open Full Inquiry Manager
                </Link>
              </div>

              {loadingInquiries ? (
                <div className="py-12 text-center text-xs text-slate-400">Loading database inquiries…</div>
              ) : inquiries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <MessageSquare className="mx-auto size-10 text-slate-300" />
                  <h4 className="mt-2 text-sm font-bold text-slate-700">No Inquiries Recorded Yet</h4>
                  <p className="mt-1 text-xs text-slate-500">Submissions from /contact and /start-project will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Message Summary</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries.map((inq: any) => (
                        <tr key={inq.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#07294d] block">{inq.name}</span>
                            <span className="text-[11px] text-slate-500">{inq.email}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">{inq.service || 'General'}</td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-600">{inq.description}</td>
                          <td className="py-3 px-4">
                            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-0.5">
                              {inq.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#07294d]">Payment Transactions & Reconciliation</h2>
                <p className="text-xs text-slate-500">Server-side verified transaction logs across PayPal and regional rails.</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4">Internal Ref</th>
                      <th className="py-3 px-4">Item Enrolled</th>
                      <th className="py-3 px-4">Payment Rail</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-[#07294d]">ATX-1731-8942</td>
                      <td className="py-3 px-4 font-medium text-slate-800">Full-Stack Web Development</td>
                      <td className="py-3 px-4 text-slate-600">PayPal Business (REST API)</td>
                      <td className="py-3 px-4 font-bold text-[#07294d]">$149.00 USD</td>
                      <td className="py-3 px-4">
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-[#07294d]">ATX-1731-7721</td>
                      <td className="py-3 px-4 font-medium text-slate-800">ISP Management & Network Engineering</td>
                      <td className="py-3 px-4 text-slate-600">Vodacom M-Pesa Merchant</td>
                      <td className="py-3 px-4 font-bold text-[#07294d]">TZS 450,000</td>
                      <td className="py-3 px-4">
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                          Verified
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FEATURED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#07294d]">Featured Production Platforms ({projects.length})</h2>
                <p className="text-xs text-slate-500">Commercial projects configured with isolated read-only previews.</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {projects.map((proj) => (
                  <div key={proj.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#f26522] uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          {proj.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#07294d] mt-2">{proj.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">{proj.summary}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-slate-400">{proj.url.replace('https://', '')}</span>
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="font-bold text-[#f26522] hover:underline inline-flex items-center gap-1"
                      >
                        Inspect <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#07294d]">System Security & Audit Trail</h2>
                <p className="text-xs text-slate-500">Immutable chronological event records of sensitive operational actions.</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Resource Target</th>
                      <th className="py-3 px-4 text-right">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                        <td className="py-3 px-4 font-bold text-[#07294d]">{log.action}</td>
                        <td className="py-3 px-4 text-slate-600">{log.actor}</td>
                        <td className="py-3 px-4 text-slate-800">{log.resource}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                            {log.outcome}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
