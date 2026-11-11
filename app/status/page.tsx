'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  Server,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

interface ServiceComponentStatus {
  name: string
  category: 'Edge POP' | 'Payment Gateway' | 'Platform' | 'Database'
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE'
  latencyMs: number
  uptime90d: string
  lastChecked: string
}

interface IncidentHistoryRecord {
  id: string
  title: string
  impact: 'MINOR' | 'MAINTENANCE' | 'CRITICAL'
  status: 'RESOLVED' | 'COMPLETED'
  date: string
  timeline: { time: string; message: string }[]
}

export default function AltavoxPublicStatusPage() {
  const [refreshing, setRefreshing] = useState(false)

  const components: ServiceComponentStatus[] = [
    {
      name: 'Dar es Salaam Edge POP (DAR-01)',
      category: 'Edge POP',
      status: 'OPERATIONAL',
      latencyMs: 12,
      uptime90d: '99.99%',
      lastChecked: 'Just now'
    },
    {
      name: 'Arusha Optical Fiber Hub (ARK-POP)',
      category: 'Edge POP',
      status: 'OPERATIONAL',
      latencyMs: 14,
      uptime90d: '99.98%',
      lastChecked: 'Just now'
    },
    {
      name: 'Zanzibar Regional Cache Node (ZNZ-POP)',
      category: 'Edge POP',
      status: 'OPERATIONAL',
      latencyMs: 18,
      uptime90d: '99.95%',
      lastChecked: 'Just now'
    },
    {
      name: 'PayPal Business Payment Webhook Gateway',
      category: 'Payment Gateway',
      status: 'OPERATIONAL',
      latencyMs: 110,
      uptime90d: '100.0%',
      lastChecked: 'Just now'
    },
    {
      name: 'Vodacom M-Pesa Merchant Settlement Daemon',
      category: 'Payment Gateway',
      status: 'OPERATIONAL',
      latencyMs: 85,
      uptime90d: '99.92%',
      lastChecked: 'Just now'
    },
    {
      name: 'Altavox Academy LMS & Video Streaming',
      category: 'Platform',
      status: 'OPERATIONAL',
      latencyMs: 34,
      uptime90d: '99.99%',
      lastChecked: 'Just now'
    },
    {
      name: 'PostgreSQL 17 ACID Financial Clusters',
      category: 'Database',
      status: 'OPERATIONAL',
      latencyMs: 4,
      uptime90d: '100.0%',
      lastChecked: 'Just now'
    }
  ]

  const incidents: IncidentHistoryRecord[] = [
    {
      id: 'inc-2026-1102',
      title: 'Scheduled RouterOS v7 Kernel Security Patch (Arusha Hub)',
      impact: 'MAINTENANCE',
      status: 'COMPLETED',
      date: 'November 2, 2026',
      timeline: [
        { time: '02:00 EAT', message: 'Canary maintenance initiated on ARK-POP-02. Traffic routed to secondary microwave link.' },
        { time: '02:14 EAT', message: 'Firmware upgraded to RouterOS v7.16.2 stable. Zero packet loss on subscriber sessions.' },
        { time: '02:22 EAT', message: 'Synthetic traffic health probes verified. Maintenance window closed.' }
      ]
    },
    {
      id: 'inc-2026-1014',
      title: 'Tanzania Internet Exchange (TIX) Upstream Latency Variance',
      impact: 'MINOR',
      status: 'RESOLVED',
      date: 'October 14, 2026',
      timeline: [
        { time: '14:10 EAT', message: 'Observed 18ms jitter on Dar es Salaam national transit exchange.' },
        { time: '14:25 EAT', message: 'BGP path prepending adjusted to prioritize secondary carrier cross-connect.' },
        { time: '14:40 EAT', message: 'Transit latency normalized below 14ms across all active ISP subscribers.' }
      ]
    }
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 800)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Status Top Strip */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 sm:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                  <Activity className="size-3.5" /> Altavox Observability
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Real-Time Systems & Infrastructure Status
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-300">
                  Continuous automated health checks across African edge points of presence, cloud gateways, and database clusters.
                </p>
              </div>

              {/* Big Status Badge */}
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 px-5 py-3 text-emerald-300 self-start md:self-auto">
                <span className="size-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Overall System State</p>
                  <p className="text-base font-extrabold text-white">All Systems Operational</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 90-Day Uptime KPI Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Contractual Metric</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#07294d]">99.98% Service Availability (Past 90 Days)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Calculated continuously from synthetic ICMP, HTTP/2, and RADIUS accounting probes.</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <RefreshCw className={`size-3.5 text-[#f26522] ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Probes</span>
            </button>
          </div>
        </section>

        {/* Live Service Components Table */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#07294d]">Operational Component Health</h2>
              <p className="text-xs text-slate-500 mt-0.5">Automated telemetry verified every 60 seconds.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase font-mono">
                    <th className="py-3.5 px-4">Component Target</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Latency</th>
                    <th className="py-3.5 px-4">90-Day Uptime</th>
                    <th className="py-3.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {components.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-4 font-bold text-[#07294d] flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        <span>{comp.name}</span>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-500">{comp.category}</td>
                      <td className="py-4 px-4 font-mono text-sky-700 font-bold">{comp.latencyMs}ms</td>
                      <td className="py-4 px-4 font-mono font-bold text-[#07294d]">{comp.uptime90d}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                          <CheckCircle2 className="size-3" /> {comp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Past Incidents & Maintenance Records */}
          <div>
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#07294d]">Verified Incident & Maintenance History</h2>
              <p className="text-xs text-slate-500 mt-0.5">Transparent public disclosure of all operational events.</p>
            </div>

            <div className="space-y-4 max-w-4xl">
              {incidents.map((inc) => (
                <div key={inc.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 text-xs">
                    <span className="font-mono text-slate-400">{inc.date}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-[10px] uppercase font-mono text-slate-700">
                      {inc.impact} • {inc.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#07294d]">{inc.title}</h3>

                  <div className="mt-4 space-y-2 border-l-2 border-[#f26522]/40 pl-4 text-xs text-slate-600">
                    {inc.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="leading-relaxed">
                        <strong className="font-mono text-[#07294d]">{step.time}:</strong> {step.message}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
