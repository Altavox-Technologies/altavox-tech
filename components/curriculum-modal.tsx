'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, CheckCircle2, X, ChevronDown, ChevronUp, Layers, Target, ArrowRight } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState<'modules' | 'capstones' | 'objectives'>('modules')

  if (!isOpen || !course) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#f26522] font-bold">
                {course.category}
              </span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                {course.difficulty}
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold truncate max-w-md">{course.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 text-xs font-bold text-slate-600 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`border-b-2 py-3 px-3 transition-colors ${
              activeTab === 'modules'
                ? 'border-[#f26522] text-[#07294d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Moduli za Masomo ({course.modules.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('capstones')}
            className={`border-b-2 py-3 px-3 transition-colors ${
              activeTab === 'capstones'
                ? 'border-[#f26522] text-[#07294d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Miradi ya Capstone ({course.practicalProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('objectives')}
            className={`border-b-2 py-3 px-3 transition-colors ${
              activeTab === 'objectives'
                ? 'border-[#f26522] text-[#07294d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Malengo ya Uhandisi
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* TAB 1: MODULES */}
          {activeTab === 'modules' && (
            <div className="space-y-3">
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedIndex === idx
                return (
                  <div
                    key={mod.title}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden transition shadow-2xs"
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
                          <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
                            Mada Zinazofundishwa (Topics Covered):
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

                        <div className="rounded-lg border border-orange-200/80 bg-orange-50/70 p-3">
                          <p className="font-bold text-[#c94e16] text-[10px] uppercase tracking-wider">
                            Kazi ya Maabara (Practical Lab Project):
                          </p>
                          <p className="mt-0.5 text-slate-800 text-xs font-medium">{mod.project}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* TAB 2: CAPSTONES */}
          {activeTab === 'capstones' && (
            <div className="space-y-4">
              {course.practicalProjects.map((proj, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#f26522] uppercase tracking-wider">
                      Capstone 0{idx + 1}
                    </span>
                    <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                      Production Deliverable
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#07294d]">{proj.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200 text-xs">
                    <strong className="text-slate-700">Matokeo:</strong> {proj.deliverable}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: OBJECTIVES */}
          {activeTab === 'objectives' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Baada ya kukamilisha kozi hii, utakuwa na uwezo wa kiutendaji katika maeneo yafuatayo:
              </p>
              {course.learningObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]" />
                  <span className="leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          )}

          {/* Skills Badges Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Stadi Zinazojengwa (Skills Acquired):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {course.skillsCovered.map((sk) => (
                <span key={sk} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-700 font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3.5 shrink-0">
          <Link
            href={`/courses/${course.slug}`}
            onClick={onClose}
            className="text-xs font-bold text-[#f26522] hover:underline inline-flex items-center gap-1"
          >
            Fungua ukurasa kamili wa kozi <ArrowRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Funga
          </button>
        </div>
      </div>
    </div>
  )
}
