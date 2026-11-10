'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  MapPin
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { AltavoxCourseCard } from '@/components/altavox-course-card'
import { DemoModal } from '@/components/demo-modal'
import { CurriculumModal } from '@/components/curriculum-modal'
import { coursesData, courseCategories, CourseItem } from '@/lib/courses-data'

export default function CoursesPage() {
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
      [course.title, course.category, course.overview, course.difficulty, ...course.skillsCovered].some(
        (value) => value.toLowerCase().includes(query)
      )
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
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57] mb-4">
              <GraduationCap className="size-3.5" />
              <span>Altavox Academy • Uhandisi Halisi wa TEHAMA</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  Jifunze Teknolojia kwa <span className="text-[#f26522]">Kujenga Mifumo Halisi.</span>
                </h1>
                <p className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed">
                  Kozi 10 za kina za kiufundi zilizoundwa kuwajengea wahandisi, mafundi wa mitandao, na watengenezaji programu stadi za kiwango cha juu. Mafunzo ya ana kwa ana katika maabara zetu jijini Arusha na mtandaoni kwa Afrika Mashariki nzima.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#course-catalogue"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#d9531e] transition-colors"
                  >
                    Tazama Kozi Zote 10 <ArrowRight className="size-4" />
                  </a>
                  <a
                    href="https://wa.me/255750227073?text=Habari%20Altavox%20Academy%2C%20naomba%20ushauri%20wa%20kujiunga%20na%20kozi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <MessageSquare className="size-4 text-emerald-400" /> WhatsApp Admissions Desk
                  </a>
                </div>
              </div>

              {/* Quick Academy Pillars Card */}
              <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300 block">
                  KWANINI ALTAVOX ACADEMY?
                </span>
                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <Terminal className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                    <span><strong>100% Code & Hardware:</strong> Hakuna slaidi za nadharia zisizo na utekelezaji halisi wa mfumo.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Layers className="size-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Miradi ya Capstone:</strong> Kila mhitimu anakamilisha mradi thabiti unaothibitisha umahiri wake.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Maabara za Arusha:</strong> Madarasa ya jioni na wikendi eneo la Nduruma Road, Unguuni, Arusha.</span>
                  </div>
                </div>
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
                  ORODHA RASMI YA MAFUNZO
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#07294d]">Chagua Mwelekeo Wako wa Uhandisi</h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Machaguo 10 ya mafunzo yaliyoidhinishwa na maabara ya mifumo ya Altavox Tech.
                </p>
              </div>

              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <label htmlFor="course-search" className="sr-only">
                  Tafuta kozi au stadi za kiufundi
                </label>
                <input
                  id="course-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tafuta kozi, lugha (mfano: Next.js, MikroTik, Python)..."
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
              Inaonyesha <strong className="text-slate-800">{filtered.length}</strong> kati ya kozi {coursesData.length}
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
                Ondoa vichungi vyote (Reset filters)
              </button>
            )}
            <span className="hidden sm:inline">
              Mazingira ya maabara, miradi ya capstone na ushauri wa kazi
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
                Hakuna kozi inayolingana na neno uliloweka
              </h3>
              <p className="mt-1 text-xs text-slate-500">Jaribu neno lingine au chagua kundi lingine la masomo.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Courses')
                  setSearchQuery('')
                }}
                className="mt-5 rounded-lg bg-[#07294d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#051c36]"
              >
                Ondoa vichungi
              </button>
            </div>
          )}
        </section>

        {/* Pedagogy & Methodology Section */}
        <section className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f26522]">
                MFUMO WA MAFUNZO
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                Jinsi Altavox Academy Inavyowajenga Wahandisi
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Tunaamini uwezo wa mhandisi hauthibitishwi na majaribio ya maswali ya kuchagua bali na uwezo wa kusanidi seva, kuunganisha hifadhidata bila makosa, na kuendesha mifumo bila kukatika.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522]/10 text-[#f26522]">
                  <Code2 className="size-5" />
                </div>
                <h4 className="mt-4 font-bold text-base text-[#07294d]">1. Code & Commands Halisi</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Kila darasa linahusisha kuandika msimbo (code), kusanidi amri za Linux/RouterOS, na kufanya majaribio ya utendaji papo hapo.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Network className="size-5" />
                </div>
                <h4 className="mt-4 font-bold text-base text-[#07294d]">2. Maabara ya Miundombinu</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Wanafunzi wanapata fursa ya kufanya kazi na ruta halisi za MikroTik, vituo vya seva za PostgreSQL, na mazingira ya cloud.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="mt-4 font-bold text-base text-[#07294d]">3. Utetezi wa Mradi (Defense)</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Mhitimu lazima atetee mradi wake mkuu mbele ya jopo la wahandisi wakuu wa Altavox kabla ya kutunukiwa cheti cha umahiri.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Sparkles className="size-5" />
                </div>
                <h4 className="mt-4 font-bold text-base text-[#07294d]">4. Upatikanaji wa Kazi</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Tunawaunganisha wahitimu bora na miradi yetu ya ndani na mtandao wa makampuni ya ISP, shule na taasisi za kibiashara.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate & Institutional Training CTA */}
        <section className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                MAFUNZO KWA MAKAMPUNI NA VYUO (CORPORATE TRAINING)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Je, Unahitaji Kujenga Uwezo wa Timu Yako ya TEHAMA?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tunatoa programu maalum za mafunzo ya ndani ya shirika (on-site & remote) kwa ajili ya ISPs, benki, vyuo, na idara za serikali.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/corporate"
                className="rounded-xl bg-[#f26522] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#d9531e] transition-colors"
              >
                Mafunzo ya Mashirika
              </Link>
              <a
                href="https://wa.me/255750227073?text=Habari%20Altavox%20Tech%2C%20tunahitaji%20mafunzo%20ya%20wafanyakazi%20wa%20idara%20yetu"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="size-4 text-emerald-400" /> WhatsApp Direct Desk
              </a>
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
