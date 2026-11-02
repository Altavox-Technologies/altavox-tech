'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Calendar,
  Clock3,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  PlayCircle,
  Building2,
  GraduationCap,
  ChevronRight,
  Zap,
  BadgeCheck,
  HelpCircle,
  PhoneCall,
  Laptop,
  Network,
  Server,
  Database,
  Terminal,
  Activity,
  ArrowUpRight,
  Cpu,
  Calculator,
  Wifi
} from 'lucide-react'
import { motion } from 'motion/react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { AltavoxCourseCard } from '@/components/altavox-course-card'
import { DemoModal } from '@/components/demo-modal'
import { CurriculumModal } from '@/components/curriculum-modal'
import { CareerAdvisorModal } from '@/components/career-advisor-modal'
import { ArchitectureCalculator } from '@/components/architecture-calculator'
import { LiveTerminalSandbox } from '@/components/live-terminal-sandbox'
import { MikroTikConfigGenerator } from '@/components/mikrotik-config-generator'
import { EdgeLatencyProber } from '@/components/edge-latency-prober'
import { TechStackTicker } from '@/components/tech-stack-ticker'
import { coursesData, courseCategories, CourseItem } from '@/lib/courses-data'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Solutions')
  const [searchQuery, setSearchQuery] = useState('')
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [selectedCourseForDemo, setSelectedCourseForDemo] = useState<string>('Jaslyn Net — Carrier-Grade ISP Billing & MikroTik Automation Platform')
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false)
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState<CourseItem | null>(null)
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)
  const [suiteTab, setSuiteTab] = useState<'sandbox' | 'mikrotik' | 'edge-prober' | 'calculator'>('sandbox')

  // Filter systems & courses by category and search
  const filteredCourses = coursesData.filter((item) => {
    const matchesCategory = selectedCategory === 'All Solutions' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  function handleOpenDemo(title?: string) {
    if (title) setSelectedCourseForDemo(title)
    setDemoModalOpen(true)
  }

  function handleOpenCurriculum(course: CourseItem) {
    setSelectedCourseForCurriculum(course)
    setCurriculumModalOpen(true)
  }

  const techPartners = [
    { name: 'MikroTik RouterOS', tag: 'ISP Core Networking' },
    { name: 'PostgreSQL & Drizzle', tag: 'Relational Integrity' },
    { name: 'Next.js 16 App Router', tag: 'Web Systems' },
    { name: 'Docker Container Cloud', tag: 'Isolated Sandboxes' },
    { name: 'M-Pesa Webhooks', tag: 'Automated Billing' },
    { name: 'FreeRADIUS Server', tag: 'AAA Accounting' },
    { name: 'Cloudflare Edge', tag: 'Global CDN & TLS' },
    { name: 'Redis In-Memory', tag: 'High-Concurrency Queue' },
  ]

  const caseStudies = [
    {
      name: 'Jaslyn Internet Services',
      role: 'Regional ISP Provider',
      title: 'ISP billing workflows and MikroTik subscriber provisioning',
      outcome: 'Automated billing workflows',
      previous: 'Manual bank slip verification & late-night reconnect tickets',
      current: 'Payment-triggered provisioning workflows, subject to configured integrations',
      image: '/public/projects/jaslyn-net-live.png',
      quote: 'Jaslyn Net is presented as an ISP operations platform integrating billing, subscriber identity, and network automation.'
    },
    {
      name: 'Sammena Educational Complex',
      role: 'Pre & Primary School',
      title: 'School SIMS for student records and fee administration',
      outcome: 'School administration workflows',
      previous: 'Physical ledger books, paper receipt booklets, lost student files',
      current: 'Unified web portal for admissions, fee reconciliation, and PDF gradebooks',
      image: '/public/projects/sammena-live.png',
      quote: 'Sammena School uses a school information management platform for its public website and administration workflows.'
    },
    {
      name: 'Regional Telecom Operators',
      role: 'Multi-Site Network Operations',
      title: 'NetBill-NOC: Multi-Tenant RADIUS Accounting & Sub-10s Telemetry',
      outcome: 'Network operations tooling',
      previous: 'Uncoordinated tower alerts and delayed outage discovery',
      current: 'Visual dynamic topology map with automated Telegram engineer dispatch',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=160&h=160&q=80',
      quote: 'Network operations capabilities include monitoring, incident visibility, and operational alerts when connected to live infrastructure.'
    }
  ]

  const articles = [
    {
      category: 'ISP Operations',
      title: 'Automating MikroTik RouterOS billing without breaking active connections',
      text: 'How to structure queue provisioning and M-Pesa reconciliation so subscribers renew without dropping live VoIP or video streams.',
      time: '11 min read'
    },
    {
      category: 'Systems Architecture',
      title: 'Designing reliable systems for teams that cannot stop',
      text: 'Practical notes on observability, failover routing, and the small architectural decisions that keep operational software dependable.',
      time: '8 min read'
    },
    {
      category: 'Security & Auth',
      title: 'Building security foundations that make business growth safer',
      text: 'Role-based access control, session hygiene, and database constraints built directly into the foundation rather than patched on later.',
      time: '6 min read'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#f26522] selection:text-white">
      {/* Altavox Tech Header */}
      <AltavoxHeader />

      <main className="flex-1">
        {/* ======================================================== */}
        {/* HERO SECTION - CORPORATE NAVY & VIBRANT ORANGE ACCENTS */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Mission & Core Value */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                
                {/* Launchpad Engineering Suite Badge */}
                <Link
                  href="/launchpad"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-mono text-orange-300 hover:bg-white/20 hover:border-[#f26522] transition"
                >
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span>Interactive Suite: MikroTik Script Forge & Regional Edge Prober</span>
                  <ArrowRight className="size-3 text-[#f26522]" />
                </Link>

                {/* Main Hero Headline */}
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl leading-[1.15]">
                  Technology Built for <span className="text-[#f26522]">Real Work.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                  Altavox Tech designs software platforms, ISP billing systems, and connected operational tools that help organizations run smoothly, reliably, and without guesswork.
                </p>

                {/* Instant Search Bar */}
                <div className="pt-2">
                  <div className="relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search systems (e.g. Jaslyn Net, MikroTik, Sammena SIMS, Cloud)..."
                      className="w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-300 outline-none backdrop-blur-md focus:border-[#f26522] focus:bg-white/15 transition"
                    />
                    <button
                      onClick={() => {
                        const el = document.getElementById('systems-section')
                        el?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer"
                    >
                      Find System
                    </button>
                  </div>

                  {/* Popular Pills */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400">Featured:</span>
                    {['Altavox WiFi', 'Jaslyn Net ISP', 'MikroTik API', 'Sammena SIMS', 'NetBill-NOC', 'Nexora Cloud'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (tag === 'Altavox WiFi') {
                            window.location.href = '/wifi'
                            return
                          }
                          setSearchQuery(tag.includes('ISP') ? 'Jaslyn Net' : tag)
                          const el = document.getElementById('systems-section')
                          el?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
                          tag === 'Altavox WiFi'
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold hover:bg-emerald-500 hover:text-white'
                            : 'bg-white/10 text-slate-200 hover:bg-[#f26522] hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    href="/wifi"
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-700 transition"
                  >
                    <Wifi className="size-4" />
                    <span>Launch Altavox WiFi</span>
                  </Link>

                  <Link
                    href="/projects"
                    className="flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-[#e05312] transition"
                  >
                    <span>Production Systems</span>
                    <ArrowRight className="size-4" />
                  </Link>

                  <button
                    onClick={() => handleOpenDemo()}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
                  >
                    <Calendar className="size-4 text-[#f26522]" />
                    <span>Book Live Technical Demo</span>
                  </button>

                  <button
                    onClick={() => setAdvisorModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3.5 text-xs font-semibold text-cyan-200 hover:text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    <Sparkles className="size-3.5" />
                    <span>AI Systems Advisor</span>
                  </button>
                </div>

              </motion.div>

              {/* Right Column: Interactive Hero Live Cockpit Preview Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-xl shadow-2xl">
                  {/* Floating Live Indicator */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        Architecture Preview
                      </span>
                    </div>
                    <span className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-mono text-cyan-200">
                      Jaslyn Net · RouterOS v7.14
                    </span>
                  </div>

                  {/* Operational Telemetry Card */}
                  <div className="mt-5 space-y-4">
                    <div className="rounded-xl bg-[#031526]/80 p-4 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="rounded bg-[#f26522] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            Reference Architecture
                          </span>
                          <h4 className="mt-2 text-base font-bold text-white">
                            Jaslyn Net ISP Gateway
                          </h4>
                          <p className="mt-1 text-xs text-slate-300">
                            MikroTik CCR2004 · PPPoE & Hotspot Sync
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded">
                            Integration example
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Activity className="size-3.5 text-[#f26522]" />
                          <span>RouterOS connectivity</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="size-3.5 text-cyan-300" />
                          <span>Payment integration</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Guarantees Checklist */}
                    <div className="space-y-2.5 text-xs text-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span>Instant queue refresh without dropping active TCP streams</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span>Automated M-Pesa payment reconciliation & SMS invoices</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span>Strict PostgreSQL constraints & role-based security</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span>NOC Telegram prober alerts on link degradation</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={() => handleOpenDemo('Jaslyn Net — Carrier-Grade ISP Billing & MikroTik Automation Platform')}
                        className="flex-1 rounded-xl bg-[#f26522] py-3 text-center text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer"
                      >
                        Reserve System Demo
                      </button>
                      <Link
                        href="/courses/jaslyn-net"
                        className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-xs font-semibold text-white hover:bg-white/10 transition"
                      >
                        View Blueprint
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CORE TECHNOLOGIES & INFRASTRUCTURE STRIP (NOW IN MOTION) */}
        {/* ======================================================== */}
        <TechStackTicker />

        {/* ======================================================== */}
        {/* INTERACTIVE PRODUCTION COCKPIT & LIVE ENGINEERING SUITE */}
        {/* ======================================================== */}
        <section className="bg-[#030d17] py-16 border-b border-slate-800 text-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-block rounded-full bg-[#f26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Live Engineering Suite
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <span>Production Verified</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Test Altavox Engineering in Action
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                  Select an interactive utility below to generate real MikroTik RouterOS deployment scripts, probe East African telecom edge latency, or run live socket terminal commands.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/launchpad"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <span>Open Dedicated Launchpad</span>
                  <ArrowUpRight className="size-3.5 text-[#f26522]" />
                </Link>
              </div>
            </motion.div>

            {/* Interactive Tool Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 scrollbar-none">
              <button
                onClick={() => setSuiteTab('sandbox')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  suiteTab === 'sandbox'
                    ? 'bg-[#f26522] text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Terminal className="size-4" />
                <span>Live Socket Terminal</span>
              </button>

              <button
                onClick={() => setSuiteTab('mikrotik')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  suiteTab === 'mikrotik'
                    ? 'bg-[#f26522] text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Cpu className="size-4" />
                <span>MikroTik Config Forge</span>
              </button>

              <button
                onClick={() => setSuiteTab('edge-prober')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  suiteTab === 'edge-prober'
                    ? 'bg-[#f26522] text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Network className="size-4" />
                <span>East Africa Edge Prober</span>
              </button>

              <button
                onClick={() => setSuiteTab('calculator')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  suiteTab === 'calculator'
                    ? 'bg-[#f26522] text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Calculator className="size-4" />
                <span>ISP Sizing & ROI Modeler</span>
              </button>
            </div>

            {/* Active Tool View */}
            <motion.div
              key={suiteTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {suiteTab === 'sandbox' && (
                <LiveTerminalSandbox />
              )}

              {suiteTab === 'mikrotik' && (
                <div className="text-slate-900">
                  <MikroTikConfigGenerator onDeployConsultation={(summary) => handleOpenDemo(summary)} />
                </div>
              )}

              {suiteTab === 'edge-prober' && (
                <div className="text-slate-900">
                  <EdgeLatencyProber onScheduleAssessment={() => handleOpenDemo('Edge Latency & Network Audit')} />
                </div>
              )}

              {suiteTab === 'calculator' && (
                <div className="text-slate-900 rounded-3xl bg-white p-6 sm:p-8 shadow-xl">
                  <ArchitectureCalculator onSelectSetup={(summary) => handleOpenDemo(summary)} />
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PRODUCTION SYSTEMS & TRACKS GRID (ALTAVOX TECH COURSE CARD) */}
        {/* ======================================================== */}
        <section id="systems-section" className="py-16 sm:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <span className="inline-block rounded bg-orange-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Altavox Platforms & Tracks
                </span>
                <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#07294d]">
                  Production Systems & Engineering Initiatives
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                  Inspect our active platforms across ISP operations, education technology, cloud infrastructure, and technical certification tracks.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#f26522] hover:text-[#d44e0e] transition"
              >
                <span>View Full Projects Registry</span>
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            {/* Category Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
            >
              {courseCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[#07294d] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Systems Grid */}
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((item) => (
                <div key={item.id}>
                  <AltavoxCourseCard
                    course={item}
                    onViewCurriculum={handleOpenCurriculum}
                    onBookDemo={handleOpenDemo}
                  />
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <p className="text-base font-semibold text-slate-700">No systems found matching &quot;{searchQuery}&quot;</p>
                <p className="mt-1 text-xs text-slate-500">Try searching for Jaslyn Net, MikroTik, Sammena, or Cloud.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All Solutions')
                  }}
                  className="mt-4 rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE ARCHITECTURE & ROI CALCULATOR SECTION */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto mb-10"
            >
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Enterprise Planning & ROI Tool
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-[#07294d]">
                Calculate Your Infrastructure ROI & Architecture Sizing
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Model your organization&apos;s workload across ISP billing, education SIMS, or enterprise cloud platforms to estimate monthly labor saved and recommended deployment hardware.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArchitectureCalculator
                onSelectSetup={(summary) => handleOpenDemo(summary)}
              />
            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* NEW FEATURE: INTERACTIVE ALTAVOX AI SYSTEMS ADVISOR BANNER */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-r from-[#07294d] to-[#0d3b66] text-white py-14 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 lg:grid-cols-12 lg:items-center"
            >
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3 py-1 text-xs font-bold text-orange-200">
                  <Sparkles className="size-3.5 text-[#f26522]" />
                  <span>Free Operational Assessment Tool</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Need a Tailored System for Your ISP, School, or Business?
                </h3>
                <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  Use our interactive <span className="text-[#f26522] font-semibold">Altavox AI Systems Advisor</span>. In under 60 seconds, input your operational bottlenecks (e.g. MikroTik PPPoE sync, student fee tracking, or private cloud) to get an instant 3-phase technical roadmap, database architecture, and deployment cost forecast.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setAdvisorModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#e05312] transition cursor-pointer"
                  >
                    <Sparkles className="size-4" />
                    <span>Launch AI Systems Advisor</span>
                  </button>
                  <button
                    onClick={() => handleOpenDemo()}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    <span>Talk to a Systems Engineer</span>
                  </button>
                </div>
              </div>

              {/* Quick Systems Architecture Preview */}
              <div className="lg:col-span-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-200">
                  Ready Architecture Blueprints
                </p>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="rounded-lg bg-black/20 p-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">ISP & MikroTik Billing</p>
                      <p className="text-[11px] text-slate-300">→ Jaslyn Net Platform</p>
                    </div>
                    <span className="font-bold text-emerald-400">Integration design</span>
                  </div>
                  <div className="rounded-lg bg-black/20 p-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">School Management & SIMS</p>
                      <p className="text-[11px] text-slate-300">→ Sammena School Portal</p>
                    </div>
                    <span className="font-bold text-emerald-400">School information systems</span>
                  </div>
                  <div className="rounded-lg bg-black/20 p-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Carrier NOC Telemetry</p>
                      <p className="text-[11px] text-slate-300">→ NetBill-NOC Multi-Site</p>
                    </div>
                    <span className="font-bold text-emerald-400">99.99% Uptime</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* WHY CHOOSE ALTAVOX - 4 PRINCIPLES IN ALTAVOX TECH PRINCIPLES */}
        {/* ======================================================== */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Our Guiding Principles
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#07294d]">
                Engineered for Teams That Cannot Stop
              </h2>
              <p className="mt-3 text-base text-slate-600">
                We approach technology as a working part of the organization, not a layer of decoration. That means listening carefully, defining the real problem, and building the smallest dependable system that can carry the work forward.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Pillar 1 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-[#f26522] transition-colors duration-150">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#07294d] text-white">
                  <span className="font-mono text-sm font-bold text-[#f26522]">01</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#07294d]">
                  Clarity Over Hype
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Understand the real operation before choosing the technology stack. We diagnose workflow friction before writing a single line of production code.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-[#f26522] transition-colors duration-150">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#07294d] text-white">
                  <span className="font-mono text-sm font-bold text-amber-400">02</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#07294d]">
                  Observable Discipline
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Prefer simple, observable systems over unnecessary complexity. Every network call, payment webhook, and database transaction is strictly auditable.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-[#f26522] transition-colors duration-150">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#07294d] text-white">
                  <span className="font-mono text-sm font-bold text-cyan-300">03</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#07294d]">
                  Operator Continuity
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Build for the operators who will maintain the system daily. Intuitive cockpits, comprehensive documentation, and zero mysterious vendor lock-in.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-[#f26522] transition-colors duration-150">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#07294d] text-white">
                  <span className="font-mono text-sm font-bold text-emerald-400">04</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#07294d]">
                  Carrier-Grade SLA
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Failover routing, sub-millisecond connection pools, and container isolation ensure that when the load spikes, your services stay responsive.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CLIENT CASE STUDIES & OPERATIONAL OUTCOMES */}
        {/* ======================================================== */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Evidence Over Exaggeration
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#07294d]">
                  Real Operational Outcomes & Deployments
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Practical case studies from active ISP operations, school systems, and telecom network nodes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">4.9 / 5.0 Reliability</span>
                <span className="text-xs text-slate-500">(Verified Deployments)</span>
              </div>
            </motion.div>

            {/* Case Studies Grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <div
                  key={study.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#f26522] transition-colors duration-150"
                >
                  <div>
                    {/* Header with Outcome Badge */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                        {study.outcome}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{study.role}</span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-[#07294d]">
                      {study.title}
                    </h3>

                    {/* Review Quote */}
                    <p className="mt-3 text-xs leading-6 text-slate-700 italic">
                      &quot;{study.quote}&quot;
                    </p>

                    {/* Operational Shift */}
                    <div className="mt-5 rounded-xl bg-slate-50 p-3 border border-slate-100 text-[11px] space-y-1">
                      <div className="text-slate-500">
                        <span className="font-semibold text-slate-600">Before:</span> {study.previous}
                      </div>
                      <div className="text-slate-800 font-semibold">
                        <span className="text-emerald-600 font-bold">With Altavox:</span> {study.current}
                      </div>
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{study.name}</p>
                      <p className="text-[11px] text-slate-500">{study.role}</p>
                    </div>
                    <Link
                      href="/case-studies"
                      className="text-xs font-bold text-[#f26522] hover:underline"
                    >
                      Read Case Study →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* ENGINEERING ARTICLES & TECHNICAL INSIGHTS */}
        {/* ======================================================== */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Field Notes & Architecture
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#07294d]">
                  Technical Insights & Production Notes
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Practical engineering documentation from the field on MikroTik, database design, and systems reliability.
                </p>
              </div>

              <Link
                href="/insights"
                className="text-sm font-bold text-[#f26522] hover:underline flex items-center gap-1"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {articles.map((art, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:border-[#f26522] hover:bg-white transition-colors duration-150"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold uppercase text-[#f26522]">{art.category}</span>
                      <span className="text-slate-400">{art.time}</span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#07294d] line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {art.text}
                    </p>
                  </div>

                  <Link
                    href="/insights"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#07294d] hover:text-[#f26522] transition"
                  >
                    <span>Read Full Note</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* START A PROJECT / ENTERPRISE BANNER */}
        {/* ======================================================== */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-gradient-to-br from-[#07294d] to-[#041a33] text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden"
            >
              <div className="max-w-2xl space-y-4">
                <span className="rounded-md bg-[#f26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Engage Altavox Engineering
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                  Have a Tangible Operational Problem to Solve?
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Whether you run an ISP needing automated subscriber billing, a school seeking a clean administrative SIMS, or an enterprise requiring reliable cloud infrastructure, we are ready to build.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/start-project"
                    className="rounded-xl bg-[#f26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#e05312] transition"
                  >
                    Start a Project with Altavox
                  </Link>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="tel:+255750227073"
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      <PhoneCall className="size-4 text-[#f26522]" />
                      <span>Direct Desk: +255 750 227 073 / +255 708 227 073</span>
                    </a>
                    <a
                      href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering%2C%20nahitaji%20maelezo%20kuhusu%20kuanza%20mradi."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 transition shadow-md"
                    >
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* TECHNICAL FAQS SECTION */}
        {/* ======================================================== */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Technical Inquiries
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#07294d]">
                Frequently Asked Technical Questions
              </h2>
            </motion.div>

            <div className="mt-10 space-y-4">
              {[
                {
                  q: 'How does Jaslyn Net connect to MikroTik RouterOS without dropping active connections?',
                  a: 'Jaslyn Net uses direct RouterOS API socket connections with non-blocking commands. When a subscriber completes an M-Pesa renewal, the system modifies simple queue target rates or updates address-list memberships dynamically, so existing active TCP sessions continue without interface flap.'
                },
                {
                  q: 'Can Sammena School SIMS be deployed on self-hosted servers or the cloud?',
                  a: 'Yes. Sammena is built on modern Next.js 16 and PostgreSQL, allowing deployment on dedicated local hardware or cloud environments like Nexora Cloud with automated encrypted backups and SSL.'
                },
                {
                  q: 'How does Altavox handle payment gateway webhooks for mobile money?',
                  a: 'All payment webhooks (M-Pesa, Airtel Money, Stripe) are verified with cryptographic signatures and processed idempotently with distributed lock keys to prevent double-crediting, even during mobile network callback retries.'
                },
                {
                  q: 'What is the Altavox Tech Academy?',
                  a: 'The Altavox Tech Academy is our technical skill development wing, offering 100% live instructor-led tracks in AWS Cloud Architecture, Salesforce Platform Development, Cyber Security, and QA Automation to help engineering teams and career switchers gain practical certifications.'
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-xs"
                >
                  <h4 className="text-sm font-bold text-[#07294d] flex items-center gap-2">
                    <HelpCircle className="size-4 text-[#f26522] shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="mt-2 text-xs leading-6 text-slate-600 pl-6">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-slate-600">
                Have specific architectural or integration requirements?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#07294d] px-6 py-3 text-xs font-bold text-white hover:bg-[#051c36] transition cursor-pointer"
                >
                  Contact Altavox Engineering Desk
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Altavox Tech Footer */}
      <AltavoxFooter />

      {/* Modals */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialCourse={selectedCourseForDemo}
      />

      <CurriculumModal
        isOpen={curriculumModalOpen}
        onClose={() => setCurriculumModalOpen(false)}
        course={selectedCourseForCurriculum}
      />

      <CareerAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        onSelectCourse={(slug) => {
          setAdvisorModalOpen(false)
          window.location.href = `/courses/${slug}`
        }}
      />
    </div>
  )
}
