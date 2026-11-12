'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AltavoxHeader } from '@/components/altavox-header';
import { AltavoxFooter } from '@/components/altavox-footer';
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal';
import {
  Compass,
  History,
  Shield,
  Layers,
  Award,
  Globe2,
  Cpu,
  Radio,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  MapPin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface Milestone {
  year: string;
  quarter: string;
  title: string;
  category: 'Foundation' | 'Telecom' | 'Software' | 'AI & Security';
  location: string;
  summary: string;
  keyDeliverables: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    quarter: 'Q1 - Q3',
    title: 'Nduruma Unguuni Roots & The Wireless Frontier',
    category: 'Foundation',
    location: 'Nduruma Unguuni, Arusha, Tanzania',
    summary:
      'Altavox Technologies originated addressing critical telecommunication deficits in rural East Africa, erecting initial long-range microwave links and ruggedized solar power micro-PoPs.',
    keyDeliverables: [
      'Commissioned first 35km line-of-sight microwave link between Mt. Meru foothills and agricultural settlements.',
      'Authored zero-drift solar battery management algorithms for erratic electrical grids.',
      'Established core engineering philosophy: build for resilience in the most demanding physical environments.',
    ],
  },
  {
    year: '2023',
    quarter: 'Q2 - Q4',
    title: 'Jaslyn Net Carrier Expansion & Sammena School ERP',
    category: 'Telecom',
    location: 'Northern Tanzania Corridor',
    summary:
      'Scaled Jaslyn Net to multi-gigabit throughput serving commercial clinics, agricultural cooperatives, and schools. Concurrently architected Sammena School management system.',
    keyDeliverables: [
      'Launched Sammena School cloud ERP platform managing student lifecycle and offline-tolerant grading.',
      'Deployed MikroTik RouterOS automation scripts for dynamic subscriber traffic shaping and billing.',
      'Formed the foundational Altavox Academy curriculum to train local youth in enterprise systems administration.',
    ],
  },
  {
    year: '2024',
    quarter: 'Q1 - Q4',
    title: 'Cultural Preservation: Mrisho Art Gallery & Architectural Sandboxing',
    category: 'Software',
    location: 'Dar es Salaam & Arusha',
    summary:
      'Engineered an innovative virtual exhibition showcase for contemporary East African artists while pioneering isolated, locked-sandbox WebGL embedding pipelines.',
    keyDeliverables: [
      'Delivered the production Mrisho Art Gallery platform preserving high-fidelity African contemporary masterpieces.',
      'Designed zero-leakage iframe containment architecture to embed interactive external art engines safely.',
      'Expanded Altavox Academy with first cohort of certified network engineers.',
    ],
  },
  {
    year: '2025',
    quarter: 'Q1 - Q4',
    title: 'Autonomous Systems & The Seven Core Architectures',
    category: 'AI & Security',
    location: 'East Africa Sovereign Cloud',
    summary:
      'Unified the entire technological estate into the Seven Intelligent Systems: Codex, Enigma, Research Lab, Archive, Atlas, Security Challenge, and Origin.',
    keyDeliverables: [
      'Engineered Gemini 3.8 Flash telemetry analysis and hypothesis validation in Enigma.',
      'Implemented SHA-256 cryptographic document archiving and double-entry financial settlement.',
      'Hardened all ingress perimeters against OWASP Top 10 vulnerabilities with dedicated sandbox validation.',
    ],
  },
  {
    year: '2026+',
    quarter: 'Current Era',
    title: 'Pan-African Sovereign Scale & 20 Academy Disciplines',
    category: 'AI & Security',
    location: 'Global / East African Community',
    summary:
      'Expanded Altavox Academy to 20 accredited engineering disciplines, deployed post-quantum Kyber cryptography across backhauls, and established regional data sovereignty benchmarks.',
    keyDeliverables: [
      'Curated 20 comprehensive engineering disciplines spanning AgriTech, HealthTech, FinTech, and Renewable Energy.',
      'Integrated eBPF micro-metering and LoRaWAN long-range edge meshes for environmental sensing.',
      'Solidified the Capricorn Charter: unwavering resilience, discipline, and sovereign African innovation.',
    ],
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Sovereignty of Infrastructure',
    description:
      'True autonomy requires owning the entire stack: from physical towers and solar charge controllers to custom database engines and cryptographic signing keys.',
  },
  {
    number: '02',
    title: 'The Zero-Mock Discipline',
    description:
      'We reject superficial mockups and fabricated telemetry. Every endpoint, database schema, payment verification, and security rule in our ecosystem is functional production code.',
  },
  {
    number: '03',
    title: 'Last-Mile Priority',
    description:
      'Software designed to run in pristine data centers fails under real-world conditions. We engineer for high packet loss, power fluctuation, and intermittent connectivity first.',
  },
  {
    number: '04',
    title: 'Cryptographic Verifiability',
    description:
      'Trust is earned through math, not assertions. All credentials, transaction ledgers, and architectural records carry immutable SHA-256 digests and Ed25519 digital signatures.',
  },
];

export default function OriginPage() {
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<string>('2026+');

  const activeMilestone =
    MILESTONES.find((m) => m.year === selectedMilestoneYear) || MILESTONES[MILESTONES.length - 1];

  return (
    <div className="min-h-screen flex flex-col bg-[#070d19] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <AltavoxHeader />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="border-b border-slate-800 pb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span className="font-serif text-lg">♑</span>
                <span>System G</span>
                <span className="text-slate-600">·</span>
                <span>Institutional History & Capricorn Identity</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Altavox Origin & The Capricorn Charter
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Born in Nduruma Unguuni, forged through rugged telecommunications engineering, and elevated into a sovereign technology conglomerate. We construct the digital backbone of Africa with uncompromising discipline.
              </p>
            </div>

            {/* Capricorn Emblem Seal */}
            <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center text-center w-full lg:w-72 shrink-0">
              <div className="w-20 h-20 rounded-none bg-amber-400/10 border border-amber-500/40 flex items-center justify-center mb-3">
                <span className="font-serif text-4xl text-amber-400">♑</span>
              </div>
              <div className="font-bold text-white tracking-wide uppercase text-sm">
                Capricorn Mark
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Endurance · Foundation · Precision
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-amber-400/80">
                FOUNDED 2022 · ARUSHA, TANZANIA
              </div>
            </div>
          </div>

          {/* Quick Historical Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="border-l-2 border-amber-500 pl-3 py-1 bg-slate-900/40">
              <div className="text-slate-400">Foundational Corridor</div>
              <div className="text-base font-bold text-white mt-0.5">Nduruma Unguuni</div>
            </div>
            <div className="border-l-2 border-emerald-500 pl-3 py-1 bg-slate-900/40">
              <div className="text-slate-400">Telecom Backbone</div>
              <div className="text-base font-bold text-white mt-0.5">Jaslyn Net WISP</div>
            </div>
            <div className="border-l-2 border-blue-500 pl-3 py-1 bg-slate-900/40">
              <div className="text-slate-400">Curricular Breadth</div>
              <div className="text-base font-bold text-white mt-0.5">20 Academy Tracks</div>
            </div>
            <div className="border-l-2 border-purple-500 pl-3 py-1 bg-slate-900/40">
              <div className="text-slate-400">System Architecture</div>
              <div className="text-base font-bold text-white mt-0.5">7 Unified Engines</div>
            </div>
          </div>
        </div>

        {/* The 4 Principles / Architectural Charter */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              The Architectural Charter
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Immutable Engineering Tenets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="bg-slate-900 border border-slate-800 p-5 space-y-3 relative group hover:border-amber-500/50 transition-colors"
              >
                <div className="text-2xl font-mono font-bold text-amber-400/40 group-hover:text-amber-400 transition-colors">
                  {principle.number}
                </div>
                <h3 className="text-base font-bold text-white">{principle.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Milestone Timeline Explorer */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              Chronological Innovation Timeline (2022 — Present)
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Select an epoch to examine historical deliverables
            </span>
          </div>

          {/* Timeline Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MILESTONES.map((milestone) => {
              const isSelected = milestone.year === selectedMilestoneYear;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setSelectedMilestoneYear(milestone.year)}
                  className={`p-3 text-left border transition-all text-xs font-mono ${
                    isSelected
                      ? 'bg-slate-850 border-amber-500 text-white shadow-md shadow-amber-500/5'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-amber-400 font-bold mb-0.5">
                    {milestone.quarter}
                  </div>
                  <div className="text-base font-bold text-white">{milestone.year}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-sans">
                    {milestone.category}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Milestone Detail Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>{activeMilestone.year}</span>
                  <span className="text-slate-600">·</span>
                  <span>{activeMilestone.quarter}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> {activeMilestone.location}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeMilestone.title}
                </h3>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 bg-amber-400/10 border border-amber-500/40 text-amber-300 self-start sm:self-auto">
                {activeMilestone.category}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              {activeMilestone.summary}
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Verified Architectural Deliverables
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeMilestone.keyDeliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 p-4 space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      DELIVERABLE {activeMilestone.year}-{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Existing Products & Ecosystem Stewardship */}
        <div className="bg-slate-900 border border-slate-800 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Live Products & Ecosystem Stewardship
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Commercial and cultural pillars maintained under continuous active production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Carrier ISP</span>
                <span className="text-[10px] font-mono text-emerald-400">Active Network</span>
              </div>
              <h3 className="text-lg font-bold text-white">Jaslyn Net</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-capacity wireless internet service provider delivering fiber-backed microwave distribution across urban and remote rural hubs.
              </p>
              <div className="pt-2">
                <Link
                  href="/wifi"
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Inspect WiFi Portal & Topology <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">Education ERP</span>
                <span className="text-[10px] font-mono text-emerald-400">Active Production</span>
              </div>
              <h3 className="text-lg font-bold text-white">Sammena School</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Next-generation academic management software suite powering admissions, fee ledgers, curriculum tracking, and parent communication.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/sammena"
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  View Case Study & Live Preview <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">Fine Art Showcase</span>
                <span className="text-[10px] font-mono text-emerald-400">Active Production</span>
              </div>
              <h3 className="text-lg font-bold text-white">Mrisho Art Gallery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curated virtual digital exhibition honoring contemporary East African artists, embedded in isolated sandbox containers.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/mrisho-art-gallery"
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Explore Sandboxed Exhibition <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <SevenCipherSeal system="origin" dark />
        </div>

        {/* Footer Navigation Strip */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>ALTAVOX TECHNOLOGIES · NATIVE ARCHITECTURE DEPLOYMENT</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/atlas" className="text-amber-400 hover:underline">
              Atlas System Map →
            </Link>
            <Link href="/codex" className="text-amber-400 hover:underline">
              Codex Engineering Docs →
            </Link>
          </div>
        </div>
        </div>
      </main>
      <AltavoxFooter />
    </div>
  );
}
