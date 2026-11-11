'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  Server,
  Database,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Building2,
  UserCheck
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function AltavoxTrustCenterPage() {
  const [requestType, setRequestType] = useState<'DATA_EXPORT' | 'DATA_DELETION' | 'RESPONSIBLE_DISCLOSURE'>('DATA_EXPORT')
  const [requesterName, setRequesterName] = useState('')
  const [requesterEmail, setRequesterEmail] = useState('')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [responseNotice, setResponseNotice] = useState<string | null>(null)

  const handleDataRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!requesterEmail) return

    setSubmitting(true)
    setResponseNotice(null)

    try {
      const res = await fetch('/api/trust/data-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType,
          requesterName,
          requesterEmail,
          details
        })
      })
      const data = await res.json()
      if (data.success) {
        setResponseNotice(data.message)
        setRequesterName('')
        setRequesterEmail('')
        setDetails('')
      } else {
        alert(data.error || 'Failed to submit request.')
      }
    } catch (err) {
      alert('Error contacting trust desk.')
    } finally {
      setSubmitting(false)
    }
  }

  const subprocessors = [
    {
      name: 'PayPal Holdings Inc.',
      purpose: 'International Credit Card & Merchant Account Settlement',
      location: 'United States & Global',
      dataShared: 'Order reference, transaction amounts, customer email',
      compliance: 'PCI-DSS Level 1'
    },
    {
      name: 'Vodacom Tanzania PLC (Daraja)',
      purpose: 'East African M-Pesa Mobile-Money Processing Rail',
      location: 'Dar es Salaam, Tanzania',
      dataShared: 'Carrier MSISDN phone number, billing reference',
      compliance: 'Bank of Tanzania (BoT) Licensed'
    },
    {
      name: 'Google Cloud Platform (Gemini SDK)',
      purpose: 'Server-Side Technical RFC Analysis & Architecture Engine',
      location: 'Global Multi-Region',
      dataShared: 'Technical queries only; zero customer document training retention',
      compliance: 'ISO/IEC 27001, SOC 2 Type II'
    }
  ]

  const dataClassifications = [
    {
      tier: 'Public',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Course catalog, published research RFCs, technical books index, and public certificate verification hashes.',
      retention: 'Permanent / Published'
    },
    {
      tier: 'Internal',
      badgeColor: 'bg-sky-100 text-sky-800',
      description: 'Edge POP latency telemetry, anonymized traffic flow histograms, and system build pipeline logs.',
      retention: '90 Days Rolling'
    },
    {
      tier: 'Confidential',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Customer contact details, CRM deal notes, student progress metrics, and support ticket correspondence.',
      retention: '3 Years from Active Contract'
    },
    {
      tier: 'Restricted',
      badgeColor: 'bg-rose-100 text-rose-800',
      description: 'Financial double-entry ledger rows, invoice payment hashes, and administrative credential secrets.',
      retention: '7 Years Statutory Audit'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Trust Hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-24 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                <ShieldCheck className="size-3.5" /> Altavox Trust & Governance Center
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Security Architecture, Data Governance & Integrity
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                We design and operate telecommunications, academic, and financial platforms with strict data classification, verified subprocessors, and transparent governance.
              </p>
            </div>
          </div>
        </section>

        {responseNotice && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{responseNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setResponseNotice(null)}
                className="font-bold text-emerald-800 hover:text-emerald-950 text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14 space-y-16">
          {/* Section 1: Security Controls & Architecture */}
          <div>
            <div className="border-b border-slate-200 pb-4 mb-8">
              <h2 className="text-2xl font-extrabold text-[#07294d]">Security Architecture Standards</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Technical safeguards enforced across all Altavox public endpoints and internal databases.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <Lock className="size-6 text-[#f26522]" />
                <h3 className="mt-3 text-sm font-bold text-[#07294d]">Zero Client-Side Secrets</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  PayPal credentials, database connection strings, and Gemini API keys are strictly confined to server-side environments.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <Server className="size-6 text-sky-600" />
                <h3 className="mt-3 text-sm font-bold text-[#07294d]">Isolated Preview Sandboxes</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Third-party platforms and web previews are isolated in sandboxed containers with strict script-only permissions.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <Database className="size-6 text-indigo-600" />
                <h3 className="mt-3 text-sm font-bold text-[#07294d]">Immutable Financial Ledgers</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Transaction entries use double-entry zero-sum structures with unique idempotency keys to eliminate double-captures.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <UserCheck className="size-6 text-emerald-600" />
                <h3 className="mt-3 text-sm font-bold text-[#07294d]">Role-Based Access (RBAC)</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Least-privilege permission matrix separating student LMS actions, carrier support desks, and executive financial approvals.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Data Classification Matrix */}
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#07294d]">Data Classification & Retention Policy</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                How Altavox categorizes, protects, and lifecycle-manages customer and system records.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase font-mono">
                    <th className="py-3.5 px-4">Classification Tier</th>
                    <th className="py-3.5 px-4">Data Types Included</th>
                    <th className="py-3.5 px-4">Retention Schedule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataClassifications.map((dc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase ${dc.badgeColor}`}>
                          {dc.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">{dc.description}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#07294d]">{dc.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Subprocessors Disclosures */}
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#07294d]">Authorized Subprocessors</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified third-party infrastructure and payment partners utilized to deliver services.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase font-mono">
                    <th className="py-3.5 px-4">Subprocessor Entity</th>
                    <th className="py-3.5 px-4">Processing Purpose</th>
                    <th className="py-3.5 px-4">Hosting Location</th>
                    <th className="py-3.5 px-4">Compliance Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subprocessors.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-[#07294d]">{sub.name}</td>
                      <td className="py-3.5 px-4 text-slate-700">{sub.purpose}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{sub.location}</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono text-[11px]">{sub.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Data Subject Rights & Responsible Disclosure Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs max-w-3xl">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-lg font-bold text-[#07294d]">Data Subject Rights & Responsible Disclosure Request</h2>
              <p className="text-xs text-slate-500 mt-1">
                Exercise your statutory right to request a complete machine-readable copy of your data, submit a deletion notice, or report a suspected vulnerability to our security team.
              </p>
            </div>

            <form onSubmit={handleDataRequest} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    placeholder="e.g., Michael Kweka"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered Account Email</label>
                  <input
                    type="email"
                    required
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    placeholder="e.g., student@altavox.space"
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Request Type</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                >
                  <option value="DATA_EXPORT">Export All Personal & Transaction Records (JSON/CSV)</option>
                  <option value="DATA_DELETION">Account & Personal Data Deletion Notice</option>
                  <option value="RESPONSIBLE_DISCLOSURE">Responsible Vulnerability / Bug Disclosure Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Context / Specific Details</label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any additional account IDs, order references, or technical vulnerability steps..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#f26522] focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#07294d] px-6 py-3 text-xs font-bold text-white hover:bg-[#0b3866] disabled:opacity-50 transition flex items-center gap-2"
                >
                  <Send className="size-3.5 text-[#f26522]" />
                  <span>{submitting ? 'Registering Request...' : 'Submit Governance Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
