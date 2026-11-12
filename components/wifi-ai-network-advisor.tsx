'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Clock,
  ArrowRight
} from 'lucide-react'

interface Recommendation {
  id: string
  title: string
  category: 'performance' | 'revenue' | 'security'
  impact: string
  description: string
  actionLabel: string
  applied: boolean
}

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Washa Dynamic Queue Burst kwa Masaa ya Rush (18:00 - 22:00)',
    category: 'performance',
    impact: 'Example only · unmeasured',
    description: 'MikroTik CCR2004 inaona wateja zaidi ya 350 saa 20:00. Burst ya sekunde 15 ya 16 Mbps itasaidia kurasa kufunguka papo hapo bila kulemea bendi nzima.',
    actionLabel: 'Review sample idea',
    applied: false
  },
  {
    id: 'rec-2',
    title: 'Ongeza Kifurushi cha "Masaa 12 Usiku (Night Owl)" kwa TZS 1,500',
    category: 'revenue',
    impact: 'Potential · unverified',
    description: 'Kuanzia saa 23:00 hadi 06:00 asubuhi, bendi inakuwa tupu (wastani wa wateja 18 tu). Kifurushi cha usiku kitavuta wanafunzi wa chuo na kuongeza mapato wakati mtandao hauna msongamano.',
    actionLabel: 'Review sample package',
    applied: false
  },
  {
    id: 'rec-3',
    title: 'Washa Anti-MAC Spoofing & DHCP Snooping kwenye UniFi U6',
    category: 'security',
    impact: 'Proposed control · review',
    description: 'Inazuia watumiaji wasio waaminifu kuiga anwani za MAC za wateja waliolipia bando ili kutumia intaneti bure.',
    actionLabel: 'Review sample control',
    applied: true
  }
]

export function WifiAiNetworkAdvisor() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMENDATIONS)
  const [autoTuningActive, setAutoTuningActive] = useState(false)

  const handleApply = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, applied: true } : r))
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#072444] via-[#051c33] to-[#041221] p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 size-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f26522] to-amber-500 text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Sample Network Operations Recommendations
              </h3>
              <span className="text-[10px] font-mono font-bold bg-orange-500/20 text-[#f26522] border border-orange-500/30 px-2 py-0.5 rounded">
                Rule-based sample
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Example operator ideas for review. This panel has no live router telemetry, AI model, or device connection.
            </p>
          </div>
        </div>

        {/* AI Projection Badge */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <TrendingUp className="size-4 text-emerald-400" />
          <div className="text-xs font-mono">
            <span className="text-slate-400 text-[10px] block">Makadirio ya Mwezi Huu:</span>
            <span className="font-black text-amber-200 text-sm">Not connected</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations List */}
      <div className="grid md:grid-cols-3 gap-3.5 my-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-4 rounded-xl border flex flex-col justify-between transition ${
              rec.applied
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  rec.category === 'performance' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  rec.category === 'revenue' ? 'bg-orange-500/20 text-[#f26522] border border-orange-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {rec.impact}
                </span>
                {rec.applied && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    Imehakikiwa kwenye demo
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                {rec.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {rec.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              {rec.applied ? (
                <span className="text-[11px] text-emerald-400 font-bold font-mono">
                  Demo review saved · not sent to router
                </span>
              ) : (
                <button
                  onClick={() => handleApply(rec.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#f26522] py-2 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                >
                  <Zap className="size-3" />
                  <span>{rec.actionLabel}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Guarantee */}
      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <ShieldCheck className="size-3.5" />
          <span>No router configuration is sent from this preview</span>
        </span>
        <span className="text-slate-400">
          Sample recommendations · no live telemetry
        </span>
      </div>
    </div>
  )
}
