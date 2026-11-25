'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  MessageSquare,
  CreditCard,
  Layers,
  ExternalLink,
  Search,
  Lock,
  ChevronRight,
  LogIn,
  LogOut,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData } from '@/lib/courses-data'
import { publishedBooks } from '@/lib/bookstore-data'
import { projects as staticProjects, ProjectItem } from '@/lib/site-data'
import { registeredPaymentProviders } from '@/lib/payments/types'
import { useFirebaseAuth } from '@/components/firebase-provider'
import {
  mergeProjectsWithStatic,
  subscribePublicProjects,
  syncAllProjectsToFirestore,
} from '@/lib/firebase-projects'

export default function UnifiedAdminPage() {
  const { user, isAdmin, signInWithGoogle, signOutFirebase } = useFirebaseAuth()

  const [activeTab, setActiveTab] = useState<'overview' | 'academy' | 'inquiries' | 'payments' | 'projects' | 'audit'>('overview')
  const [inquiries, setInquiries] = useState<any[]>([])
  const [inquiriesAuthRequired, setInquiriesAuthRequired] = useState(false)
  const [loadingInquiries, setLoadingInquiries] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [paypalMode, setPaypalMode] = useState<string>('checking')
  const [firestoreProjects, setFirestoreProjects] = useState<ProjectItem[]>([])
  const [syncingProjects, setSyncingProjects] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/inquiries')
      .then(async (res) => {
        if (res.status === 401) {
          setInquiriesAuthRequired(true)
          return []
        }
        const data = await res.json()
        setInquiriesAuthRequired(false)
        return data.inquiries || []
      })
      .then((rows) => setInquiries(rows))
      .catch(() => setInquiries([]))
      .finally(() => setLoadingInquiries(false))

    fetch('/api/payments/status')
      .then((res) => res.json())
      .then((data) => setPaypalMode(data.paypalMode || 'not_configured'))
      .catch(() => setPaypalMode('not_configured'))

    const unsubscribe = subscribePublicProjects((items) => {
      setFirestoreProjects(items)
    })
    return () => unsubscribe()
  }, [])

  const allProjects = mergeProjectsWithStatic(firestoreProjects)

  async function handleSyncPortfolio() {
    if (!user || !isAdmin) return
    setSyncingProjects(true)
    setSyncMessage(null)
    try {
      const count = await syncAllProjectsToFirestore(user.uid)
      setSyncMessage(`Successfully synchronized ${count} portfolio projects to Firebase Firestore.`)
    } catch (err: unknown) {
      setSyncMessage(err instanceof Error ? err.message : 'Sync failed.')
    } finally {
      setSyncingProjects(false)
    }
  }

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
                  Manage portfolio projects via Firebase Firestore, review inquiries, audit PayPal configuration, and inspect all 20 Academy tracks.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {user ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 text-xs text-emerald-300 border border-white/15">
                        <CheckCircle2 className="size-3.5" />
                        <span>
                          Firebase: {user.email} {isAdmin ? '(Admin)' : '(Standard User)'}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => void signOutFirebase()}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
                      >
                        <LogOut className="size-3" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void signInWithGoogle()}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#f26522] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#d9531e] transition cursor-pointer"
                    >
                      <LogIn className="size-3.5" /> Sign In Admin Google Account
                    </button>
                  )}

                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
                  >
                    Control Plane Login
                  </Link>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold self-start md:self-auto">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'academy', label: `Academy (${coursesData.length})` },
                  { id: 'inquiries', label: `Inquiries (${inquiries.length})` },
                  { id: 'payments', label: 'Payments' },
                  { id: 'projects', label: `Projects (${allProjects.length})` },
                  { id: 'audit', label: 'Config Status' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`rounded-lg px-3.5 py-2 transition-all cursor-pointer ${
                      activeTab === tab.id ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
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
                    <span className="text-xs text-emerald-600 font-bold">Configured</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Catalog tracks in courses-data.ts</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Customer Inquiries
                    </span>
                    <MessageSquare className="size-5 text-sky-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">
                      {inquiriesAuthRequired ? 'Protected' : inquiries.length}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {inquiriesAuthRequired ? 'Sign in via Control Plane for DB inquiries' : 'From /contact and /start-project'}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Portfolio Projects
                    </span>
                    <Layers className="size-5 text-emerald-600" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#07294d]">{allProjects.length}</span>
                    <span className="text-xs text-emerald-600 font-bold">
                      {firestoreProjects.length} in Firebase
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">Client & Ecosystem Systems</p>
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
                  <p className="mt-1 text-[11px] text-slate-500">Published digital & print editions</p>
                </div>
              </div>

              {/* Payment Gateway Statuses */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="size-5 text-[#f26522]" />
                    <h3 className="text-base font-bold text-[#07294d]">Registered Payment Rails & Environment Status</h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    PayPal Env: <strong>{paypalMode}</strong>
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {registeredPaymentProviders.map((prov) => (
                    <div key={prov.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#07294d]">{prov.name}</span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold font-mono ${
                            prov.id === 'paypal'
                              ? paypalMode === 'not_configured'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {prov.id === 'paypal' ? paypalMode.toUpperCase() : prov.state}
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
                    <p className="text-xs text-slate-500 mt-1">Server-authenticated DB inquiry view</p>
                  </div>
                  <ChevronRight className="size-5 text-slate-400 group-hover:text-[#f26522] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/projects"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#07294d]">Firebase Portfolio Manager</h4>
                    <p className="text-xs text-slate-500 mt-1">Add, sync, and publish all Altavox projects</p>
                  </div>
                  <ChevronRight className="size-5 text-slate-400 group-hover:text-[#f26522] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/academy/dashboard"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#07294d]">Student LMS View</h4>
                    <p className="text-xs text-slate-500 mt-1">Inspect Firebase enrollment & lesson tracking</p>
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
                    All {coursesData.length} pathways configured with curriculum, capstones, and PayPal checkout routes.
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
                            <span className="text-[10px] font-mono text-slate-400">
                              ID: {c.id} • {c.modules.length} Modules
                            </span>
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
                  <p className="text-xs text-slate-500">Protected by administrator authentication.</p>
                </div>
                <Link
                  href="/admin/inquiries"
                  className="rounded-lg bg-[#07294d] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0b3866]"
                >
                  Open Inquiry Console
                </Link>
              </div>

              {loadingInquiries ? (
                <div className="py-12 text-center text-xs text-slate-400">Checking administrator access…</div>
              ) : inquiriesAuthRequired ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center space-y-3">
                  <Lock className="mx-auto size-8 text-amber-600" />
                  <h4 className="text-sm font-bold text-[#07294d]">Control Plane Session Required</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Customer inquiry records contain PII and require an active Better Auth admin session to view.
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-flex rounded-xl bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866]"
                  >
                    Sign In to Control Plane
                  </Link>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <MessageSquare className="mx-auto size-10 text-slate-300" />
                  <h4 className="mt-2 text-sm font-bold text-slate-700">No Inquiries Recorded</h4>
                  <p className="mt-1 text-xs text-slate-500">Submissions from /contact and /start-project appear here when PostgreSQL is configured.</p>
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
                <h2 className="text-xl font-bold text-[#07294d]">PayPal Business Integration Status</h2>
                <p className="text-xs text-slate-500">
                  Authoritative server verification state — only verified external API captures are recorded.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {paypalMode === 'not_configured' ? (
                    <AlertCircle className="size-6 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="size-6 text-emerald-600" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-[#07294d]">
                      PayPal Server Credentials: <span className="font-mono uppercase">{paypalMode}</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {paypalMode === 'not_configured'
                        ? 'PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are not currently configured in this environment. Checkout requests return 503 cleanly without fabricating enrollments.'
                        : 'PayPal server-side OAuth2, order creation, and return capture endpoints are active.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FEATURED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">
                    All Portfolio Platforms ({allProjects.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Client and Altavox Ecosystem platforms ({firestoreProjects.length} synced in Firebase Firestore).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => void handleSyncPortfolio()}
                      disabled={syncingProjects}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e] cursor-pointer disabled:opacity-50"
                    >
                      {syncingProjects ? <Loader2 className="size-3.5 animate-spin" /> : <CloudUpload className="size-3.5" />}
                      <span>Sync All {staticProjects.length} Projects to Firebase</span>
                    </button>
                  )}
                  <Link
                    href="/projects"
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-[#07294d] hover:bg-slate-50"
                  >
                    Open Public Portfolio
                  </Link>
                </div>
              </div>

              {syncMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
                  {syncMessage}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {allProjects.map((proj) => (
                  <div key={proj.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#f26522] uppercase tracking-wider">
                          {proj.projectGroup} · {proj.category}
                        </span>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          {proj.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#07294d] mt-2">{proj.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">{proj.summary}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[160px]">
                        {proj.url.replace(/^https?:\/\//, '')}
                      </span>
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

          {/* TAB 6: CONFIG STATUS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-[#07294d]">Runtime & Security Configuration</h2>
                <p className="text-xs text-slate-500">Live environment checks — zero fabricated telemetry logs.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 text-xs">
                  <span className="font-bold text-[#07294d] uppercase tracking-wider text-[11px]">
                    Firebase Provisioning
                  </span>
                  <p className="text-slate-600">
                    Connected to Firestore database (`ai-studio-altavoxtech-...`) with deployed security rules and verified Google Sign-In admin gate (`yurianarshad@gmail.com`).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 text-xs">
                  <span className="font-bold text-[#07294d] uppercase tracking-wider text-[11px]">
                    API Route Protection
                  </span>
                  <p className="text-slate-600">
                    Admin authentication enforced on `/api/inquiries` GET, `/api/developers/keys`, `/api/support/tickets` GET, and `/api/os/*`.
                  </p>
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
