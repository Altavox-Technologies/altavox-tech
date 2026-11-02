'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Network,
  Server,
  Shield,
  Sparkles,
  PhoneCall,
  Calendar,
  MessageSquare,
  Activity
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { serviceDetails } from '@/lib/site-data'

const icons = [Code2, Network, Server, Globe, Database, Shield]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#f26522] selection:text-white">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero in Altavox Tech Design */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-20 border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3 py-1 text-xs font-bold text-orange-200">
                <Activity className="size-3.5 text-[#f26522]" />
                <span>Production-Ready Engineering</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Technology Services Engineered for <span className="text-[#f26522]">Real Environments</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                From carrier-grade ISP billing portals and MikroTik RouterOS automation to high-performance school SIMS and isolated cloud databases, we build systems designed to stay alive under real pressure.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/start-project"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#e05312] transition"
                >
                  Start an Engineering Engagement
                </Link>
                <a
                  href="tel:+255750227073"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  <PhoneCall className="size-4 text-[#f26522]" />
                  <span>+255 750 227 073 / +255 708 227 073</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
              Specialized Solutions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#07294d]">
              End-to-End Software & Systems Delivery
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Each engagement is delivered with direct socket-level testing, automated database migrations, and operational runbooks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((service, index) => {
              const Icon = icons[index % icons.length]
              return (
                <div
                  key={service.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-[#f26522] transition-colors duration-150"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#07294d]">{service.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{service.summary}</p>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Deliverables & Scope
                      </p>
                      <ul className="mt-3 space-y-2 text-xs text-slate-700">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#f26522]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-orange-50 border border-orange-200/80 p-3 text-xs text-[#07294d] font-semibold flex items-center justify-between">
                    <span>{service.highlight}</span>
                    <ArrowRight className="size-3.5 text-[#f26522] shrink-0" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Process Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm"
          >
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase text-[#f26522]">Execution Lifecycle</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                How Altavox Delivers Systems
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-4">
              {[
                { step: '01', title: 'Listen & Diagnose', desc: 'Observe current operational friction and identify the real bottleneck before choosing technology.' },
                { step: '02', title: 'Smallest System', desc: 'Design the leanest, most dependable architecture that reliably carries the workload without excess baggage.' },
                { step: '03', title: 'Staging & Sandbox', desc: 'Verify API webhooks, database constraints, and queue latency in realistic live staging.' },
                { step: '04', title: 'Handover & SLA', desc: 'Train internal operators, document runbooks, and provide continuous observability.' }
              ].map((st) => (
                <div
                  key={st.step}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-[#f26522] transition-colors duration-150"
                >
                  <span className="text-xl font-mono font-black text-[#f26522]">{st.step}</span>
                  <h4 className="mt-3 text-sm font-bold text-[#07294d]">{st.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition"
              >
                <span>Initiate an Engineering Project</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering%2C%20nahitaji%20huduma%20za%20mifumo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                <MessageSquare className="size-4" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
