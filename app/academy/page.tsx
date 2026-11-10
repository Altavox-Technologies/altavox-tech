'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  BookOpen,
  ArrowRight,
  Code2,
  ShieldCheck,
  Network,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  GraduationCap,
  Terminal,
  MapPin,
  CreditCard,
  Award,
  UserCheck
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { AltavoxCourseCard } from '@/components/altavox-course-card'
import { DemoModal } from '@/components/demo-modal'
import { CurriculumModal } from '@/components/curriculum-modal'
import { coursesData, courseCategories, CourseItem } from '@/lib/courses-data'

export default function AcademyMainPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Courses')
  const [searchQuery, setSearchQuery] = useState('')
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [selectedCourseForDemo, setSelectedCourseForDemo] = useState<string>('')
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false)
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState<CourseItem | null>(null)

  const filtered = coursesData.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All Courses' || course.category === selectedCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !query ||
      [
        course.title,
        course.category,
        course.overview,
        course.difficulty,
        ...course.skillsCovered
      ].some((value) => value.toLowerCase().includes(query))
    return matchesCategory && matchesSearch
  })

  function handleOpenDemo(courseTitle?: string) {
    if (courseTitle) setSelectedCourseForDemo(courseTitle)
    setDemoModalOpen(true)
  }

  function handleOpenCurriculum(course: CourseItem) {
    setSelectedCourseForCurriculum(course)
    setCurriculumModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Academy Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-20 border-b border-white/10">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57]">
                <GraduationCap className="size-3.5" />
                <span>Altavox Academy • International Technology Learning Platform</span>
              </div>

              {/* Student Portal Quick Links */}
              <div className="flex items-center gap-2">
                <Link
                  href="/academy/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition"
                >
                  <UserCheck className="size-3.5 text-[#f26522]" /> Student Dashboard
                </Link>
                <Link
                  href="/academy/verify/AVX-CERT-2026-001"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold text-sky-200 transition"
                >
                  <Award className="size-3.5 text-amber-400" /> Verify Certificate
                </Link>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  Practical Technology Education. <span className="text-[#f26522]">Built for Real Engineers.</span>
                </h1>
                <p className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed">
                  Explore exactly 20 specialist engineering pathways across software engineering, cloud architecture, ISP networking, cybersecurity, applied AI, healthtech, agritech, and fintech. Hands-on capstones, PayPal checkout, and authenticated student progress.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#course-catalogue"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#d9531e] transition-colors"
                  >
                    Explore All 20 Courses <ArrowRight className="size-4" />
                  </a>
                  <Link
                    href="/academy/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <UserCheck className="size-4 text-emerald-400" /> Go to Learning Dashboard
                  </Link>
                  <a
                    href="https://wa.me/255750227073?text=Habari%20Altavox%20Academy%2C%20naomba%20ushauri%20wa%20kujiunga%20na%20kozi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    <MessageSquare className="size-4 text-emerald-400" /> Admissions Desk
                  </a>
                </div>
              </div>

              {/* Academy Key Metrics */}
              <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300 block">
                  ACADEMY FOUNDATION METRICS
                </span>
                <div className="grid grid-cols-2 gap-3 text-white">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="block text-2xl font-mono font-extrabold text-[#f26522]">20</span>
                    <span className="text-[11px] text-slate-300">Specialist Pathways</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="block text-2xl font-mono font-extrabold text-emerald-400">100%</span>
                    <span className="text-[11px] text-slate-300">Capstone Driven</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="block text-2xl font-mono font-extrabold text-sky-400">PayPal</span>
                    <span className="text-[11px] text-slate-300">Instant Enrollment</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="block text-2xl font-mono font-extrabold text-amber-300">Verified</span>
                    <span className="text-[11px] text-slate-300">Certificates</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Headquartered at Nduruma Road, Unguuni, Arusha with regional physical laboratories and global remote access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Catalogue Section */}
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div id="course-catalogue" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  OFFICIAL COURSE CATALOGUE
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#07294d]">Choose Your Engineering Pathway</h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Exactly 20 verified courses with complete syllabus outlines, practical capstones, and PayPal enrollment.
                </p>
              </div>

              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <label htmlFor="course-search" className="sr-only">
                  Search courses or technical skills
                </label>
                <input
                  id="course-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, skills (e.g. Next.js, IoT, PayPal, Python)..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 flex gap-2 overflow-x-auto border-t border-slate-100 pt-4 pb-2">
              {courseCategories.map((cat) => {
                const count =
                  cat === 'All Courses'
                    ? coursesData.length
                    : coursesData.filter((c) => c.category === cat).length
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#07294d] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat} <span className={isActive ? 'text-orange-300' : 'text-slate-400'}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Result Count and Reset */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800">{filtered.length}</strong> of {coursesData.length} courses
            </span>
            {(searchQuery || selectedCategory !== 'All Courses') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Courses')
                  setSearchQuery('')
                }}
                className="font-bold text-[#f26522] hover:underline"
              >
                Clear search and filters
              </button>
            )}
            <span className="hidden sm:inline">
              Every course includes hands-on labs, instructor review, and verified completion certificates
            </span>
          </div>

          {/* Courses Grid */}
          <div className="mt-6 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <AltavoxCourseCard
                key={course.id}
                course={course}
                onViewCurriculum={handleOpenCurriculum}
                onBookDemo={handleOpenDemo}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <BookOpen className="mx-auto size-12 text-slate-300" />
              <h3 className="mt-4 text-base font-bold text-slate-800">
                No matching courses found
              </h3>
              <p className="mt-1 text-xs text-slate-500">Try another keyword or category filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Courses')
                  setSearchQuery('')
                }}
                className="mt-5 rounded-lg bg-[#07294d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#051c36]"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* Learning Management System (LMS) Feature Highlight */}
        <section className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  LMS & STUDENT EXPERIENCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                  Integrated Student Dashboard & Progress Tracking
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enrolling in an Altavox Academy course unlocks your personalized Student Dashboard where you can follow structured lessons, execute live lab assignments, download verified resources, and track completion progress.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Real-time lesson completion checkpoints</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>PayPal Business & mobile money checkout</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tamper-evident certificate verification</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct WhatsApp & mentor communication</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href="/academy/dashboard"
                    className="rounded-xl bg-[#07294d] px-5 py-3 text-xs font-bold text-white hover:bg-[#0b3866] transition"
                  >
                    Open Student Dashboard
                  </Link>
                  <Link
                    href="/academy/verify/AVX-CERT-2026-001"
                    className="rounded-xl border border-slate-300 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Sample Certificate
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#07294d] p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold">CERTIFICATE STANDARDS</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    AUTHENTICATED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Altavox certificates are never issued merely for payment. Every student must complete all core lessons, submit their practical capstone code repository, and pass defense verification.
                </p>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 space-y-1.5 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>Issuing Body:</span>
                    <strong className="text-white">Altavox Technologies</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Accreditation:</span>
                    <strong className="text-white">Systems Engineering Lab</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Public Verification:</span>
                    <strong className="text-amber-300">altavox.space/academy/verify</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
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
    </div>
  )
}
