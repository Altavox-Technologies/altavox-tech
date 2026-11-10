'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  CreditCard,
  Download,
  ExternalLink,
  ArrowRight,
  User,
  Bell,
  Layers,
  PlayCircle,
  FileText,
  AlertCircle
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData, CourseItem } from '@/lib/courses-data'

function DashboardContent() {
  const searchParams = useSearchParams()
  const newlyEnrolled = searchParams.get('enrolled')

  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'payments' | 'announcements' | 'profile'>('courses')
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([])
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({})
  const [studentName, setStudentName] = useState('Michael Kweka')
  const [studentEmail, setStudentEmail] = useState('student@altavox.space')

  useEffect(() => {
    // Load enrolled courses from localStorage and query param
    const stored = JSON.parse(localStorage.getItem('altavox_enrolled_courses') || '["full-stack-web-development", "isp-management-network-engineering"]')
    if (newlyEnrolled && !stored.includes(newlyEnrolled)) {
      stored.push(newlyEnrolled)
      localStorage.setItem('altavox_enrolled_courses', JSON.stringify(stored))
    }
    setEnrolledSlugs(stored)

    // Load completed lessons
    const savedLessons = JSON.parse(localStorage.getItem('altavox_completed_lessons') || '{"full-stack-web-development":["lesson-1-1","lesson-1-2","lesson-1-3","lesson-2-1"]}')
    setCompletedLessons(savedLessons)
  }, [newlyEnrolled])

  const enrolledCourses = coursesData.filter((c) => enrolledSlugs.includes(c.slug))

  // Calculate progress percentage for a course
  const getCourseProgress = (course: CourseItem) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + (m.lessons?.length || m.topics.length), 0)
    const completed = completedLessons[course.slug]?.length || 0
    if (totalLessons === 0) return 0
    return Math.min(100, Math.round((completed / totalLessons) * 100))
  }

  // Sample verified payments
  const payments = [
    {
      id: 'ATX-PAY-8921',
      date: 'November 8, 2026',
      item: 'Full-Stack Web Development',
      provider: 'PayPal Business',
      amount: '$149.00 USD',
      status: 'Completed',
      txnId: 'TXN-9984128'
    },
    {
      id: 'ATX-PAY-7740',
      date: 'October 15, 2026',
      item: 'ISP Management & Network Engineering',
      provider: 'Vodacom M-Pesa Till',
      amount: 'TZS 450,000',
      status: 'Verified',
      txnId: 'TXN-MPESA-8841'
    }
  ]

  const announcements = [
    {
      date: 'November 10, 2026',
      title: 'Weekend Lab Session: RouterOS v7 VLAN Trunking',
      body: 'The live network laboratory for ISP Management and Telecom Engineering will hold a physical session this Saturday at our Unguuni Arusha facility. Virtual access opens at 09:00 EAT.'
    },
    {
      date: 'November 6, 2026',
      title: 'PostgreSQL 17 Schema Tuning Resources Released',
      body: 'Updated index performance profiling guides and EXPLAIN ANALYZE cheat sheets have been uploaded to your course resources section.'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-20">
        {/* Dashboard Top Hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-10 sm:py-14 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57] mb-2">
                  <GraduationCap className="size-3.5" /> Altavox Academy Student LMS
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Student Learning Dashboard
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Welcome back, <strong className="text-white">{studentName}</strong> ({studentEmail}). Track lessons, download lab resources, and view your verified credentials.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('courses')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'courses' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  My Courses ({enrolledCourses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('certificates')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'certificates' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Certificates
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('payments')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'payments' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Billing History
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('announcements')}
                  className={`rounded-lg px-3.5 py-2 transition-all ${
                    activeTab === 'announcements' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Announcements
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newly enrolled banner notice */}
        {newlyEnrolled && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Enrollment Confirmed:</strong> You now have full access to course curriculum, interactive lesson sandboxes, and lab assignments!
                </span>
              </div>
              <Link
                href={`/academy/learn/${newlyEnrolled}/lesson-1-1`}
                className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Start First Lesson →
              </Link>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: MY COURSES */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Active Enrolled Courses</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click Continue Lesson to launch your interactive code sandbox and curriculum modules.
                  </p>
                </div>
                <Link
                  href="/academy#course-catalogue"
                  className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Explore More Courses
                </Link>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <BookOpen className="mx-auto size-12 text-slate-300" />
                  <h3 className="mt-3 text-base font-bold text-[#07294d]">You are not enrolled in any courses yet</h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                    Browse the 20 official Altavox Academy courses and enroll using PayPal or regional mobile money to start learning.
                  </p>
                  <Link
                    href="/academy#course-catalogue"
                    className="mt-5 inline-flex rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e]"
                  >
                    View All 20 Courses
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {enrolledCourses.map((course) => {
                    const progress = getCourseProgress(course)
                    const isFullyCompleted = progress === 100

                    return (
                      <article
                        key={course.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#f26522] transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f26522]">
                              {course.category}
                            </span>
                            <span className="rounded bg-sky-50 text-sky-800 text-[10px] font-bold px-2 py-0.5">
                              {course.difficulty}
                            </span>
                          </div>

                          <h3 className="mt-2 text-lg font-bold text-[#07294d] leading-snug">
                            {course.title}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {course.overview}
                          </p>

                          {/* Progress bar */}
                          <div className="mt-5">
                            <div className="flex justify-between text-xs font-semibold mb-1.5">
                              <span className="text-slate-600">Course Progress:</span>
                              <span className="font-mono text-[#07294d]">{progress}% Complete</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#f26522] to-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Modules List */}
                          <div className="mt-5 border-t border-slate-100 pt-4 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Curriculum Modules ({course.modules.length}):
                            </span>
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {course.modules.slice(0, 3).map((mod, idx) => (
                                <li key={idx} className="flex items-center justify-between text-[11px]">
                                  <span className="truncate max-w-[240px]">• {mod.title}</span>
                                  <span className="text-slate-400 font-mono">Module 0{idx + 1}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-6 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2">
                          <Link
                            href={`/academy/courses/${course.slug}`}
                            className="text-xs font-semibold text-slate-600 hover:text-[#07294d]"
                          >
                            Course Overview
                          </Link>

                          <div className="flex items-center gap-2">
                            {isFullyCompleted ? (
                              <Link
                                href={`/academy/verify/AVX-CERT-2026-001`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                              >
                                <Award className="size-3.5" /> View Certificate
                              </Link>
                            ) : (
                              <Link
                                href={`/academy/learn/${course.slug}/lesson-1-1`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866] transition"
                              >
                                <PlayCircle className="size-3.5 text-[#f26522]" /> Continue Lessons
                              </Link>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}

              {/* Authorized Learning Resources Download */}
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[#07294d]">
                  <Download className="size-5 text-[#f26522]" />
                  <h3 className="text-base font-bold">Authorized Learning Materials & Lab Guides</h3>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Direct access to architectural schematics, RouterOS .rsc scripts, and starter code repositories.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">Lab Topology .RSC</span>
                      <h4 className="font-bold text-[#07294d] mt-1">RouterOS v7 Base ISP Config</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Multi-POP OSPF, PPPoE server, and firewall isolation script.</p>
                    </div>
                    <a
                      href="#download-script"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Downloading RouterOS v7 verified lab template: altavox-routeros-v7-base.rsc')
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522]"
                    >
                      <Download className="size-3.5" /> Download Script
                    </a>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">PostgreSQL DDL</span>
                      <h4 className="font-bold text-[#07294d] mt-1">Double-Entry Financial Schema</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Normalized ACID tables for debit/credit ledgers and audit logs.</p>
                    </div>
                    <a
                      href="#download-sql"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Downloading PostgreSQL DDL schema: altavox-financial-ledger.sql')
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522]"
                    >
                      <Download className="size-3.5" /> Download SQL Schema
                    </a>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">Architecture PDF</span>
                      <h4 className="font-bold text-[#07294d] mt-1">C4 Distributed Systems Blueprint</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Component, container, and context diagrams for microservice scaling.</p>
                    </div>
                    <a
                      href="#download-pdf"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Downloading Architecture PDF: altavox-systems-architecture-c4.pdf')
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522]"
                    >
                      <Download className="size-3.5" /> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="max-w-3xl">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#07294d]">Issued Certificates of Competence</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Certificates are strictly issued upon 100% lesson completion and verified capstone defense.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Award className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      VERIFIED CREDENTIAL
                    </span>
                    <h3 className="text-base font-bold text-[#07294d] mt-1">
                      Full-Stack Web Systems & Next.js Architecture
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Certificate ID: <strong className="font-mono text-slate-700">AVX-CERT-2026-001</strong> • Issued to {studentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/academy/verify/AVX-CERT-2026-001"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866]"
                  >
                    <ExternalLink className="size-3.5" /> Verify Publicly
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS & BILLING */}
          {activeTab === 'payments' && (
            <div className="max-w-4xl">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#07294d]">Payment & Transaction Records</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified payments processed through official Altavox Technologies merchant gateways.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Transaction Ref</th>
                      <th className="py-3.5 px-4">Course / Product</th>
                      <th className="py-3.5 px-4">Payment Method</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#07294d]">{p.id}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{p.item}</td>
                        <td className="py-3.5 px-4 text-slate-600">{p.provider}</td>
                        <td className="py-3.5 px-4 font-bold text-[#07294d]">{p.amount}</td>
                        <td className="py-3.5 px-4 text-slate-500">{p.date}</td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="max-w-3xl space-y-4">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#07294d]">Academy Notices & Announcements</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official scheduling updates from the Altavox Tech Systems Lab.
                </p>
              </div>

              {announcements.map((a, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{a.date}</span>
                    <span className="text-[#f26522] font-semibold">Official Notice</span>
                  </div>
                  <h3 className="mt-1.5 text-base font-bold text-[#07294d]">{a.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}

export default function StudentDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans">
          <div className="text-center">
            <div className="inline-block size-8 animate-spin rounded-full border-4 border-[#07294d] border-t-[#f26522]" />
            <p className="mt-3 text-xs font-bold text-[#07294d]">Loading Altavox LMS Dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}

