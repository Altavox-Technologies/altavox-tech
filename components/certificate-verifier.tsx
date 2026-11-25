'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Award, CheckCircle2, ShieldAlert, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db, handleFirestoreError, OperationType } from '@/lib/firebase'

interface VerifiedCertRecord {
  certificateId: string
  studentName: string
  courseTitle: string
  courseSlug: string
  verificationHash: string
  status: 'verified' | 'revoked'
  issuedDate: string
}

export function CertificateVerifier({ certificateId }: { certificateId: string }) {
  const normalizedId = certificateId.trim().toUpperCase()
  const [loading, setLoading] = useState(true)
  const [cert, setCert] = useState<VerifiedCertRecord | null>(null)

  useEffect(() => {
    let active = true
    async function lookup() {
      if (!normalizedId || !/^[A-Z0-9-]+$/.test(normalizedId)) {
        setLoading(false)
        return
      }
      const path = `certificates/${normalizedId}`
      try {
        const snap = await getDoc(doc(db, 'certificates', normalizedId))
        if (active && snap.exists()) {
          const data = snap.data()
          setCert({
            certificateId: String(data.certificateId || normalizedId),
            studentName: String(data.studentName || ''),
            courseTitle: String(data.courseTitle || ''),
            courseSlug: String(data.courseSlug || ''),
            verificationHash: String(data.verificationHash || ''),
            status: data.status === 'revoked' ? 'revoked' : 'verified',
            issuedDate: data.issuedAt?.toDate
              ? data.issuedAt.toDate().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Issued Record',
          })
        }
      } catch (err) {
        if (active) {
          handleFirestoreError(err, OperationType.GET, path)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    void lookup()
    return () => {
      active = false
    }
  }, [normalizedId])

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
        <Loader2 className="mx-auto size-8 animate-spin text-[#f26522]" />
        <p className="mt-3 text-xs font-bold text-[#07294d]">
          Querying Altavox Credential Registry for {normalizedId}...
        </p>
      </div>
    )
  }

  if (!cert || cert.status !== 'verified') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/academy"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#07294d]"
          >
            <ArrowLeft className="size-4" /> Back to Academy Hub
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
            <ShieldAlert className="size-3.5 text-amber-600" />
            {cert?.status === 'revoked' ? 'Credential Revoked' : 'Record Not Found'}
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <ShieldAlert className="size-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#07294d]">
            {cert?.status === 'revoked'
              ? `Certificate ${normalizedId} Has Been Revoked`
              : `No Verified Credential Found for "${normalizedId}"`}
          </h1>
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-slate-600 leading-relaxed">
            Altavox Academy only displays verified credentials that have been formally issued and signed in our registry after capstone completion. If you believe this certificate ID should be listed, contact{' '}
            <a href="mailto:engineering@altavox.space" className="font-bold text-[#f26522] hover:underline">
              engineering@altavox.space
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/academy"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#07294d]"
        >
          <ArrowLeft className="size-4" /> Back to Academy Hub
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="size-3.5 text-emerald-600" /> Verified Credential
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border-8 border-slate-300 bg-white p-8 sm:p-14 shadow-2xl">
        <div className="text-center space-y-3 border-b-2 border-slate-100 pb-8">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#07294d] text-white shadow-md">
            <Award className="size-8 text-[#f26522]" />
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#f26522]">
              ALTAVOX TECHNOLOGIES • ACADEMY REGISTRY
            </span>
            <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#07294d]">
              Certificate of Engineering Competence
            </h1>
          </div>
        </div>

        <div className="my-10 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            PRESENTED TO
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#07294d] font-serif tracking-tight">
            {cert.studentName}
          </h2>
          <div className="mx-auto h-0.5 w-32 bg-[#f26522]" />
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
            For successfully completing all modules and practical assessments in:
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[#07294d]">{cert.courseTitle}</h3>
        </div>

        <div className="mt-12 border-t-2 border-slate-100 pt-8 grid gap-8 sm:grid-cols-3 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Date of Issuance:
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{cert.issuedDate}</p>
            <span className="text-[10px] text-slate-400 block mt-2 font-mono">
              Cert ID: {cert.certificateId}
            </span>
          </div>

          <div className="text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-50 p-2 text-amber-700 shadow-inner">
              <ShieldCheck className="size-10 text-[#f26522]" />
            </div>
            <span className="mt-2 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              VERIFIED RECORD
            </span>
          </div>

          <div className="sm:text-right text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Issuing Organization:
            </span>
            <p className="font-bold text-[#07294d] mt-0.5">Altavox Technologies</p>
            <p className="text-[11px] text-slate-500 mt-1 truncate font-mono">
              {cert.verificationHash.slice(0, 24)}…
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
