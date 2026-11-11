'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Handshake,
  DollarSign,
  TrendingUp,
  Share2,
  Copy,
  Check,
  Building2,
  FileText,
  ShieldCheck,
  ExternalLink,
  Award,
  ArrowRight
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

interface ReferralLead {
  id: string
  clientName: string
  serviceTrack: string
  contractValueUSD: number
  commissionPercent: number
  earnedUSD: number
  status: 'SETTLED' | 'PENDING_VERIFICATION' | 'QUALIFIED'
  settledDate?: string
}

export default function PartnerPortalPage() {
  const [copiedLink, setCopiedLink] = useState(false)
  const [partnerOrg] = useState('Kibo Telecom Solutions & Consulting')
  const [partnerTier] = useState('Tier 1 Certified Integrator')

  const referrals: ReferralLead[] = [
    {
      id: 'ref-881',
      clientName: 'Kilimanjaro Regional Fiber Network',
      serviceTrack: 'Carrier ISP Managed Edge POP',
      contractValueUSD: 8500,
      commissionPercent: 15,
      earnedUSD: 1275,
      status: 'SETTLED',
      settledDate: 'November 4, 2026'
    },
    {
      id: 'ref-882',
      clientName: 'St. Joseph Technical Schools Group',
      serviceTrack: 'School SIMS Academic ERP',
      contractValueUSD: 4200,
      commissionPercent: 15,
      earnedUSD: 630,
      status: 'PENDING_VERIFICATION'
    },
    {
      id: 'ref-883',
      clientName: 'Nyika Logistics Telemetry Hub',
      serviceTrack: 'Custom Enterprise & PostgreSQL',
      contractValueUSD: 6000,
      commissionPercent: 15,
      earnedUSD: 900,
      status: 'QUALIFIED'
    }
  ]

  const totalEarned = referrals
    .filter((r) => r.status === 'SETTLED')
    .reduce((acc, r) => acc + r.earnedUSD, 0)

  const pendingEarned = referrals
    .filter((r) => r.status !== 'SETTLED')
    .reduce((acc, r) => acc + r.earnedUSD, 0)

  const referralUrl = 'https://altavox.space/start-project?partner_ref=KIBO-TZ-2026'

  const copyReferralUrl = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Partner Header */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-12 sm:py-16 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                  <Handshake className="size-3.5" /> Altavox Certified Partner Network
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Partner & Reseller Command Portal
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Partner Organization: <strong className="text-white">{partnerOrg}</strong> • Certification: <span className="font-mono text-orange-400 font-bold">{partnerTier}</span>
                </p>
              </div>

              {/* Commission Stats Pill */}
              <div className="flex items-center gap-4 rounded-2xl bg-black/30 border border-white/10 p-3.5 backdrop-blur-md">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Settled Commission</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">${totalEarned.toLocaleString()} USD</span>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Pipeline Pending</span>
                  <span className="text-xl font-extrabold text-amber-300 font-mono">${pendingEarned.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
          {/* Referral Link & Materials Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#07294d] flex items-center gap-2">
                  <Share2 className="size-4 text-[#f26522]" /> Your Certified Partner Tracking Link
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clients initiating projects or subscribing to ISP edge POPs through this link automatically attribute 15% recurring revenue share to your account.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-mono text-slate-700 select-all min-w-[280px]"
                />
                <button
                  type="button"
                  onClick={copyReferralUrl}
                  className="rounded-xl bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866] transition flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Attributed Referral Deals Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#07294d]">Attributed Client Deals & Commissions</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  All commissions are auditable against signed contracts and verified bank or PayPal settlement records.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase font-mono">
                    <th className="py-3 px-4">Deal Ref</th>
                    <th className="py-3 px-4">Referred Organization</th>
                    <th className="py-3 px-4">Service Track</th>
                    <th className="py-3 px-4">Contract Value</th>
                    <th className="py-3 px-4">Rate</th>
                    <th className="py-3 px-4">Commission</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#07294d]">{ref.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{ref.clientName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{ref.serviceTrack}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">${ref.contractValueUSD.toLocaleString()} USD</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{ref.commissionPercent}%</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">${ref.earnedUSD.toLocaleString()} USD</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          ref.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ref.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
