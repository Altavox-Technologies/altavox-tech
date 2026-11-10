'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock3, ArrowRight, BookOpen, Layers, Target, ShieldCheck } from 'lucide-react'
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
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#f26522] hover:shadow-xl group">
      <Link
        href={`/courses/${course.slug}`}
        aria-label={`Read about ${course.title}`}
        className="relative block aspect-[16/9] overflow-hidden bg-slate-900"
      >
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
        <span className="absolute bottom-3 left-3 bg-[#071d34]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded">
          {course.category}
        </span>
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
          Course {course.id.replace('avx-', '')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {course.badge && (
            <span className="rounded border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold text-[#c94e16]">
              {course.badge}
            </span>
          )}
          <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
            {course.difficulty}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-[#07294d] transition group-hover:text-[#f26522]">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
          {course.overview}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-2.5 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <BookOpen className="size-3.5 text-[#f26522]" /> {course.modules.length} modules
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Layers className="size-3.5 text-sky-600" /> {course.practicalProjects.length} practical projects
          </span>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Skills acquired
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {course.skillsCovered.slice(0, 3).map((skill) => (
              <li key={skill} className="flex items-start gap-2 truncate">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#f26522]" />
                <span className="truncate">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-5">
          <div className="grid grid-cols-2 gap-2">
            {onViewCurriculum ? (
              <button
                type="button"
                onClick={() => onViewCurriculum(course)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-center text-xs font-bold text-slate-700 transition hover:border-[#07294d] hover:bg-slate-50"
              >
                View syllabus
              </button>
            ) : (
              <Link
                href={`/courses/${course.slug}`}
                className="rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Course details
              </Link>
            )}

            {onBookDemo ? (
              <button
                type="button"
                onClick={() => onBookDemo(course.title)}
                className="flex items-center justify-center gap-1 rounded-lg bg-[#f26522] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#e05312]"
              >
                Enquire <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <Link
                href={`/contact?course=${encodeURIComponent(course.shortTitle)}`}
                className="flex items-center justify-center gap-1 rounded-lg bg-[#f26522] px-2 py-2.5 text-xs font-bold text-white hover:bg-[#e05312]"
              >
                Enquire <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
