'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Server,
  Cloud,
  Cpu,
  Activity,
  HardDrive,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Terminal,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  RotateCcw,
  Globe,
  Database
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

interface DeploymentRecord {
  id: string
  environment: 'Production' | 'Staging' | 'Edge'
  domain: string
  branch: string
  commit: string
  commitMessage: string
  deployedAt: string
  duration: string
  status: 'OPERATIONAL' | 'DEPLOYING' | 'MAINTENANCE'
  trafficPercent: number
  region: string
}

export default function AltavoxCloudPage() {
  const [selectedEnv, setSelectedEnv] = useState<'all' | 'Production' | 'Staging' | 'Edge'>('all')
  const [rollbackStatus, setRollbackStatus] = useState<string | null>(null)
  const [activeLogTab, setActiveLogTab] = useState<'build' | 'runtime' | 'metrics'>('build')

  const deployments: DeploymentRecord[] = [
    {
      id: 'dep-atx-8801',
      environment: 'Production',
      domain: 'altavox.space',
      branch: 'main',
      commit: '7b8f9e1',
      commitMessage: 'feat(core): digital ecosystem 100,000x master release',
      deployedAt: '5 minutes ago',
      duration: '42s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Dar es Salaam (DAR-01)'
    },
    {
      id: 'dep-atx-8799',
      environment: 'Production',
      domain: 'jaslyn-net.altavox.space',
      branch: 'production',
      commit: '3a1c0d4',
      commitMessage: 'perf(routeros): optimize dynamic PPPoE radius accounting',
      deployedAt: '2 hours ago',
      duration: '38s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Arusha Edge (ARK-POP)'
    },
    {
      id: 'dep-atx-8795',
      environment: 'Production',
      domain: 'sammena.altavox.space',
      branch: 'production',
      commit: '9f2e4b8',
      commitMessage: 'fix(attendance): synchronize offline biometric sync queue',
      deployedAt: '1 day ago',
      duration: '45s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Dar es Salaam (DAR-01)'
    },
    {
      id: 'dep-atx-8790',
      environment: 'Production',
      domain: 'mrishoart.altavox.space',
      branch: 'production',
      commit: '1d6e8a0',
      commitMessage: 'feat(gallery): high-res canvas streaming & isolated preview',
      deployedAt: '2 days ago',
      duration: '51s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Zanzibar Edge (ZNZ-POP)'
    },
    {
      id: 'dep-atx-8802',
      environment: 'Staging',
      domain: 'staging.altavox.space',
      branch: 'improve/engineering-foundation-2026-11',
      commit: '6c4d2a9',
      commitMessage: 'test(fintech): sandbox automated reconciliation harness',
      deployedAt: '18 minutes ago',
      duration: '40s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Nairobi Hub (NBO-02)'
    },
    {
      id: 'dep-atx-8788',
      environment: 'Edge',
      domain: 'edge-dar-pop.altavox.space',
      branch: 'infra/vlan-mesh',
      commit: '4e8b1f3',
      commitMessage: 'infra(bgp): multi-homed upstream carrier peer balancing',
      deployedAt: '3 days ago',
      duration: '1m 12s',
      status: 'OPERATIONAL',
      trafficPercent: 100,
      region: 'Dar es Salaam (DAR-01)'
    }
  ]

  const filteredDeployments = selectedEnv === 'all'
    ? deployments
    : deployments.filter((d) => d.environment === selectedEnv)

  const handleRollback = (id: string) => {
    setRollbackStatus(`Initiating isolated canary rollback to build target ${id}... Verification checks completed. Target promoted to traffic baseline.`)
    setTimeout(() => {
      setRollbackStatus(null)
    }, 6000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Division Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  <Cloud className="size-3.5" /> Altavox Cloud Division
                </div>
                <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Distributed Cloud & Edge Infrastructure
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                  Enterprise-grade multi-region hosting, zero-downtime deployment pipelines, edge POP acceleration, and bare-metal MikroTik telecommunications infrastructure.
                </p>
              </div>

              {/* Quick Health Indicator Card */}
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md min-w-[280px]">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Global Cluster Status</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    99.98% Uptime
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-mono">POPs</p>
                    <p className="text-lg font-bold text-white mt-0.5">3 Active</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-mono">P95 Latency</p>
                    <p className="text-lg font-bold text-sky-400 mt-0.5">14ms</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-mono">TLS Security</p>
                    <p className="text-lg font-bold text-amber-400 mt-0.5">v1.3 HSTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Telemetry Metrics */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">CPU Cluster Load</span>
                <Cpu className="size-4 text-sky-400" />
              </div>
              <p className="mt-2 text-2xl font-mono font-bold text-white">28.4%</p>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '28.4%' }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Across 16 Carrier Compute Nodes</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">RAM Utilization</span>
                <Server className="size-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-mono font-bold text-white">41.2%</p>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '41.2%' }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">52.8 GB / 128 GB Allocated</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Carrier Bandwidth</span>
                <Radio className="size-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-mono font-bold text-white">1.84 Gbps</p>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '37%' }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Peak Upstream Capacity 5.0 Gbps</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Database IOPS</span>
                <Database className="size-4 text-indigo-400" />
              </div>
              <p className="mt-2 text-2xl font-mono font-bold text-white">2,480</p>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '22%' }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">PostgreSQL 17 ACID Clusters</p>
            </div>
          </div>
        </section>

        {/* Notice of Rollback Event */}
        {rollbackStatus && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-300 text-xs sm:text-sm">
              <AlertTriangle className="size-5 shrink-0 text-amber-400" />
              <span>{rollbackStatus}</span>
            </div>
          </div>
        )}

        {/* Active Deployments Table */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Production Deployments & Edge POPs</h2>
              <p className="text-xs text-slate-400 mt-1">
                Monitored infrastructure targets for Altavox corporate and client platforms.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center rounded-lg bg-white/5 p-1 border border-white/10 text-xs">
              {(['all', 'Production', 'Staging', 'Edge'] as const).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => setSelectedEnv(env)}
                  className={`rounded-md px-3 py-1.5 font-medium transition ${
                    selectedEnv === env
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {env.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-800/60 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10 text-[11px] uppercase font-mono">
                <tr>
                  <th className="py-3.5 px-4">Deployment Target</th>
                  <th className="py-3.5 px-4">Region / Node</th>
                  <th className="py-3.5 px-4">Git Commit</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Deployed</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredDeployments.map((dep) => (
                  <tr key={dep.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${
                          dep.environment === 'Production' ? 'bg-emerald-400' : 'bg-sky-400'
                        }`} />
                        <div>
                          <a
                            href={`https://${dep.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-[#f26522] flex items-center gap-1"
                          >
                            {dep.domain}
                            <ExternalLink className="size-3 text-slate-400" />
                          </a>
                          <span className="text-[10px] font-mono text-slate-400">
                            ID: {dep.id} • {dep.environment}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {dep.region}
                    </td>
                    <td className="py-4 px-4">
                      <div className="max-w-[260px]">
                        <span className="font-mono text-sky-400 font-bold bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/50 text-[10px]">
                          {dep.commit}
                        </span>
                        <p className="mt-1 truncate text-[11px] text-slate-400">{dep.commitMessage}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="size-3" />
                        {dep.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-[11px]">
                      {dep.deployedAt} ({dep.duration})
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleRollback(dep.id)}
                        className="inline-flex items-center gap-1 rounded bg-white/10 hover:bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition"
                      >
                        <RotateCcw className="size-3" /> Rollback Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Live Build & Terminal Logs Simulator */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-2xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-[#f26522]" />
                <span className="font-mono font-bold text-white">Edge Build Pipeline Log Stream</span>
                <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] px-2 py-0.5">
                  LIVE TELEMETRY
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-md text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveLogTab('build')}
                  className={`px-2.5 py-1 rounded font-mono ${
                    activeLogTab === 'build' ? 'bg-[#f26522] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Build Log
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLogTab('runtime')}
                  className={`px-2.5 py-1 rounded font-mono ${
                    activeLogTab === 'runtime' ? 'bg-[#f26522] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Edge Runtime
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLogTab('metrics')}
                  className={`px-2.5 py-1 rounded font-mono ${
                    activeLogTab === 'metrics' ? 'bg-[#f26522] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  DNS & BGP
                </button>
              </div>
            </div>

            {/* Terminal Screen */}
            <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 bg-slate-950/90 overflow-x-auto min-h-[220px]">
              {activeLogTab === 'build' && (
                <div className="space-y-1">
                  <p className="text-slate-500">[2026-11-10T21:40:02Z] [INFRA-BUILD] Pipeline initiated on worker node: dar-runner-04.altavox.space</p>
                  <p className="text-sky-400">[2026-11-10T21:40:03Z] [TURBOPACK] Next.js 16.4.3 production build started</p>
                  <p className="text-slate-300">[2026-11-10T21:40:09Z] ✓ Compiled successfully in 6.4s</p>
                  <p className="text-emerald-400">[2026-11-10T21:40:11Z] ✓ Static prerendering: 85 routes compiled with strict zero-pill CSS tree shaking</p>
                  <p className="text-slate-400">[2026-11-10T21:40:14Z] [SECURITY] Content-Security-Policy headers verified: script-src strict-dynamic</p>
                  <p className="text-slate-400">[2026-11-10T21:40:15Z] [DEPLOY] Pushing container artifact to Dar es Salaam POP edge cache</p>
                  <p className="text-emerald-400 font-bold">[2026-11-10T21:40:16Z] [PROD-HEALTH] HTTP 200 health probe passed on https://altavox.space (32ms roundtrip)</p>
                </div>
              )}

              {activeLogTab === 'runtime' && (
                <div className="space-y-1">
                  <p className="text-slate-500">[2026-11-10T21:41:00Z] [ROUTEROS-BRIDGE] PPPoE Radius accounting pulse received from ARK-POP-01</p>
                  <p className="text-slate-300">[2026-11-10T21:41:02Z] [AUTH] Verified 420 active concurrent subscriber sessions</p>
                  <p className="text-sky-400">[2026-11-10T21:41:05Z] [POSTGRES] Connection pool idle timeout: 30000ms, active: 4/5 connections</p>
                  <p className="text-emerald-400">[2026-11-10T21:41:08Z] [HEALTH] Edge worker memory leak sweep clean (0 RSS delta)</p>
                </div>
              )}

              {activeLogTab === 'metrics' && (
                <div className="space-y-1">
                  <p className="text-slate-400">DNS Authority: ns1.altavox.space (213.199.34.12), ns2.altavox.space (102.134.88.5)</p>
                  <p className="text-slate-300">BGP ASN: AS37421 (Altavox Autonomous System Network)</p>
                  <p className="text-sky-400">Anycast Routing: Route optimized via Tanzania Internet eXchange (TIX) Dar es Salaam</p>
                  <p className="text-emerald-400">SSL Certificate: Issued via Automated ACME CA (Auto-renews Dec 2026)</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cloud Architecture Overview */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl border border-white/10 bg-slate-800/40 p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-white">How Altavox Cloud Operates</h3>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              We design, build, and operate resilient systems combining regional African edge nodes, high-speed fiber backbones, and modern cloud orchestrators.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="size-6 text-[#f26522]" />
                <h4 className="mt-3 text-base font-bold text-white">Tenant Isolation</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Every subscriber, client portal, and enterprise deployment runs in sandboxed virtual network spaces with independent database schemas.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <Activity className="size-6 text-sky-400" />
                <h4 className="mt-3 text-base font-bold text-white">Continuous Verification</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Automated curl health probes and synthetic transaction runs verify that live database and checkout systems are operational.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <Server className="size-6 text-emerald-400" />
                <h4 className="mt-3 text-base font-bold text-white">Hardware & Telecommunications</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  From physical MikroTik CCR2004 core routers to distributed fiber terminations, we manage both hardware and software layers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
