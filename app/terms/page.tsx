import Link from 'next/link'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <AltavoxHeader />
      <main className="flex-1 pb-24">
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-12 border-b border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-mono uppercase text-[#f26522] font-bold">Altavox Tech Standards</span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">Terms of Engineering & Service</h1>
            <p className="mt-2 text-xs text-slate-300">Effective Date: October 2026 · Altavox Systems</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6 text-xs text-slate-700 leading-6">
            <div>
              <h2 className="text-sm font-bold text-[#07294d]">1. Scope of Systems & Software Delivery</h2>
              <p className="mt-2">
                Altavox Tech delivers production software, ISP billing architectures, SIMS database platforms, and custom integrations adhering to defined technical specifications, milestone verification, and staging sign-off.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#07294d]">2. Operations, Maintenance & Availability</h2>
              <p className="mt-2">
                Availability targets, maintenance windows, incident response, backup arrangements, and recovery commitments must be agreed in writing for each engagement. Deployment and migration methods are selected according to the system architecture and the level of service contracted; uninterrupted or zero-downtime operation is not guaranteed unless expressly agreed.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#07294d]">3. Code Ownership & IP Governance</h2>
              <p className="mt-2">
                Upon project completion and settlement of contracted milestones, clients receive full operational deployment rights and assigned software licenses as stipulated in individual service level agreements.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#07294d]">4. Support & Direct Operations Inquiries</h2>
              <p className="mt-2">
                For contract amendments, active system escalation, or enterprise support, call our Direct Desk at{' '}
                <a href="tel:+255750227073" className="font-bold text-[#f26522] hover:underline">
                  +255 750 227 073
                </a>{' '}
                /{' '}
                <a href="tel:+255708227073" className="font-bold text-[#f26522] hover:underline">
                  +255 708 227 073
                </a>{' '}
                or reach{' '}
                <a href="mailto:engineering@altavox.space" className="font-bold text-[#f26522] hover:underline">
                  engineering@altavox.space
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <AltavoxFooter />
    </div>
  )
}
