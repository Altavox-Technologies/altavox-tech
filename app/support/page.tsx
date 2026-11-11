'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LifeBuoy,
  MessageSquare,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  Send,
  FileQuestion,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

interface TicketItem {
  id: string
  ticketNumber: string
  category: string
  priority: string
  subject: string
  description: string
  contactEmail: string
  contactName: string
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'RESOLVED' | 'CLOSED'
  createdAt: string
}

export default function AltavoxSupportPage() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'new-ticket' | 'kb' | 'incidents'>('tickets')
  const [tickets, setTickets] = useState<TicketItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [kbQuery, setKbQuery] = useState('')

  // New ticket state
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'network' | 'billing' | 'academy' | 'cloud' | 'general'>('network')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium')
  const [contactEmail, setContactEmail] = useState('')
  const [contactName, setContactName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [ticketNotice, setTicketNotice] = useState<string | null>(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/support/tickets')
      const data = await res.json()
      if (data.tickets) setTickets(data.tickets)
    } catch (err) {
      // Fallback
    }
  }

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !description || !contactEmail) return

    setSubmitting(true)
    setTicketNotice(null)

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          priority,
          subject,
          description,
          contactEmail,
          contactName
        })
      })
      const data = await res.json()
      if (data.success && data.ticket) {
        setTicketNotice(data.message)
        setSubject('')
        setDescription('')
        setActiveTab('tickets')
        fetchTickets()
      } else {
        alert(data.error || 'Failed to submit ticket.')
      }
    } catch (err) {
      alert('Error communicating with support API.')
    } finally {
      setSubmitting(false)
    }
  }

  const kbArticles = [
    {
      category: 'Network Operations',
      title: 'Configuring PPPoE Server Isolation on RouterOS v7',
      excerpt: 'Learn how to prevent cross-subscriber ARP poisoning and enforce dynamic bandwidth rate-limit profiles.'
    },
    {
      category: 'Billing & Payments',
      title: 'PayPal Business Transaction Reconciliation & Webhook Replays',
      excerpt: 'How Altavox Tech verifies PayPal transmission signatures and handles idempotent order captures.'
    },
    {
      category: 'Altavox Academy',
      title: 'Public Certificate Verification via SHA-256 Hashes',
      excerpt: 'How employers and accreditation bodies verify official Altavox credentials using unique certificate IDs.'
    },
    {
      category: 'Cloud & Deployments',
      title: 'Rollback Procedures for Edge POP Container Artifacts',
      excerpt: 'Step-by-step canary rollback to prior verified git commits with zero downtime.'
    }
  ]

  const filteredKb = kbArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(kbQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(kbQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(kbQuery.toLowerCase())
  )

  const statusColors = {
    OPEN: 'bg-sky-100 text-sky-800 border-sky-300',
    IN_PROGRESS: 'bg-amber-100 text-amber-800 border-amber-300',
    WAITING_FOR_CUSTOMER: 'bg-purple-100 text-purple-800 border-purple-300',
    RESOLVED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    CLOSED: 'bg-slate-100 text-slate-700 border-slate-300'
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Support Hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 sm:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">
                  <LifeBuoy className="size-3.5" /> Altavox Connect & Support Division
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Technical Support & Incident Desk
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-300">
                  Direct engineering assistance for carrier networks, Academy students, and enterprise software clients.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('tickets')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'tickets' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  My Tickets ({tickets.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('new-ticket')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'new-ticket' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('kb')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'kb' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Knowledge Base
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('incidents')}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    activeTab === 'incidents' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Service Status
                </button>
              </div>
            </div>
          </div>
        </section>

        {ticketNotice && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{ticketNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setTicketNotice(null)}
                className="font-bold text-emerald-800 hover:text-emerald-950 text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: TICKETS LIST */}
          {activeTab === 'tickets' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Active Support Tickets</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tickets submitted by your organization or student account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('new-ticket')}
                  className="rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e] transition"
                >
                  + Open New Ticket
                </button>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#07294d]">{t.ticketNumber}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono uppercase text-[10px] text-slate-500">{t.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusColors[t.status]}`}>
                          {t.status.replace(/_/g, ' ')}
                        </span>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          t.priority === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {t.priority}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#07294d]">{t.subject}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{t.description}</p>

                    <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Submitted by: <strong className="text-slate-700">{t.contactName}</strong> ({t.contactEmail})</span>
                      <span>Created: {new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NEW TICKET */}
          {activeTab === 'new-ticket' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs max-w-3xl">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-lg font-bold text-[#07294d]">Create Support Ticket</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our engineering team monitors incoming incident reports according to contractual response SLAs.
                </p>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Michael Kweka"
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. operator@altavox.space"
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ticket Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                    >
                      <option value="network">Network Infrastructure & RouterOS</option>
                      <option value="billing">Billing, Payments & Invoices</option>
                      <option value="academy">Altavox Academy & LMS</option>
                      <option value="cloud">Cloud Hosting & Deployments</option>
                      <option value="general">General Technical Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                    >
                      <option value="low">Low (Standard Question)</option>
                      <option value="medium">Medium (Degraded Performance)</option>
                      <option value="high">High (Service Blocked)</option>
                      <option value="critical">Critical (Network Outage / Billing Blocker)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of the issue..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                  <textarea
                    rows={5}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide diagnostic steps, error codes, affected domains or subscriber IDs..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-[#f26522] px-6 py-3 text-xs font-bold text-white hover:bg-[#d9531e] disabled:opacity-50 transition"
                  >
                    {submitting ? 'Submitting Ticket...' : 'Dispatch Ticket to Support Desk'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: KNOWLEDGE BASE */}
          {activeTab === 'kb' && (
            <div className="space-y-6 max-w-4xl">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-[#07294d]">Self-Service Engineering Knowledge Base</h2>
                <div className="mt-4 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    value={kbQuery}
                    onChange={(e) => setKbQuery(e.target.value)}
                    placeholder="Search RouterOS scripts, PayPal webhooks, certificate verification..."
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs focus:border-[#f26522] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredKb.map((art, idx) => (
                  <article key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#f26522]">{art.category}</span>
                      <h3 className="font-bold text-sm text-[#07294d] mt-1">{art.title}</h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">{art.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-xs font-semibold text-[#07294d] hover:text-[#f26522] cursor-pointer">
                        Read Technical Guide →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INCIDENTS & STATUS */}
          {activeTab === 'incidents' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#07294d]">Operational Service Status</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time status of all Altavox public clusters, edge POPs, and payment rails.
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  All Systems Operational
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#07294d]">Dar es Salaam Edge POP (DAR-01)</span>
                  <span className="text-emerald-700 font-semibold">100% Operational (12ms)</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#07294d]">Arusha Fiber Hub (ARK-POP)</span>
                  <span className="text-emerald-700 font-semibold">100% Operational (14ms)</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#07294d]">PayPal Business Payment Rail</span>
                  <span className="text-emerald-700 font-semibold">Healthy (Server Webhooks Active)</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-[#07294d]">Altavox Academy LMS Cloud Engine</span>
                  <span className="text-emerald-700 font-semibold">100% Operational (20 Courses Live)</span>
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
