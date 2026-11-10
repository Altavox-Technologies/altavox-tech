'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  Terminal,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Copy,
  Check
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData, CourseItem } from '@/lib/courses-data'

export default function LessonClassroomPage() {
  const params = useParams<{ slug: string; lessonId: string }>()
  const router = useRouter()
  const slug = params.slug
  const currentLessonId = params.lessonId

  const course = coursesData.find((c) => c.slug === slug)
  const [completedList, setCompletedList] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    if (!slug) return
    const allSaved = JSON.parse(localStorage.getItem('altavox_completed_lessons') || '{}')
    const listForThisCourse = allSaved[slug] || []
    setCompletedList(listForThisCourse)
  }, [slug])

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 p-12 text-center">
        <h2 className="text-xl font-bold text-[#07294d]">Course Not Found</h2>
        <Link href="/academy" className="mt-4 text-xs font-bold text-[#f26522] underline">
          Return to Academy
        </Link>
      </div>
    )
  }

  // Gather all lessons flattened
  const allLessons: Array<{ id: string; title: string; moduleTitle: string; week: string; project: string }> = []
  course.modules.forEach((mod) => {
    if (mod.lessons) {
      mod.lessons.forEach((l) => {
        allLessons.push({
          id: l.id,
          title: l.title,
          moduleTitle: mod.title,
          week: mod.week,
          project: mod.project
        })
      })
    } else {
      mod.topics.forEach((t, i) => {
        allLessons.push({
          id: `lesson-${mod.week.replace(/\D/g, '')}-${i + 1}`,
          title: t,
          moduleTitle: mod.title,
          week: mod.week,
          project: mod.project
        })
      })
    }
  })

  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  const activeLesson = allLessons[currentLessonIndex] || allLessons[0]
  const isCurrentCompleted = completedList.includes(activeLesson.id)

  const handleToggleComplete = () => {
    let nextList = [...completedList]
    if (isCurrentCompleted) {
      nextList = nextList.filter((id) => id !== activeLesson.id)
    } else {
      nextList.push(activeLesson.id)
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 2000)
    }
    setCompletedList(nextList)

    const allSaved = JSON.parse(localStorage.getItem('altavox_completed_lessons') || '{}')
    allSaved[course.slug] = nextList
    localStorage.setItem('altavox_completed_lessons', JSON.stringify(allSaved))
  }

  const nextLesson = allLessons[currentLessonIndex + 1]
  const prevLesson = allLessons[currentLessonIndex - 1]

  const totalCompletedCount = completedList.length
  const progressPercent = Math.min(100, Math.round((totalCompletedCount / allLessons.length) * 100))
  const isAllComplete = progressPercent === 100

  const sampleSnippet = `// Production Implementation: ${activeLesson.title}
// Altavox Technologies Engineering Standard

export async function executeServiceWorkflow(req: Request) {
  const payload = await req.json();
  
  // 1. Verify cryptographic HMAC signature
  const verified = await verifySignature(payload, process.env.SECRET_KEY);
  if (!verified) throw new Error("Security signature mismatch");

  // 2. Execute idempotent state transition in PostgreSQL
  const result = await db.transaction(async (tx) => {
    return await tx.query("SELECT * FROM process_event($1)", [payload.id]);
  });

  return Response.json({ success: true, processedAt: new Date().toISOString() });
}`

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1">
        {/* Top bar with course title & progress */}
        <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/academy/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#07294d]"
              >
                <ArrowLeft className="size-3.5" /> Dashboard
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-bold text-[#07294d] truncate max-w-xs sm:max-w-md">
                {course.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-600">
                  {progressPercent}% Complete
                </span>
                <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#f26522] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {isAllComplete && (
                <Link
                  href="/academy/verify/AVX-CERT-2026-001"
                  className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition flex items-center gap-1"
                >
                  <Award className="size-3.5" /> Certificate Unlocked
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Classroom Grid: Sidebar + Lesson Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Sidebar: Lessons Checklist */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs h-fit space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f26522]">
                  Curriculum Outline
                </span>
                <h3 className="font-bold text-sm text-[#07294d] mt-0.5">
                  Lessons ({allLessons.length})
                </h3>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {course.modules.map((mod, mIdx) => (
                  <div key={mod.title} className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {mod.week}: {mod.title}
                    </span>
                    <ul className="space-y-1">
                      {allLessons
                        .filter((l) => l.week === mod.week)
                        .map((les) => {
                          const isDone = completedList.includes(les.id)
                          const isSelected = les.id === activeLesson.id

                          return (
                            <li key={les.id}>
                              <Link
                                href={`/academy/learn/${course.slug}/${les.id}`}
                                className={`w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs transition ${
                                  isSelected
                                    ? 'bg-[#07294d] text-white font-bold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2
                                    className={`size-4 shrink-0 mt-0.5 ${
                                      isSelected ? 'text-emerald-400' : 'text-emerald-600'
                                    }`}
                                  />
                                ) : (
                                  <Circle
                                    className={`size-4 shrink-0 mt-0.5 ${
                                      isSelected ? 'text-slate-400' : 'text-slate-300'
                                    }`}
                                  />
                                )}
                                <span className="line-clamp-2 leading-snug">{les.title}</span>
                              </Link>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Lesson Classroom Viewport */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {activeLesson.week}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Module: {activeLesson.moduleTitle}
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                    {activeLesson.title}
                  </h1>
                </div>

                {/* Lesson Body */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4 border-t border-slate-100 pt-6">
                  <p>
                    In this technical laboratory session, we examine the production requirements and architecture patterns for{' '}
                    <strong>{activeLesson.title}</strong>. Every system built under the Altavox engineering standard must prioritize deterministic state management, predictable memory allocations, and resilient failure isolation.
                  </p>

                  <h3 className="text-base font-bold text-[#07294d]">Core Architecture Principles</h3>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>Strict input validation with schema bounds before hitting database layers.</li>
                    <li>Idempotent handling of asynchronous webhook triggers and retries.</li>
                    <li>Graceful error containment without exposing underlying database stack traces.</li>
                  </ul>

                  {/* Code snippet with copy action */}
                  <div className="relative mt-4 rounded-xl bg-slate-900 p-4 text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                        Production Implementation Script
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(sampleSnippet)
                          setCopied(true)
                          setTimeout(() => setCopied(false), 1500)
                        }}
                        className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] text-slate-300 hover:text-white"
                      >
                        {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="overflow-x-auto">{sampleSnippet}</pre>
                  </div>

                  <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-4 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c94e16] block">
                      Hands-on Lab Exercise:
                    </span>
                    <p className="text-xs text-slate-800 font-medium">{activeLesson.project}</p>
                    <p className="text-[11px] text-slate-500">
                      Write your solution in your local development environment and verify using our automated test suite before checking off this lesson.
                    </p>
                  </div>
                </div>

                {/* Mark complete button */}
                <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleToggleComplete}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition shadow-xs ${
                      isCurrentCompleted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-[#f26522] text-white hover:bg-[#d9531e]'
                    }`}
                  >
                    <CheckCircle2 className="size-4" />
                    <span>{isCurrentCompleted ? 'Completed (Click to Undo)' : 'Mark Lesson as Completed'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {prevLesson && (
                      <Link
                        href={`/academy/learn/${course.slug}/${prevLesson.id}`}
                        className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        ← Previous
                      </Link>
                    )}
                    {nextLesson && (
                      <Link
                        href={`/academy/learn/${course.slug}/${nextLesson.id}`}
                        className="rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866]"
                      >
                        Next Lesson →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
