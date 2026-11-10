'use client'

import { useState } from 'react'
import { Search, BookOpen, ArrowRight, Code2, ShieldCheck, Network } from 'lucide-react'
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
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query || [course.title, course.category, course.overview, ...course.skillsCovered].some((value) => value.toLowerCase().includes(query))
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
        <section className="relative overflow-hidden bg-[#071d34] text-white">
          <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',backgroundSize:'40px 40px'}} />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-orange-400">Altavox Academy · Technology Engineering & Professional Skills</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Learn technology by building things that work.</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">Explore ten practical learning paths spanning software, cloud infrastructure, ISP networking, cybersecurity, databases, applied AI, education systems, FinTech, product design and IT support. Each course includes a clear overview, learning outcomes and project-focused syllabus.</p>
                <a href="#course-catalogue" className="mt-7 inline-flex min-h-11 items-center gap-2 bg-[#f26522] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d95113]">Explore all 10 courses <ArrowRight className="size-4" /></a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{icon:Code2,label:'Build software'},{icon:Network,label:'Run infrastructure'},{icon:ShieldCheck,label:'Secure systems'}].map(({icon:Icon,label})=><div key={label} className="border border-white/15 bg-white/5 p-4"><Icon className="size-5 text-orange-400"/><p className="mt-3 text-xs font-semibold leading-5 text-slate-200">{label}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div id="course-catalogue" className="border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f26522]">Course catalogue</p>
                <h2 className="mt-1 text-xl font-semibold text-[#071d34]">Find your learning path</h2>
                <p className="mt-1 text-xs text-slate-500">Ten specialist pathways. Clear course information. Practical learning outcomes.</p>
              </div>
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <label htmlFor="course-search" className="sr-only">Search courses, topics or skills</label>
                <input id="course-search" type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search courses, topics or skills..." aria-controls="course-results" className="w-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-[#f26522] focus-visible:ring-offset-2" />
              </div>
            </div>
            <div className="mt-5 flex gap-2 overflow-x-auto border-t border-slate-100 pt-4 pb-1">
              {courseCategories.map((cat) => {
                const count = cat === 'All Courses' ? coursesData.length : coursesData.filter((course) => course.category === cat).length
                return <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} aria-pressed={selectedCategory === cat} className={`shrink-0 border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26522] focus-visible:ring-offset-2 ${selectedCategory === cat ? 'border-[#071d34] bg-[#071d34] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'}`}>{cat} <span className={selectedCategory === cat ? 'ml-1 text-orange-300' : 'ml-1 text-slate-400'}>{count}</span></button>
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500" aria-live="polite">
            <span>Showing <strong className="text-slate-800">{filtered.length}</strong> of {coursesData.length} courses</span>
            {(searchQuery || selectedCategory !== 'All Courses') && <button type="button" onClick={() => { setSelectedCategory('All Courses'); setSearchQuery('') }} className="font-bold text-[#c94e16] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26522]">Clear search and filters</button>}
            <span className="hidden sm:inline">Course images, descriptions, skills and module outlines</span>
          </div>

          <div id="course-results" className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => <AltavoxCourseCard key={course.id} course={course} onViewCurriculum={handleOpenCurriculum} onBookDemo={handleOpenDemo} />)}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 border border-dashed border-slate-300 bg-white p-12 text-center">
              <BookOpen className="mx-auto size-12 text-slate-300" />
              <h3 className="mt-4 text-base font-bold text-slate-800">No matching courses found</h3>
              <p className="mt-1 text-xs text-slate-500">Try another keyword or category.</p>
              <button onClick={() => { setSelectedCategory('All Courses'); setSearchQuery('') }} className="mt-5 bg-[#07294d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#051c36]">Reset filters</button>
            </div>
          )}
        </section>
      </main>
      <AltavoxFooter />
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} initialCourse={selectedCourseForDemo} />
      <CurriculumModal isOpen={curriculumModalOpen} onClose={() => setCurriculumModalOpen(false)} course={selectedCourseForCurriculum} />
    </div>
  )
}
