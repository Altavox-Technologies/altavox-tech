'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  Download,
  ExternalLink,
  PlayCircle,
  AlertCircle,
  LogIn,
  LogOut,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData, CourseItem } from '@/lib/courses-data'
import { useFirebaseAuth } from '@/components/firebase-provider'
import { db, handleFirestoreError, OperationType } from '@/lib/firebase'

interface VerifiedPaymentRecord {
  id: string
  date: string
  item: string
  provider: string
  amount: string
  status: string
  txnId: string
}

interface CertificateSummary {
  certificateId: string
  courseTitle: string
  courseSlug: string
  status: string
}

function triggerFileDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const orderStatus = searchParams.get('order_status')
  const paypalToken = searchParams.get('token')
  const returnInternalOrderId = searchParams.get('internalOrderId')
  const returnItemType = searchParams.get('itemType') || 'course'
  const returnSlug = searchParams.get('slug')

  const { user, loading: authLoading, isAdmin, signInWithGoogle, signOutFirebase } = useFirebaseAuth()

  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'payments' | 'announcements'>('courses')
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([])
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({})
  const [payments, setPayments] = useState<VerifiedPaymentRecord[]>([])
  const [certificates, setCertificates] = useState<CertificateSummary[]>([])
  const [captureNotice, setCaptureNotice] = useState<{ type: 'success' | 'error'; text: string; slug?: string } | null>(null)
  const [verifyingPayPal, setVerifyingPayPal] = useState(false)
  const captureAttemptedRef = useRef(false)

  // Load Firebase Firestore data for authenticated user
  useEffect(() => {
    if (!user) {
      setEnrolledSlugs([])
      setCertificates([])
      return
    }

    async function loadUserAcademyRecords() {
      if (!user) return
      try {
        // 1. Load enrollments
        const enrollQ = query(collection(db, 'enrollments'), where('userId', '==', user.uid))
        const enrollSnap = await getDocs(enrollQ)
        const slugs: string[] = []
        const paymentRows: VerifiedPaymentRecord[] = []
        enrollSnap.docs.forEach((docSnap) => {
          const data = docSnap.data()
          if (data.status === 'active' || data.status === 'completed' || data.status === 'pending') {
            if (typeof data.courseSlug === 'string') {
              slugs.push(data.courseSlug)
            }
          }
          if (typeof data.orderRef === 'string') {
            paymentRows.push({
              id: docSnap.id,
              date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Recorded',
              item: String(data.courseTitle || data.courseSlug || 'Academy Track'),
              provider: String(data.paymentProvider || 'paypal').toUpperCase(),
              amount: 'Verified',
              status: String(data.status || 'pending').toUpperCase(),
              txnId: data.orderRef,
            })
          }
        })
        setEnrolledSlugs(Array.from(new Set(slugs)))
        setPayments(paymentRows)

        // 2. Load lesson progress
        const progQ = query(collection(db, 'lessonProgress'), where('userId', '==', user.uid))
        const progSnap = await getDocs(progQ)
        const progMap: Record<string, string[]> = {}
        progSnap.docs.forEach((docSnap) => {
          const data = docSnap.data()
          if (typeof data.courseSlug === 'string' && Array.isArray(data.completedLessons)) {
            progMap[data.courseSlug] = data.completedLessons.map(String)
          }
        })
        setCompletedLessons(progMap)

        // 3. Load issued certificates
        const certQ = query(collection(db, 'certificates'), where('userId', '==', user.uid))
        const certSnap = await getDocs(certQ)
        setCertificates(
          certSnap.docs.map((docSnap) => {
            const d = docSnap.data()
            return {
              certificateId: String(d.certificateId || docSnap.id),
              courseTitle: String(d.courseTitle || ''),
              courseSlug: String(d.courseSlug || ''),
              status: String(d.status || 'verified'),
            }
          })
        )
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'enrollments')
      }
    }

    void loadUserAcademyRecords()
  }, [user])

  // Verify PayPal order return with backend capture API
  useEffect(() => {
    if (orderStatus !== 'success' || !paypalToken || captureAttemptedRef.current) {
      return
    }
    captureAttemptedRef.current = true

    async function verifyPayPalCapture() {
      setVerifyingPayPal(true)
      try {
        const pendingRaw = typeof window !== 'undefined' ? sessionStorage.getItem('altavox_pending_paypal_order') : null
        const pending = pendingRaw ? JSON.parse(pendingRaw) : null

        const internalOrderId = returnInternalOrderId || pending?.internalOrderId
        const itemType = returnItemType || pending?.itemType || 'course'
        const itemSlug = returnSlug || pending?.itemSlug
        const customerEmail = user?.email || pending?.customerEmail || ''

        if (!internalOrderId || !itemSlug || !customerEmail) {
          setCaptureNotice({
            type: 'error',
            text: 'Missing order reference or email from checkout session. Please contact support with your PayPal transaction ID.',
          })
          return
        }

        const res = await fetch('/api/payments/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            internalOrderId,
            providerOrderId: paypalToken,
            itemType,
            itemSlug,
            customerEmail,
          }),
        })

        const data = await res.json()
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'PayPal capture verification failed.')
        }

        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('altavox_pending_paypal_order')
        }

        const verifiedSlug = String(itemSlug)
        setEnrolledSlugs((prev) => Array.from(new Set([...prev, verifiedSlug])))

        const courseMatch = coursesData.find((c) => c.slug === verifiedSlug)
        const newPaymentRow: VerifiedPaymentRecord = {
          id: internalOrderId,
          date: new Date().toLocaleDateString(),
          item: courseMatch?.title || verifiedSlug,
          provider: 'PayPal Business',
          amount: `$${data.capture?.amount || courseMatch?.discountPrice || 0} USD`,
          status: 'COMPLETED',
          txnId: data.capture?.transactionId || paypalToken || '',
        }
        setPayments((prev) => [newPaymentRow, ...prev])

        if (user && user.emailVerified && itemType === 'course' && courseMatch) {
          const enrollmentDocId = `${user.uid}_${verifiedSlug}`
          try {
            await setDoc(doc(db, 'enrollments', enrollmentDocId), {
              userId: user.uid,
              courseSlug: verifiedSlug,
              courseTitle: courseMatch.title,
              status: isAdmin ? 'active' : 'pending',
              paymentProvider: 'paypal',
              orderRef: String(data.capture?.transactionId || paypalToken || internalOrderId).slice(0, 120),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            })
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `enrollments/${enrollmentDocId}`)
          }
        }

        setCaptureNotice({
          type: 'success',
          text: `Payment verified and captured (${newPaymentRow.txnId}). Course access is ready.`,
          slug: verifiedSlug,
        })
      } catch (err: unknown) {
        setCaptureNotice({
          type: 'error',
          text: err instanceof Error ? err.message : 'Unable to verify PayPal capture.',
        })
      } finally {
        setVerifyingPayPal(false)
      }
    }

    void verifyPayPalCapture()
  }, [orderStatus, paypalToken, returnInternalOrderId, returnItemType, returnSlug, user, isAdmin])

  const enrolledCourses = coursesData.filter((c) => enrolledSlugs.includes(c.slug))

  const getCourseProgress = (course: CourseItem) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + (m.lessons?.length || m.topics.length), 0)
    const completed = completedLessons[course.slug]?.length || 0
    if (totalLessons === 0) return 0
    return Math.min(100, Math.round((completed / totalLessons) * 100))
  }

  const announcements = [
    {
      date: 'Arusha Systems Lab',
      title: 'RouterOS v7 & FreeRADIUS Lab Bench',
      body: 'Weekly evening and weekend hands-on networking benches are hosted at Nduruma Road, Unguuni, Arusha with virtual SSH lab access for remote enrollees.',
    },
    {
      date: 'Academy Curriculum',
      title: '20 Official Engineering Pathways Active',
      body: 'All 20 structured tracks include project-based modules, capstone deliverables, and verified digital certificates upon completion.',
    },
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
                {authLoading ? (
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">Checking authentication session...</p>
                ) : user ? (
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <span>
                      Signed in as <strong className="text-white">{user.displayName || 'Student'}</strong> ({user.email})
                    </span>
                    <button
                      type="button"
                      onClick={() => void signOutFirebase()}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
                    >
                      <LogOut className="size-3" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <p className="text-xs sm:text-sm text-slate-300">
                      Sign in with Google to synchronize course enrollments, lesson progress, and earned certificates.
                    </p>
                    <button
                      type="button"
                      onClick={() => void signInWithGoogle()}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#f26522] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#d9531e] transition cursor-pointer"
                    >
                      <LogIn className="size-3.5" /> Sign In with Google
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap rounded-xl bg-black/30 p-1 border border-white/10 text-xs font-semibold self-start md:self-auto">
                {[
                  { id: 'courses', label: `My Courses (${enrolledCourses.length})` },
                  { id: 'certificates', label: `Certificates (${certificates.length})` },
                  { id: 'payments', label: `Billing (${payments.length})` },
                  { id: 'announcements', label: 'Notices' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`rounded-lg px-3.5 py-2 transition-all cursor-pointer ${
                      activeTab === tab.id ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PayPal verification / capture status */}
        {verifyingPayPal && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs sm:text-sm text-sky-900">
              <Loader2 className="size-5 animate-spin text-[#0070ba]" />
              <span>Verifying PayPal checkout signature and capturing payment on server...</span>
            </div>
          </div>
        )}

        {captureNotice && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div
              className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 text-xs sm:text-sm ${
                captureNotice.type === 'success'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : 'border-rose-300 bg-rose-50 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {captureNotice.type === 'success' ? (
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="size-5 text-rose-600 shrink-0" />
                )}
                <span>{captureNotice.text}</span>
              </div>
              {captureNotice.slug && (
                <Link
                  href={`/academy/learn/${captureNotice.slug}/lesson-1-1`}
                  className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Open Course Classroom →
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: MY COURSES */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Enrolled Courses</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Launch interactive classrooms for your active tracks or browse the full 20-course catalog.
                  </p>
                </div>
                <Link
                  href="/academy#course-catalogue"
                  className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Browse All 20 Courses
                </Link>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <BookOpen className="mx-auto size-12 text-slate-300" />
                  <h3 className="mt-3 text-base font-bold text-[#07294d]">
                    {user ? 'No Active Course Enrollments Found' : 'Sign In to View Your Enrolled Courses'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                    {user
                      ? 'Enroll in any of the 20 Altavox Academy tracks using PayPal or contact our WhatsApp Admissions Desk.'
                      : 'Use Google Sign-In above to load your synchronized enrollments, lesson progress, and certificates.'}
                  </p>
                  <Link
                    href="/academy#course-catalogue"
                    className="mt-5 inline-flex rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e]"
                  >
                    Explore 20 Official Courses
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {enrolledCourses.map((course) => {
                    const progress = getCourseProgress(course)
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
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2">
                          <Link
                            href={`/academy/courses/${course.slug}`}
                            className="text-xs font-semibold text-slate-600 hover:text-[#07294d]"
                          >
                            Course Overview
                          </Link>

                          <Link
                            href={`/academy/learn/${course.slug}/lesson-1-1`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866] transition"
                          >
                            <PlayCircle className="size-3.5 text-[#f26522]" /> Open Classroom
                          </Link>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}

              {/* Lab Starter Templates */}
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[#07294d]">
                  <Download className="size-5 text-[#f26522]" />
                  <h3 className="text-base font-bold">Lab Reference Scripts & Schemas</h3>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Direct starter scripts used across Altavox Academy engineering modules.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">Lab Script .RSC</span>
                      <h4 className="font-bold text-[#07294d] mt-1">RouterOS v7 Base ISP Config</h4>
                      <p className="text-[11px] text-slate-500 mt-1">PPPoE isolation & firewall baseline template.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerFileDownload(
                          'altavox-routeros-v7-base.rsc',
                          '# Altavox Academy RouterOS v7 Lab Baseline\n/interface bridge add name=bridge-lan\n/ip firewall filter add chain=input action=drop in-interface-list=WAN comment="Drop external input"\n'
                        )
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522] cursor-pointer"
                    >
                      <Download className="size-3.5" /> Download .RSC
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">PostgreSQL DDL</span>
                      <h4 className="font-bold text-[#07294d] mt-1">Ledger Entries SQL Schema</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Immutable integer-cents double-entry table template.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerFileDownload(
                          'altavox-financial-ledger.sql',
                          '-- Altavox Academy Double-Entry Ledger Reference\nCREATE TABLE IF NOT EXISTS ledger_entries (\n  id UUID PRIMARY KEY,\n  account_id UUID NOT NULL,\n  amount_cents BIGINT NOT NULL,\n  currency CHAR(3) NOT NULL DEFAULT \'USD\',\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n'
                        )
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522] cursor-pointer"
                    >
                      <Download className="size-3.5" /> Download .SQL
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#f26522]">Architecture Spec</span>
                      <h4 className="font-bold text-[#07294d] mt-1">Capstone Review Checklist</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Production readiness criteria for Arusha defense panels.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerFileDownload(
                          'altavox-capstone-checklist.txt',
                          'ALTAVOX ACADEMY CAPSTONE CHECKLIST\n1. Schema validation on every API boundary\n2. Rate limiting on public write routes\n3. Server-verified payment & role checks\n4. Automated lint & build checks passing\n'
                        )
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#07294d] hover:text-[#f26522] cursor-pointer"
                    >
                      <Download className="size-3.5" /> Download Spec
                    </button>
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
                  Certificates appear automatically once issued to your account following capstone defense.
                </p>
              </div>

              {certificates.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <ShieldCheck className="mx-auto size-10 text-slate-300" />
                  <h3 className="mt-3 text-sm font-bold text-[#07294d]">No Certificates Issued Yet</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Complete all track modules and defend your capstone project to receive a verifiable credential.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.certificateId}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                          <Award className="size-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {cert.status.toUpperCase()}
                          </span>
                          <h3 className="text-base font-bold text-[#07294d] mt-1">{cert.courseTitle}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Certificate ID: <strong className="font-mono text-slate-700">{cert.certificateId}</strong>
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/academy/verify/${cert.certificateId}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-4 py-2 text-xs font-bold text-white hover:bg-[#0b3866]"
                      >
                        <ExternalLink className="size-3.5" /> Verify Publicly
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PAYMENTS & BILLING */}
          {activeTab === 'payments' && (
            <div className="max-w-4xl">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#07294d]">Payment & Transaction Records</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Server-verified transactions recorded for your student account.
                </p>
              </div>

              {payments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="text-sm font-bold text-[#07294d]">No Payment Records Yet</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Verified PayPal receipts and enrolled billing records will appear here.
                  </p>
                </div>
              ) : (
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
                          <td className="py-3.5 px-4 font-mono font-bold text-[#07294d]">{p.txnId}</td>
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
              )}
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="max-w-3xl space-y-4">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#07294d]">Academy Notices & Lab Info</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Operational notes from Altavox Academy, Arusha.
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
