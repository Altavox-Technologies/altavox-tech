'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FlaskConical,
  Radio,
  Cpu,
  Brain,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileText,
  Activity,
  Terminal,
  ArrowRight,
  Download
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal'

export default function AltavoxLabsPage() {
  const [selectedProject, setSelectedProject] = useState<string>('mesh-protocol')

  const labProjects = [
    {
      id: 'mesh-protocol',
      badge: 'R&D PROTOCOL v0.4',
      title: 'Decentralized Offline-First Mesh Bridging (LoRa + RouterOS)',
      tagline: 'Resilient community wireless telemetry for off-grid and remote rural environments.',
      problem: 'Rural schools and health posts across East Africa suffer from intermittent cellular backhaul and lack affordable high-bandwidth fiber.',
      approach: 'Combining low-power LoRa packet forwarders with MikroTik RouterOS v7 bridge filters to queue non-realtime sensor packets, syncing to PostgreSQL when backhaul reconnects.',
      metrics: {
        range: '14.2 km Line-of-Sight',
        powerDraw: '2.4W Average',
        packetSuccess: '99.2% via Retries'
      },
      status: 'Active Field Testing (Arusha Rural Lab)'
    },
    {
      id: 'micro-billing',
      badge: 'CARRIER TELEMETRY v1.1',
      title: 'Sub-Second Carrier Micro-Billing & Dynamic Throttling',
      tagline: 'Instant mobile-money unblocking without dropping active TCP/QUIC subscriber streams.',
      problem: 'Traditional RADIUS disconnect-messages (CoA) force hard PPPoE interface teardowns, interrupting student video sessions or business VoIP calls upon fee top-up.',
      approach: 'Kernel-level eBPF / RouterOS dynamic firewall mangle marking that smoothly migrates rate-limiting buckets from 64 kbps (expired) to full tier (paid) with zero packet drop.',
      metrics: {
        transitionTime: '< 180ms',
        packetDropRate: '0.00%',
        subscriberImpact: 'Seamless Stream Continuation'
      },
      status: 'Bench Prototype (Jaslyn Net Integration)'
    },
    {
      id: 'neural-edge',
      badge: 'EDGE AI v0.2',
      title: 'Lightweight Neural QoS Packet Classifier',
      tagline: 'On-device traffic categorization prioritizing educational and financial APIs during congestion.',
      problem: 'Standard DSCP priority tagging fails when traffic is encapsulated in TLS/QUIC tunnels, leaving essential school and payment traffic competing with 4K video downloads.',
      approach: 'A quantized 1.2MB neural model analyzing inter-packet arrival jitter and packet length histograms to dynamically categorize traffic streams in sub-millisecond windows.',
      metrics: {
        modelFootprint: '1.2 MB Quantized',
        inferenceLatency: '0.42ms per Flow',
        accuracy: '94.8% on Encrypted Streams'
      },
      status: 'Research RFC Phase'
    }
  ]

  const activeProject = labProjects.find((p) => p.id === selectedProject) || labProjects[0]

  const downloadRfc = () => {
    const content = [
      `# ${activeProject.title}`,
      '',
      `Status: ${activeProject.status}`,
      '',
      `## Summary`,
      activeProject.tagline,
      '',
      `## Problem`,
      activeProject.problem,
      '',
      `## Approach`,
      activeProject.approach,
      '',
      `## Research metrics`,
      ...Object.entries(activeProject.metrics).map(([key, value]) => `- ${key}: ${value}`),
    ].join('\\n')
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${activeProject.id}-research-note.md`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Labs Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-16 sm:py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                <FlaskConical className="size-3.5" /> Altavox Labs Division
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Experimental Research & Next-Generation Prototypes
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Exploring the boundaries of telecommunications engineering, decentralized offline-first protocols, carrier telemetry, and edge artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Project List */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Active Research Initiatives:
              </span>

              {labProjects.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProject(proj.id)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all ${
                    selectedProject === proj.id
                      ? 'border-[#f26522] bg-white/10 shadow-lg'
                      : 'border-white/10 bg-slate-800/40 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-rose-400">
                      {proj.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{proj.status}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white">{proj.title}</h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {proj.tagline}
                  </p>
                </button>
              ))}
            </div>

            {/* Project Deep-Dive Detail View */}
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f26522]">
                  {activeProject.badge} • Specification
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-white">{activeProject.title}</h2>
                <p className="mt-1 text-sm text-slate-300">{activeProject.tagline}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400">The Problem Being Solved</h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400">Engineering Approach</h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.approach}
                </p>
              </div>

              {/* Bench Metrics */}
              <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block mb-3">
                  Laboratory Benchmark Metrics:
                </span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {Object.entries(activeProject.metrics).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">{key}</span>
                      <span className="text-sm font-bold text-white mt-1 block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Status: <strong className="text-emerald-400 font-medium">{activeProject.status}</strong>
                </span>

                <button
                  type="button"
                  onClick={downloadRfc}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e] transition"
                >
                  <Download className="size-3.5" /> Download Research RFC
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SevenCipherSeal system="research" dark />
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
