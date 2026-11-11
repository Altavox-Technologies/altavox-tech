import Link from 'next/link'
import {
  Building2,
  ShieldCheck,
  Server,
  Users,
  CreditCard,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Lock
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export const metadata = {
  title: 'Enterprise Business Solutions & SLAs | Altavox Tech',
  description: 'Mission-critical enterprise software, carrier ISP infrastructure management, and corporate technology SLAs by Altavox Technologies.'
}

export default function AltavoxBusinessPage() {
  const offerings = [
    {
      title: 'Carrier & ISP Infrastructure Operations',
      description: 'End-to-end design, routing optimization, and automated billing bridges for regional telecommunications providers.',
      deliverables: [
        'MikroTik CCR2004 / CCR2116 core routing configuration',
        'Multi-homed BGP peering and local IXP (TIX) interconnects',
        'PPPoE and dynamic RADIUS subscriber accounting engines',
        'M-Pesa, Airtel & Yas instant bandwidth unblocking hooks'
      ]
    },
    {
      title: 'Institutional School Information Systems',
      description: 'Centralized cloud management for academic institutions, combining student enrollment, gradebooks, and automated fee reconciliation.',
      deliverables: [
        'PostgreSQL double-entry accounting with audit ledgers',
        'Biometric staff & student attendance sync queues',
        'Parent communication & SMS/WhatsApp notification gateways',
        'Strict role-based teacher, bursar, and headmaster permissions'
      ]
    },
    {
      title: 'Corporate Technology & Digital Platforms',
      description: 'High-performance web and mobile software engineered with Next.js, Postgres, and strict security sandboxes.',
      deliverables: [
        'Full-stack web applications with sub-100ms response times',
        'PayPal Business & mobile money automated financial ledgers',
        'Isolated iframe sandbox architecture for client previews',
        '24/7 dedicated engineering SLA and disaster recovery'
      ]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-24 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57] mb-3">
                <Building2 className="size-3.5" /> Altavox Business Solutions
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Engineering Dependable Systems for Serious Enterprise
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                We partner with telecom carriers, schools, and growing digital enterprises to architect, build, and operate resilient systems with strict SLAs.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/portal"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#d9531e] transition flex items-center gap-2"
                >
                  <span>Access Client Portal</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/start-project"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                >
                  Schedule Architecture Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Capabilities */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="border-b border-slate-200 pb-4 mb-10">
            <h2 className="text-2xl font-extrabold text-[#07294d]">Enterprise Solution Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Engineered with zero technical compromises and dedicated carrier-grade uptime agreements.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {offerings.map((off, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#07294d] leading-snug">{off.title}</h3>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">{off.description}</p>
                  
                  <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522] block">
                      Scope Deliverables:
                    </span>
                    {off.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <Link
                    href="/start-project"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522]"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom SLA Commitment */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                Contractual Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                99.98% Guaranteed Infrastructure Availability
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our team monitors edge POPs, database clusters, and payment webhooks 24 hours a day, 7 days a week, with 1-hour critical response escalation.
              </p>
            </div>

            <Link
              href="/contact"
              className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#d9531e] transition whitespace-nowrap self-start md:self-auto"
            >
              Contact Enterprise Desk
            </Link>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
