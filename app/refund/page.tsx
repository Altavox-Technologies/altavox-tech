import Link from 'next/link'
import { ShieldCheck, Clock, CheckCircle2, AlertCircle, ArrowLeft, Mail, Phone } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export const metadata = {
  title: 'Refund & Cancellation Policy | Altavox Tech',
  description: 'Official commercial refund, return, and cancellation policies for Altavox Technologies digital products, Academy enrollments, and engineering services.'
}

export default function AltavoxRefundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 sm:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                <ShieldCheck className="size-3.5" /> Customer Trust & Commercial Terms
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                Refund & Cancellation Policy
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Effective Date: November 1, 2026 • Published by Altavox Technologies Legal & Operations Desk.
              </p>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700">
            <div>
              <h2 className="text-lg font-bold text-[#07294d]">1. Overview & Commitment to Fairness</h2>
              <p className="mt-2 text-slate-600">
                At Altavox Technologies, we are committed to building long-term, high-trust relationships with our enterprise clients, software developers, and Academy students. We believe in clear, unambiguous commercial terms and direct accountability.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-[#07294d]">2. Altavox Academy Course Enrollments</h2>
              <p className="mt-2 text-slate-600">
                We want you to be completely satisfied with your technical education experience. For all 20 Altavox Academy courses:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600">
                <li>
                  <strong>14-Day Money-Back Guarantee:</strong> You may request a full 100% refund within 14 calendar days of your original payment date, provided you have accessed less than 20% of the total course lessons and have not downloaded the final verified capstone lab solutions.
                </li>
                <li>
                  <strong>Completed Courses:</strong> If you have completed the curriculum and received a verified Altavox Certificate of Competence (with a unique verification hash), the fee is non-refundable.
                </li>
                <li>
                  <strong>Processing Rails:</strong> Refunds for payments processed via PayPal Business are credited directly back to the original funding source within 3–5 business days. Mobile money refunds (M-Pesa, Airtel, Yas) are processed within 48 hours following telephone identity verification.
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-[#07294d]">3. Digital Bookstore & Software Blueprints</h2>
              <p className="mt-2 text-slate-600">
                Due to the immediate cryptographically signed delivery of digital goods:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600">
                <li>
                  <strong>Unused Download Tokens:</strong> If a signed download token has expired and the digital asset was not successfully retrieved due to a technical error on our infrastructure, you may request either a fresh download link or a full refund.
                </li>
                <li>
                  <strong>Successfully Downloaded Assets:</strong> Once a digital book PDF, RouterOS script package, or source code template has been downloaded, refunds cannot be issued unless the file is corrupt or materially fails to match its published architectural specification.
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-[#07294d]">4. Enterprise Infrastructure & Managed SLAs</h2>
              <p className="mt-2 text-slate-600">
                For monthly enterprise retainer contracts, edge POP hosting, and ISP network management SLAs:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600">
                <li>
                  <strong>Cancellation Notice:</strong> Recurring service agreements may be canceled with 30 days written notice before the next monthly billing cycle.
                </li>
                <li>
                  <strong>Service Level Credits:</strong> If monthly uptime falls below our 99.98% contractual guarantee due to Altavox infrastructure failure, service credits will be calculated and applied to the subsequent invoice in accordance with your master service agreement (MSA).
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-[#07294d]">5. How to Submit a Refund Request</h2>
              <p className="mt-2 text-slate-600">
                To request a refund or dispute a transaction, please provide your transaction reference number (e.g., <code className="font-mono text-[#f26522]">ATX-PAY-XXXX</code> or PayPal Transaction ID) to our finance desk:
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-[#f26522]" />
                  <span>Email: <strong className="text-slate-800">engineering@altavox.space</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-[#f26522]" />
                  <span>Desk Phone: <strong className="text-slate-800">+255 750 227 073 / +255 708 227 073</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#f26522]" />
                  <span>Support Ticket: <Link href="/support" className="text-[#f26522] underline font-bold">Open Billing Support Ticket</Link></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
