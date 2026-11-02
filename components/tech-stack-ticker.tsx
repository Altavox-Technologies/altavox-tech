'use client'

import React, { useState } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import {
  Network,
  Database,
  Globe,
  Boxes,
  CreditCard,
  ShieldCheck,
  Cloud,
  Cpu,
  Pause,
  Play,
  Sparkles,
  ArrowRight,
  Activity
} from 'lucide-react'

export interface TechItem {
  id: string
  name: string
  tag: string
  subtext: string
  latencyBadge: string
  icon: React.ComponentType<{ className?: string }>
  accentColor: string
  bgHover: string
}

const TECH_STACK: TechItem[] = [
  {
    id: 'mikrotik',
    name: 'MikroTik RouterOS',
    tag: 'ISP Core Networking',
    subtext: 'API socket queues, PPPoE pools & BGP multi-homing',
    latencyBadge: '< 2ms Socket Sync',
    icon: Network,
    accentColor: 'text-[#f26522]',
    bgHover: 'hover:border-[#f26522]/60 hover:shadow-orange-500/10'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & Drizzle',
    tag: 'Relational Integrity',
    subtext: 'Type-safe relational schema with strict ACID safety',
    latencyBadge: '99.99% ACID Safe',
    icon: Database,
    accentColor: 'text-cyan-600',
    bgHover: 'hover:border-cyan-500/60 hover:shadow-cyan-500/10'
  },
  {
    id: 'nextjs',
    name: 'Next.js 16 App Router',
    tag: 'Web Systems',
    subtext: 'Edge SSR, React 19 streaming & sub-second hydrations',
    latencyBadge: 'Turbopack Core',
    icon: Globe,
    accentColor: 'text-indigo-600',
    bgHover: 'hover:border-indigo-500/60 hover:shadow-indigo-500/10'
  },
  {
    id: 'docker',
    name: 'Docker Container Cloud',
    tag: 'Isolated Sandboxes',
    subtext: 'Zero-leak runtime pods with rootless security profiles',
    latencyBadge: 'Automated CI/CD',
    icon: Boxes,
    accentColor: 'text-sky-600',
    bgHover: 'hover:border-sky-500/60 hover:shadow-sky-500/10'
  },
  {
    id: 'mpesa',
    name: 'M-Pesa Webhooks',
    tag: 'Automated Billing',
    subtext: 'Daraja C2B instant IPN payment verification',
    latencyBadge: '1.2s Auto-Reconcile',
    icon: CreditCard,
    accentColor: 'text-emerald-600',
    bgHover: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10'
  },
  {
    id: 'freeradius',
    name: 'FreeRADIUS Server',
    tag: 'AAA Accounting',
    subtext: 'High-throughput subscriber authentication & session logs',
    latencyBadge: 'RFC 2865 Compliant',
    icon: ShieldCheck,
    accentColor: 'text-amber-600',
    bgHover: 'hover:border-amber-500/60 hover:shadow-amber-500/10'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Edge',
    tag: 'Global CDN & TLS',
    subtext: 'DDoS mitigation, edge caching & automated SSL certs',
    latencyBadge: 'Anycast DNS Tier',
    icon: Cloud,
    accentColor: 'text-orange-600',
    bgHover: 'hover:border-orange-500/60 hover:shadow-orange-500/10'
  },
  {
    id: 'redis',
    name: 'Redis In-Memory',
    tag: 'High-Concurrency Queue',
    subtext: 'Sub-millisecond subscriber token storage & rate limits',
    latencyBadge: '< 0.5ms Pipeline',
    icon: Cpu,
    accentColor: 'text-rose-600',
    bgHover: 'hover:border-rose-500/60 hover:shadow-rose-500/10'
  }
]

export function TechStackTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState<number>(55) // Calm, steady, non-intrusive drift
  const [activeTech, setActiveTech] = useState<TechItem | null>(null)

  // Duplicate items twice to ensure endless continuous flow without blank gaps
  const tickerItems = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-8 border-y border-slate-200 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#07294d] flex items-center gap-2">
              <span>Mission-Critical Production Stack</span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold border border-slate-200">
                <Activity className="size-3 text-[#f26522]" /> Live Pipeline
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden md:inline">
              Hover to freeze & inspect architecture telemetry
            </span>

            {/* Accessibility / Motion Control */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  isPaused
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                aria-label={isPaused ? 'Resume Motion' : 'Pause Motion'}
              >
                {isPaused ? (
                  <>
                    <Play className="size-3 text-amber-800" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-3 text-slate-600" />
                    <span>Pause</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSpeed((prev) => (prev === 55 ? 30 : 55))}
                className="text-[10px] font-mono px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition"
                title="Toggle Speed"
              >
                {speed === 30 ? 'Speed: Faster' : 'Speed: Calm'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Vignettes */}
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Mask Overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
        
        {/* Right Mask Overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Animated Row */}
        <motion.div
          className="flex gap-4 sm:gap-6 py-2 w-max"
          animate={{
            x: isPaused ? undefined : ['0%', '-33.333333%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear'
            }
          }}
        >
          {tickerItems.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={`${tech.id}-${idx}`}
                onClick={() => setActiveTech(tech)}
                className={`group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white px-4 sm:px-5 py-3 shadow-xs hover:border-[#f26522] transition-colors duration-150 cursor-pointer min-w-[280px] sm:min-w-[320px]`}
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100/90 border border-slate-200/80 group-hover:scale-105 transition-transform`}>
                  <Icon className={`size-5 ${tech.accentColor}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {tech.tag}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                      {tech.latencyBadge}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#f26522] transition-colors truncate">
                    {tech.name}
                  </h4>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {tech.subtext}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Active Modal / Inspection Drawer (when a user clicks a moving card) */}
      {activeTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#07294d] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                  <activeTech.icon className={`size-6 ${activeTech.accentColor}`} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                    {activeTech.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white">{activeTech.name}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                className="rounded-lg bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-200">
              <p className="text-sm text-slate-300">
                {activeTech.subtext}
              </p>

              <div className="rounded-lg bg-black/30 p-3 font-mono text-[11px] border border-white/10">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Operational SLA:</span>
                  <span className="text-emerald-400">{activeTech.latencyBadge}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Deployment Status:</span>
                  <span className="text-cyan-300">Active Production Fleet</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Direct Support:</span>
                  <span className="text-white">+255 750 227 073</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                className="rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#e05312] transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
