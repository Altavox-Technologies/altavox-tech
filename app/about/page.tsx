'use client'

import Link from 'next/link'
import {
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  Globe2,
  ShieldCheck,
  Building2,
  Sparkles,
  PhoneCall,
  Terminal,
  Server,
  Layers,
  Network
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function AboutPage() {
  const principles = [
    {
      num: '01',
      title: 'Clarity',
      desc: 'Understand the operation before choosing the technology. We evaluate organizational workflows thoroughly before introducing new code.'
    },
    {
      num: '02',
      title: 'Discipline',
      desc: 'Prefer simple, observable systems over unnecessary complexity. Every database constraint, network queue, and API route must be predictable.'
    },
    {
      num: '03',
      title: 'Continuity',
      desc: 'Build for the people who will operate and maintain the system daily. Systems must remain dependable long after the engineering phase completes.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Altavox company hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 lg:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="rounded-full bg-[#f26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                About Altavox Tech
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                We Build the Systems That Make Important Work Move.
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Altavox Tech is a technology company focused on software engineering, digital product development, infrastructure, and operational clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Narrative */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Our Mission
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                Make complex operations easier to understand, run, and improve.
              </h2>
              <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  We approach technology as a working part of the organization, not a layer of decoration. That means listening carefully, defining the real problem, and building the smallest dependable system that can carry the work forward.
                </p>
                <p>
                  Our work spans web platforms, APIs, databases, cloud deployment, ISP operations, and automation. Every engagement is grounded in clarity, maintainability, and responsible delivery.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition"
                >
                  Explore Live Deployments
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
                >
                  Contact Engineering Desk
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md space-y-5">
              <h3 className="text-base font-bold text-[#07294d]">Altavox Engineering Desks</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Headquarters & Operations:</strong>
                    <p>Nduruma Road, Unguuni</p>
                    <p>23219 Nduruma, Arusha, Tanzania</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Nduruma+Road%2C+Unguuni%2C+Nduruma%2C+Arusha%2C+Tanzania" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-[#f26522] hover:underline">View location on Google Maps</a>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <p><strong>Primary Engineering:</strong> yurianarshad@gmail.com</p>
                  <p><strong>Direct Desk 1:</strong> <a href="tel:+255750227073" className="text-[#f26522] hover:underline font-bold">+255 750 227 073</a></p>
                  <p><strong>Direct Desk 2:</strong> <a href="tel:+255708227073" className="text-[#f26522] hover:underline font-bold">+255 708 227 073</a></p>
                  <p><strong>Telecom Integration:</strong> MikroTik RouterOS & M-Pesa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Principles */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f26522]">Foundations</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#07294d]">The Three Pillars of Altavox</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.num} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-[#f26522] transition">
                <span className="font-mono text-xl font-black text-[#f26522]">{p.num}</span>
                <h3 className="mt-4 text-lg font-bold text-[#07294d]">{p.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <AltavoxFooter />
    </div>
  )
}
