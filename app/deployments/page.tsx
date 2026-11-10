'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Bot, CheckCircle2, Cloud, Globe2, MessageSquare, Settings2, ShieldCheck, Sparkles, Terminal } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const channels = [
  { name: 'Website Portal & API', detail: 'Embed web forms, portals, and REST APIs', icon: Globe2 },
  { name: 'WhatsApp Business', detail: 'Automated subscriber billing & alerts', icon: MessageSquare },
  { name: 'Telegram Bot', detail: 'NOC operational alerts & commands', icon: Bot },
  { name: 'Slack / Discord', detail: 'Internal team notifications & logs', icon: MessageSquare },
]

const signatureFeatures = [
  { name: 'Mission Control', detail: 'See system health, deploy status, incidents, and database metrics from one command center.', stat: 'One view' },
  { name: 'MikroTik RouterOS Sync', detail: 'Direct queue provisioning and billing account lifecycle management.', stat: 'Real-time' },
  { name: 'Omnichannel Alerts', detail: 'Keep customer context consistent across SMS, WhatsApp, web portals, and email.', stat: 'Unified' },
  { name: 'SafeShip Releases', detail: 'Isolated sandbox previews, type verification, and instant rollback checkpoints.', stat: 'Zero drama' },
  { name: 'Auditable Log Trails', detail: 'Every deployment, schema migration, and subscriber modification is timestamped.', stat: 'Tamper-evident' },
  { name: 'Sovereign Runtime', detail: 'Keep data and operational control on your chosen infrastructure without vendor lock-in.', stat: 'Full control' },
]

export default function DeploymentsPage() {
  const [mode, setMode] = useState<'system' | 'bot'>('system')
  const [selectedChannel, setSelectedChannel] = useState('Website Portal & API')
  const [projectName, setProjectName] = useState('')
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [notice, setNotice] = useState('')

  function handleDeploy(e: React.FormEvent) {
    e.preventDefault()
    const name = projectName.trim() || 'New system'
    setNotice(`No deployment was started. Automated build, runtime provisioning, and release execution are not connected here yet. Your ${name} request via ${selectedChannel} is ready to discuss with the engineering team.`)
  }

  return (
    <PageFrame
      eyebrow="Altavox Launchpad"
      title="Deploy Systems, Bots, and Infrastructure."
      intro="Deployment operations information and a project intake point. Automated deployment execution is not enabled in this workspace yet."
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-orange-200 bg-orange-50/70 p-6 sm:flex-row sm:items-center sm:justify-between shadow-xs">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#f26522]">
              Developer Command Center
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#07294d]">Meet Altavox Computer Console</h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              A separate technical console for available diagnostics. Deployment execution remains disabled until its runner is connected.
            </p>
          </div>
          <Link
            href="/computer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#07294d] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#051c36] shadow-sm"
          >
            Open Computer Console <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Deployment Setup Form */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  New Release Blueprint
                </span>
                <h3 className="text-xl font-bold text-[#07294d]">What system are you preparing?</h3>
              </div>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                {(['system', 'bot'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                      mode === item
                        ? 'bg-[#07294d] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item === 'system' ? 'Web Platform' : 'Automation Bot'}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleDeploy} className="space-y-5 pt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Project Name
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder={mode === 'system' ? 'e.g. Jaslyn Net Portal v2' : 'e.g. Billing Alert Bot'}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Repository or Source URL
                <input
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  placeholder="https://github.com/organization/system"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
                />
              </label>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                  Target Notification / Integration Channel
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {channels.map(({ name, detail, icon: Icon }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedChannel(name)}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                        selectedChannel === name
                          ? 'border-[#f26522] bg-orange-50/60'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Icon className="mt-0.5 size-4 text-[#f26522] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#07294d]">{name}</p>
                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 font-medium">{detail}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#d95316] shadow-sm"
                >
                  Review Deployment Readiness <ArrowUpRight className="size-4" />
                </button>
              </div>

              {notice && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-medium text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>{notice}</span>
                </div>
              )}
            </form>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#07294d]">Controlled Release Gates</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                A production release workflow will require verified build checks, secret validation, health checks, and rollback controls before it can be enabled.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Isolated preview environment (not connected)',
                  'Environment secrets verification',
                  'Health & ping reachability checks',
                  'Rollback procedure (not connected)'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="size-4 text-[#f26522] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f26522] hover:underline transition"
              >
                Need dedicated infrastructure setup? Consult engineers →
              </Link>
            </div>
          </aside>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12">
          <div className="mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
              Operational Advantages
            </span>
            <h3 className="mt-1 text-2xl font-bold text-[#07294d]">
              More than hosting. An operating system for what you build.
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {signatureFeatures.map(({ name, detail, stat }) => (
              <div key={name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#07294d] text-sm">{name}</h4>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600 font-bold">
                    {stat}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
