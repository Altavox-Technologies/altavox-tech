import Link from 'next/link'
import {
  Handshake,
  Network,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export const metadata = {
  title: 'Technology & Academic Partnerships | Altavox Tech',
  description: 'Collaborate with Altavox Technologies on carrier network infrastructure, mobile money payment rails, and STEM education in East Africa.'
}

export default function AltavoxPartnersPage() {
  const partnerTracks = [
    {
      icon: Network,
      title: 'Carrier & Infrastructure Providers',
      description: 'Collaborating on multi-homed BGP routing, national Internet exchange points (TIX), and optical fiber edge points of presence.',
      areas: [
        'MikroTik & Ubiquiti hardware integration testing',
        'Direct peering at Tanzania Internet eXchange (TIX)',
        'Carrier-grade PPPoE and dynamic RADIUS offloading',
        'Sub-15ms edge POP server deployments'
      ]
    },
    {
      icon: CreditCard,
      title: 'FinTech & Digital Payment Rails',
      description: 'Bridging international business accounts with regional mobile-money collection rails across East Africa.',
      areas: [
        'Official PayPal Orders & Webhook verification',
        'Vodacom M-Pesa Daraja automated reconciliation',
        'Airtel Money & Mixx by Yas USSD integration',
        'Double-entry auditable ledger synchronization'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Academic & Vocational Institutions',
      description: 'Equipping computer science, telecommunications, and engineering students with hands-on, accredited laboratory skills.',
      areas: [
        'Curriculum co-design for the 20 Altavox Academy courses',
        'Physical network bench access in Dar es Salaam and Arusha',
        'Public SHA-256 certificate verification for employers',
        'Student internship pipelines into active engineering deployments'
      ]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Partners Hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-24 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57] mb-3">
                <Handshake className="size-3.5" /> Altavox Strategic Partnerships
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Co-Architecting Infrastructure, Payments & Digital Talent
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                We build long-term technical partnerships with carriers, financial institutions, and universities to expand digital capabilities across the region.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#d9531e] transition flex items-center gap-2"
                >
                  <span>Propose Strategic Partnership</span>
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="mailto:engineering@altavox.space"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition flex items-center gap-2"
                >
                  <Mail className="size-4 text-[#f26522]" />
                  <span>engineering@altavox.space</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Tracks */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="border-b border-slate-200 pb-4 mb-10">
            <h2 className="text-2xl font-extrabold text-[#07294d]">Partnership Tracks</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear technical interfaces and mutual operational commitments.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {partnerTracks.map((track, idx) => {
              const Icon = track.icon
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="size-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#f26522]">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#07294d] leading-snug">{track.title}</h3>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">{track.description}</p>

                    <div className="mt-6 border-t border-slate-100 pt-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522] block">
                        Collaboration Areas:
                      </span>
                      {track.areas.map((area, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="size-3.5 text-[#f26522] shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522]"
                    >
                      <span>Inquire About Track</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Direct Contact Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
                Executive Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Interested in Joint Carrier or Academic Development?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact our engineering leadership team to discuss technical integration specs and memorandum of understanding (MoU) frameworks.
              </p>
            </div>

            <Link
              href="/contact"
              className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#d9531e] transition whitespace-nowrap self-start md:self-auto"
            >
              Start Conversation
            </Link>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
