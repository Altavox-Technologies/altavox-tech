'use client'

import Link from 'next/link'
import { Clock3, ArrowRight, BookOpen } from 'lucide-react'
import { CourseItem } from '@/lib/courses-data'

export function AltavoxCourseCard({
  course,
  onViewCurriculum,
  onBookDemo
}: {
  course: CourseItem
  onViewCurriculum?: (course: CourseItem) => void
  onBookDemo?: (courseTitle: string) => void
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#f26522] hover:shadow-xl">
      <Link href={`/courses/${course.slug}`} aria-label={`Read about ${course.title}`} className="group relative block aspect-[16/9] overflow-hidden bg-slate-100">
        <img src={course.image} alt={course.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute bottom-3 left-3 bg-[#071d34]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">{course.category}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {course.badge && <span className="border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#c94e16]">{course.badge}</span>}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Course {course.id.replace('avx-', '')}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-[#07294d] transition hover:text-[#f26522]">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{course.overview}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-100 py-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[#f26522]" /> {course.duration}</span>
          <span className="inline-flex items-center gap-2"><BookOpen className="size-4 text-[#f26522]" /> {course.modules.length} learning modules</span>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">What you will learn</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-700">
            {course.skillsCovered.slice(0, 4).map((skill) => <li key={skill} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#f26522]" />{skill}</li>)}
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="mb-4 text-xs leading-5 text-slate-500">Contact Altavox Tech to confirm fees, delivery format and available schedule.</p>
          <div className="grid grid-cols-2 gap-2">
            {onViewCurriculum ? <button type="button" onClick={() => onViewCurriculum(course)} className="border border-slate-300 px-2 py-3 text-xs font-bold text-slate-700 transition hover:border-[#07294d] hover:bg-slate-50">View syllabus</button> : <Link href={`/courses/${course.slug}`} className="border border-slate-300 px-2 py-3 text-center text-xs font-bold text-slate-700">Course details</Link>}
            {onBookDemo ? <button type="button" onClick={() => onBookDemo(course.title)} className="flex items-center justify-center gap-1 bg-[#f26522] px-2 py-3 text-xs font-bold text-white transition hover:bg-[#e05312]">Enquire <ArrowRight className="size-3.5" /></button> : <Link href={`/contact?course=${encodeURIComponent(course.shortTitle)}`} className="flex items-center justify-center gap-1 bg-[#f26522] px-2 py-3 text-xs font-bold text-white">Enquire <ArrowRight className="size-3.5" /></Link>}
          </div>
        </div>
      </div>
    </article>
  )
}
