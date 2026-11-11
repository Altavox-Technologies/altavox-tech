'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  Search,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Layers,
  Network,
  Server,
  Terminal,
  Activity,
  Zap,
  Wifi,
  Cloud,
  Brain,
  Code2,
  ShoppingBag,
  FlaskConical,
  LifeBuoy,
  Building2,
  Globe,
  Coins
} from 'lucide-react'
import { coursesData, courseCategories } from '@/lib/courses-data'
import { DemoModal } from '@/components/demo-modal'
import { CareerAdvisorModal } from '@/components/career-advisor-modal'
import { QuickContactWidget } from '@/components/quick-contact-widget'

export function AltavoxHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false)
  const [ecosystemDropdownOpen, setEcosystemDropdownOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'TZS'>('USD')
  const [selectedLang, setSelectedLang] = useState<'EN' | 'SW'>('EN')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  // Filter courses & solutions for instant search
  const filteredCourses = coursesData.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <>
      {/* 1. Top Utility Strip */}
      <div className="bg-[#07294d] text-slate-200 text-[11px] font-medium border-b border-white/10">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <a
                href="tel:+255750227073"
                className="flex items-center gap-1.5 hover:text-[#f26522] transition font-bold"
                title="Direct Desk 1"
              >
                <Phone className="size-3 text-[#f26522]" />
                <span>Direct Desk: +255 750 227 073</span>
              </a>
              <span className="text-white/30 hidden md:inline">/</span>
              <a
                href="tel:+255708227073"
                className="hidden md:inline hover:text-[#f26522] transition font-semibold"
                title="Direct Desk 2"
              >
                <span>+255 708 227 073</span>
              </a>
            </div>
            <a
              href="mailto:engineering@altavox.space"
              className="hidden lg:flex items-center gap-1.5 hover:text-[#f26522] transition"
            >
              <Mail className="size-3 text-[#f26522]" />
              <span>engineering@altavox.space</span>
            </a>
            <div className="hidden xl:flex items-center gap-2 text-slate-300">
              <span className="font-mono text-[10px] text-orange-400">HQ:</span>
              <span>Dar es Salaam, Tanzania</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Rapid Division Links */}
            <div className="hidden xl:flex items-center gap-3 text-slate-300 font-mono text-[10px]">
              <Link href="/os" className="text-amber-400 font-bold hover:text-white transition">OS 3.0</Link>
              <span>·</span>
              <Link href="/cloud" className="hover:text-sky-300 transition">Cloud</Link>
              <span>·</span>
              <Link href="/ai" className="hover:text-purple-300 transition">AI</Link>
              <span>·</span>
              <Link href="/developers" className="hover:text-emerald-300 transition">Developers</Link>
              <span>·</span>
              <Link href="/status" className="hover:text-emerald-400 transition">Status</Link>
              <span>·</span>
              <Link href="/portal" className="hover:text-amber-300 transition">Client Portal</Link>
            </div>

            {/* Currency Selector Badge */}
            <div className="hidden md:flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono">
              <Coins className="size-2.5 text-amber-300" />
              <button
                type="button"
                onClick={() => setSelectedCurrency(selectedCurrency === 'USD' ? 'TZS' : 'USD')}
                className="hover:text-white transition font-bold"
                title="Toggle Display Currency (Validated on Server)"
              >
                {selectedCurrency === 'USD' ? 'USD ($)' : 'TZS (Sh)'}
              </button>
            </div>

            {/* Language Selector Badge */}
            <div className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono">
              <Globe className="size-2.5 text-sky-300" />
              <button
                type="button"
                onClick={() => setSelectedLang(selectedLang === 'EN' ? 'SW' : 'EN')}
                className="hover:text-white transition font-bold"
                title="Toggle Platform Language (English / Kiswahili)"
              >
                {selectedLang === 'EN' ? 'EN' : 'SW'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setAdvisorModalOpen(true)}
              className="inline-flex items-center gap-1 font-bold text-[#f26522] hover:text-white transition"
            >
              <Sparkles className="size-3" />
              <span>AI Advisor</span>
            </button>
            <Link
              href="/wifi"
              className="rounded bg-[#f26522] px-2.5 py-0.5 text-white hover:bg-[#e05312] transition flex items-center gap-1 font-bold text-[11px]"
            >
              <Wifi className="size-2.5" />
              <span>Altavox WiFi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Authentic Altavox Tech Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group py-1" aria-label="Altavox Tech Home">
            <Image
              src="/capricorn_emblem_clean_black.svg"
              alt="Altavox Tech Capricorn emblem"
              width={52}
              height={60}
              className="h-12 w-11 object-contain transition group-hover:opacity-90"
              priority
              referrerPolicy="no-referrer"
            />
            <span className="text-base sm:text-lg font-extrabold tracking-[0.12em] text-[#07294d] whitespace-nowrap">
              ALTAVOX <span className="text-[#f26522]">TECH</span>
            </span>
          </Link>

          {/* All Solutions & Systems Mega Button */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
              className="flex items-center gap-2 rounded-xl bg-[#07294d] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#051c36] transition shadow-sm"
            >
              <Layers className="size-4 text-[#f26522]" />
              <span>Explore Academy Courses</span>
              <ChevronDown className={`size-3.5 transition-transform ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Solutions Dropdown Menu */}
            {solutionsDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-84 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <div className="p-2 border-b border-slate-100 pb-2 mb-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Altavox Academy Pathways (10 Tracks)
                  </p>
                </div>
                <div className="space-y-1">
                  <Link
                    href="/courses/full-stack-web-development"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition group"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-[#f26522] group-hover:bg-[#f26522] group-hover:text-white transition shrink-0 mt-0.5">
                      <Layers className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#07294d] group-hover:text-[#f26522] transition">
                        Full-Stack Web Development
                      </p>
                      <p className="text-[11px] text-slate-500">React, Next.js, TypeScript & PostgreSQL</p>
                    </div>
                  </Link>

                  <Link
                    href="/courses/cloud-infrastructure-devops"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition group"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-[#07294d] group-hover:bg-[#07294d] group-hover:text-white transition shrink-0 mt-0.5">
                      <Server className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#07294d] group-hover:text-[#f26522] transition">
                        Cloud Infrastructure & DevOps
                      </p>
                      <p className="text-[11px] text-slate-500">Linux, Docker, CI/CD pipelines & production ops</p>
                    </div>
                  </Link>

                  <Link
                    href="/courses/isp-management-network-engineering"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition group"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition shrink-0 mt-0.5">
                      <Network className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#07294d] group-hover:text-[#f26522] transition">
                        ISP Management & Network Engineering
                      </p>
                      <p className="text-[11px] text-slate-500">MikroTik RouterOS, RADIUS, AAA & hotspot billing</p>
                    </div>
                  </Link>

                  <Link
                    href="/courses/cybersecurity-secure-software"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex items-start gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition group"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-700 group-hover:text-white transition shrink-0 mt-0.5">
                      <ShieldCheck className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#07294d] group-hover:text-[#f26522] transition">
                        Cybersecurity & Secure Software
                      </p>
                      <p className="text-[11px] text-slate-500">Defensive security, OWASP mitigation & SSDLC</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center px-2">
                  <Link
                    href="/courses"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="text-[11px] font-bold text-[#f26522] hover:underline"
                  >
                    View all 10 courses →
                  </Link>
                  <Link
                    href="/projects"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="text-[11px] font-bold text-[#f26522] hover:underline"
                  >
                    Featured projects →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Search Bar with Instant Autocomplete */}
          <div className="relative flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSearchOpen(e.target.value.length > 0)
                }}
                onFocus={() => {
                  if (searchQuery.length > 0) setSearchOpen(true)
                }}
                aria-label="Search Altavox systems and courses"
                placeholder="Search systems, ISP billing, MikroTik, SIMS, Cloud..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#f26522] focus:bg-white focus:outline-none transition shadow-inner"
              />
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearchOpen(false)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown Results */}
            {searchOpen && searchQuery && (
              <div
                className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in"
                onMouseLeave={() => setSearchOpen(false)}
              >
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-500">Matching Systems & Tracks</span>
                  <span className="text-[#f26522] font-mono">{filteredCourses.length} results</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 pt-1">
                  {filteredCourses.slice(0, 5).map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-lg p-2 hover:bg-slate-50 transition"
                    >
                      <p className="text-xs font-bold text-[#07294d] truncate">{course.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-mono text-[#f26522]">{course.category}</span>
                        <span>·</span>
                        <span>{course.duration}</span>
                      </div>
                    </Link>
                  ))}
                  {filteredCourses.length === 0 && (
                    <p className="p-4 text-center text-xs text-slate-400">No matching systems found.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700">
            {/* Ecosystem Divisions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setEcosystemDropdownOpen(!ecosystemDropdownOpen)}
                className="flex items-center gap-1.5 font-bold text-[#07294d] hover:text-[#f26522] transition py-1"
              >
                <span>Ecosystem</span>
                <ChevronDown className={`size-3 transition-transform ${ecosystemDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {ecosystemDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setEcosystemDropdownOpen(false)}
                >
                  <div className="p-2 border-b border-slate-100 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Connected Business Divisions
                  </div>
                  <div className="space-y-1 pt-1 text-xs">
                    <Link
                      href="/os"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 bg-amber-50/70 hover:bg-amber-100/60 transition text-slate-900"
                    >
                      <Zap className="size-4 text-amber-600 shrink-0" />
                      <div>
                        <p className="font-bold flex items-center gap-1.5">
                          Altavox OS 3.0
                          <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-mono font-normal">Enterprise</span>
                        </p>
                        <p className="text-[10px] text-slate-500">ERP, CRM, Flow & ProductOps</p>
                      </div>
                    </Link>
                    <Link
                      href="/cloud"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <Cloud className="size-4 text-sky-500 shrink-0" />
                      <div>
                        <p className="font-bold">Altavox Cloud</p>
                        <p className="text-[10px] text-slate-400">Edge POPs & carrier infra</p>
                      </div>
                    </Link>
                    <Link
                      href="/ai"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <Brain className="size-4 text-purple-500 shrink-0" />
                      <div>
                        <p className="font-bold">Altavox AI</p>
                        <p className="text-[10px] text-slate-400">Systems intelligence engine</p>
                      </div>
                    </Link>
                    <Link
                      href="/developers"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <Code2 className="size-4 text-emerald-500 shrink-0" />
                      <div>
                        <p className="font-bold">Altavox Developers</p>
                        <p className="text-[10px] text-slate-400">APIs, webhooks & SDKs</p>
                      </div>
                    </Link>
                    <Link
                      href="/marketplace"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <ShoppingBag className="size-4 text-[#f26522] shrink-0" />
                      <div>
                        <p className="font-bold">Marketplace</p>
                        <p className="text-[10px] text-slate-400">Code templates & manuals</p>
                      </div>
                    </Link>
                    <Link
                      href="/portal"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <Building2 className="size-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="font-bold">Customer Portal</p>
                        <p className="text-[10px] text-slate-400">Organization & invoices</p>
                      </div>
                    </Link>
                    <Link
                      href="/trust"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <ShieldCheck className="size-4 text-teal-600 shrink-0" />
                      <div>
                        <p className="font-bold">Trust & Governance</p>
                        <p className="text-[10px] text-slate-400">Subprocessors & DSR requests</p>
                      </div>
                    </Link>
                    <Link
                      href="/status"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <Activity className="size-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold flex items-center gap-1.5">
                          System Status
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </p>
                        <p className="text-[10px] text-slate-400">Live POPs & 99.98% SLA</p>
                      </div>
                    </Link>
                    <Link
                      href="/support"
                      onClick={() => setEcosystemDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition text-slate-700 hover:text-[#07294d]"
                    >
                      <LifeBuoy className="size-4 text-amber-500 shrink-0" />
                      <div>
                        <p className="font-bold">Connect & Support</p>
                        <p className="text-[10px] text-slate-400">Support tickets & SLA desk</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/projects" className="hover:text-[#f26522] transition">
              Projects
            </Link>
            <Link href="/discovery" className="hover:text-[#f26522] transition font-semibold text-[#9a6b12]">
              Discovery Hub
            </Link>
            <Link href="/academy" className="hover:text-[#f26522] transition font-bold text-[#07294d]">
              Academy (20 Tracks)
            </Link>
            <Link href="/services" className="hover:text-[#f26522] transition">
              Services
            </Link>
            <Link href="/marketplace" className="hover:text-[#f26522] transition">
              Marketplace
            </Link>
            <Link href="/partners" className="hover:text-[#f26522] transition">
              Partners
            </Link>
            <Link href="/about" className="hover:text-[#f26522] transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#f26522] transition">
              Contact
            </Link>
          </nav>

          {/* Right Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/10 hover:bg-[#e05312] transition"
            >
              <span>Book Tech Demo</span>
              <ArrowRight className="size-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 transition"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="altavox-mobile-navigation"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

        </div>

        {/* Mobile navigation closes on backdrop taps and normal navigation actions. */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[60] bg-[#061a30]/55 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Navigation overlay"
          >
            <section
              id="altavox-mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              className="absolute inset-x-0 top-0 max-h-[min(88dvh,760px)] overflow-y-auto overscroll-contain rounded-b-3xl border-t border-slate-200 bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-top duration-200"
              onClick={(event) => { if (event.target === event.currentTarget) setMobileMenuOpen(false) }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f26522]">ALTAVOX TECH</p>
                  <p className="mt-1 text-lg font-extrabold text-[#07294d]">Explore our platform</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
                  aria-label="Close navigation menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search systems and courses..."
                  aria-label="Search systems and courses"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#f26522] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>

              {searchQuery.trim() && (
                <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-2">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Matching courses ({filteredCourses.length})
                  </p>
                  {filteredCourses.slice(0, 5).map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#07294d] hover:bg-white"
                    >
                      {course.title}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{course.category}</span>
                    </Link>
                  ))}
                  {filteredCourses.length === 0 && (
                    <p className="px-3 py-3 text-sm text-slate-500">No matching courses found.</p>
                  )}
                </div>
              )}

              <nav aria-label="Mobile main navigation" className="mt-4 grid grid-cols-1 gap-1 text-sm font-semibold text-slate-800">
                {[
                  { href: '/cloud', label: 'Altavox Cloud', detail: 'Edge POPs, deployments & telemetry' },
                  { href: '/ai', label: 'Altavox AI Platform', detail: 'Systems intelligence & RFC analysis' },
                  { href: '/developers', label: 'Altavox Developers', detail: 'REST APIs, webhooks & SDKs' },
                  { href: '/marketplace', label: 'Digital Marketplace', detail: 'Code templates, blueprints & books' },
                  { href: '/portal', label: 'Client & Business Portal', detail: 'Tenant organization & billing' },
                  { href: '/support', label: 'Connect & Support Desk', detail: 'Incident tickets & SLA assistance' },
                  { href: '/academy', label: 'Altavox Academy (20 Tracks)', detail: 'Technical education & LMS' },
                  { href: '/projects', label: 'Production Projects', detail: 'Jaslyn Net, Sammena & Mrisho Art' },
                  { href: '/discovery', label: 'Discovery & Knowledge Hub', detail: 'Codex, Enigma, Research Lab, Archive, Atlas & Security' },
                  { href: '/partners', label: 'Strategic Partnerships', detail: 'Carrier & institutional frameworks' },
                  { href: '/labs', label: 'Altavox Labs', detail: 'Experimental R&D & protocols' },
                  { href: '/wifi', label: 'Altavox WiFi Hotspots', detail: 'Carrier billing & vouchers' },
                  { href: '/services', label: 'Engineering Services', detail: 'Software and infrastructure' },
                  { href: '/about', label: 'About Altavox', detail: 'Company, leadership & principles' },
                  { href: '/contact', label: 'Contact & Inquiries', detail: 'Executive engineering desk' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3 transition hover:border-slate-100 hover:bg-slate-50"
                  >
                    <span>
                      <span className="block text-sm font-bold text-[#07294d]">{item.label}</span>
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{item.detail}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#f26522]" />
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setDemoModalOpen(true)
                  }}
                  className="w-full rounded-xl bg-[#f26522] py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#e05312]"
                >
                  Book Technical Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setAdvisorModalOpen(true)
                  }}
                  className="w-full rounded-xl bg-[#07294d] py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#051c36]"
                >
                  AI Systems Advisor
                </button>
              </div>
              <p className="mt-4 text-center text-[11px] text-slate-400">Tap outside this panel or press Esc to close.</p>
            </section>
          </div>
        )}
      </header>

      {/* Modals */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <CareerAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        onSelectCourse={(slug) => {
          setAdvisorModalOpen(false)
          window.location.href = `/courses/${slug}`
        }}
      />

      {/* Floating Direct Desk & WhatsApp Widget */}
      <QuickContactWidget />
    </>
  )
}
