'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Cpu,
  Network,
  Terminal,
  Calculator,
  ShieldCheck,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Server,
  Layers,
  Sparkles
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { MikroTikConfigGenerator } from '@/components/mikrotik-config-generator'
import { EdgeLatencyProber } from '@/components/edge-latency-prober'
import { LiveTerminalSandbox } from '@/components/live-terminal-sandbox'
import { ArchitectureCalculator } from '@/components/architecture-calculator'
import { DemoModal } from '@/components/demo-modal'
import { CareerAdvisorModal } from '@/components/career-advisor-modal'

type ToolTab = 'mikrotik' | 'edge-prober' | 'sandbox' | 'calculator'

export default function LaunchpadPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('mikrotik')
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [demoContext, setDemoContext] = useState<string | undefined>()
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)

  const handleOpenDemo = (context?: string) => {
    setDemoContext(context)
    setDemoModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-[#f26522] selection:text-white">
      <AltavoxHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#051c36] to-[#030d17] text-white py-14 sm:py-20 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#f26522_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-orange-400 mb-3">
              <span className="flex size-2 rounded-full bg-emerald-400" />
              <span>ALTAVOX SYSTEMS ENGINEERING LAUNCHPAD</span>
              <span>·</span>
              <span>V4.2 LIVE UTILITIES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
              Interactive Systems <span className="text-[#f26522]">Engineering Suite</span>.
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore battle-tested tools built for Tanzanian and East African ISP carriers, educational institutions, and mission-critical cloud deployments. Test real scripts, probe regional edge latency, and simulate production queues.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl pt-4 border-t border-white/10">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                <div className="font-mono text-xs font-bold text-slate-400">RouterOS Script Forge</div>
                <div className="text-lg font-black text-white mt-0.5">v7.14+ Ready</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                <div className="font-mono text-xs font-bold text-slate-400">Subsea RTT (Dar)</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">2.4 ms</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                <div className="font-mono text-xs font-bold text-slate-400">M-Pesa IPN Latency</div>
                <div className="text-lg font-black text-amber-400 mt-0.5">6.4 ms</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                <div className="font-mono text-xs font-bold text-slate-400">Field Deployments</div>
                <div className="text-lg font-black text-[#f26522] mt-0.5">100% Production</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Selection Bar */}
        <section className="sticky top-[76px] z-30 bg-white border-b border-slate-200 shadow-xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
              <button
                onClick={() => setActiveTab('mikrotik')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'mikrotik'
                    ? 'bg-[#07294d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Cpu className="size-4 text-[#f26522]" />
                <span>MikroTik Config Forge</span>
              </button>

              <button
                onClick={() => setActiveTab('edge-prober')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'edge-prober'
                    ? 'bg-[#07294d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Network className="size-4 text-emerald-500" />
                <span>East Africa Edge Prober</span>
              </button>

              <button
                onClick={() => setActiveTab('sandbox')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'sandbox'
                    ? 'bg-[#07294d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Terminal className="size-4 text-blue-500" />
                <span>Live Socket Sandbox</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-[#07294d] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calculator className="size-4 text-purple-500" />
                <span>ISP Sizing & ROI Modeler</span>
              </button>
            </div>
          </div>
        </section>

        {/* Active Tool Workspace */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {activeTab === 'mikrotik' && (
              <div className="space-y-8">
                <MikroTikConfigGenerator
                  onDeployConsultation={(summary) => handleOpenDemo(summary)}
                />
              </div>
            )}

            {activeTab === 'edge-prober' && (
              <div className="space-y-8">
                <EdgeLatencyProber
                  onScheduleAssessment={() => handleOpenDemo('Edge Latency & Network Audit')}
                />
              </div>
            )}

            {activeTab === 'sandbox' && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                        Production Socket Simulator
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#07294d] mt-1">
                        Live Systems Terminal Sandbox
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                        Simulate real-time MikroTik RouterOS API queue execution, Sammena School SIMS academic batch compilation, and Nexora Cloud database diagnostics right in your browser.
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenDemo('Live Terminal Consultation')}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer self-start sm:self-auto"
                    >
                      <span>Connect with Lead Engineer</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>

                  <LiveTerminalSandbox />
                </div>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="mb-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                      TCO & Infrastructure Modeler
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#07294d] mt-1">
                      ISP Bandwidth & Infrastructure Cost Calculator
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                      Model your organization&apos;s workload across ISP billing, education SIMS, or enterprise cloud platforms to estimate monthly labor saved and recommended deployment hardware.
                    </p>
                  </div>

                  <ArchitectureCalculator onSelectSetup={handleOpenDemo} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Engineering Support & Deployment Dispatch Banner */}
        <section className="bg-slate-900 text-white py-14 border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#07294d] to-[#031526] p-8 sm:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="rounded-md bg-[#f26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Field Engineering Dispatch
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Need These Architectures Implemented in Your Network?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Altavox engineers deploy production systems on-site and remotely across Tanzania. From MikroTik CCR fiber concentrators and tower microwave alignment to custom M-Pesa IPN billing servers.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Phone className="size-3.5 text-[#f26522]" />
                    <span>+255 750 227 073 / +255 708 227 073</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-[#f26522]" />
                    <span>engineering@altavox.space</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => handleOpenDemo('Direct Field Engineering Inquiry')}
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-lg hover:bg-[#e05312] transition cursor-pointer"
                >
                  Schedule Engineering Consultation
                </button>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition text-center"
                >
                  Contact Helpdesk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCourse={demoContext}
      />

      <CareerAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />
    </div>
  )
}
