'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle2, X, ChevronDown, ChevronUp } from 'lucide-react'
import { CourseItem } from '@/lib/courses-data'

export function CurriculumModal({
  isOpen,
  onClose,
  course
}: {
  isOpen: boolean
  onClose: () => void
  course: CourseItem | null
}) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0)

  if (!isOpen || !course) return null


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#f26522]">
              Curriculum & Project Syllabus
            </span>
            <h3 className="mt-1 text-xl font-bold truncate max-w-md">{course.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-600">
          <span>Duration: <strong>{course.duration}</strong></span>
          <span>Training hours: <strong>{course.liveHours}</strong></span>
          <span className="text-slate-500">Course outline</span>
        </div>

        {/* Modules Accordion */}
        <div className="p-6 overflow-y-auto space-y-3">
          {course.modules.map((mod, idx) => {
            const isExpanded = expandedIndex === idx
            return (
              <div
                key={mod.title}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-[#07294d]">
                      {mod.week}
                    </span>
                    <span className="font-bold text-sm text-[#07294d]">{mod.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="size-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="size-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3 text-xs">
                    <div>
                      <p className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-2">
                        Topics Covered
                      </p>
                      <ul className="space-y-1.5 text-slate-700">
                        {mod.topics.map((tp) => (
                          <li key={tp} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#f26522]" />
                            <span>{tp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-orange-200/80 bg-orange-50/60 p-3">
                      <p className="font-bold text-[#f26522] text-[11px]">
                        🛠 Hands-on Lab Project:
                      </p>
                      <p className="mt-0.5 text-slate-800">{mod.project}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Skills Badges */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="font-bold uppercase tracking-wider text-slate-500 text-[11px] mb-2">
              Core Skills & Tools Mastered
            </p>
            <div className="flex flex-wrap gap-1.5">
              {course.skillsCovered.map((sk) => (
                <span key={sk} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700 font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
