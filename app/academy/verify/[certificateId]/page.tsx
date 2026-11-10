import Link from 'next/link'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  User,
  BookOpen,
  ArrowLeft,
  Printer,
  Download,
  ExternalLink,
  QrCode
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { coursesData } from '@/lib/courses-data'

export function generateStaticParams() {
  return [
    { certificateId: 'AVX-CERT-2026-001' },
    { certificateId: 'AVX-CERT-2026-002' },
    { certificateId: 'sample' }
  ]
}

export default async function CertificateVerificationPage({
  params
}: {
  params: Promise<{ certificateId: string }>
}) {
  const { certificateId } = await params

  // Sample or verified student data
  const certData = {
    certificateId: certificateId.toUpperCase(),
    studentName: 'Michael Kweka',
    courseTitle: 'Full-Stack Web Systems & Next.js Architecture',
    courseCategory: 'Software Engineering',
    completedDate: 'November 8, 2026',
    issuingOrg: 'Altavox Technologies',
    accreditationBody: 'Systems Engineering & Digital Architecture Lab',
    verificationHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    status: 'Verified & In Good Standing'
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/academy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#07294d]"
            >
              <ArrowLeft className="size-4" /> Back to Academy Hub
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Public Verification Passed
            </span>
          </div>

          {/* Certificate Container */}
          <div className="relative overflow-hidden rounded-3xl border-8 border-slate-300 bg-white p-8 sm:p-14 shadow-2xl">
            {/* Background watermark badge */}
            <div className="absolute right-8 top-8 opacity-5 pointer-events-none">
              <Award className="size-80 text-[#07294d]" />
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-3 border-b-2 border-slate-100 pb-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#07294d] text-white shadow-md">
                <Award className="size-8 text-[#f26522]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#f26522]">
                  ALTAVOX TECHNOLOGIES • SYSTEMS ENGINEERING LAB
                </span>
                <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#07294d]">
                  Certificate of Engineering Competence
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  This official document certifies that the named engineer has satisfied all practical laboratory requirements.
                </p>
              </div>
            </div>

            {/* Recipient details */}
            <div className="my-10 text-center space-y-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                THIS IS PROUDLY PRESENTED TO
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#07294d] font-serif tracking-tight">
                {certData.studentName}
              </h2>
              <div className="mx-auto h-0.5 w-32 bg-[#f26522]" />

              <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                For successfully fulfilling all laboratory curricula, code reviews, and defending practical production capstones in the professional pathway:
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-[#07294d]">
                {certData.courseTitle}
              </h3>
            </div>

            {/* Metadata Footer: Issuance, Signatures, QR Code Hash */}
            <div className="mt-12 border-t-2 border-slate-100 pt-8 grid gap-8 sm:grid-cols-3 items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Date of Completion:
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{certData.completedDate}</p>
                <span className="text-[10px] text-slate-400 block mt-2 font-mono">
                  Cert ID: {certData.certificateId}
                </span>
              </div>

              {/* Central Seal */}
              <div className="text-center">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-50 p-2 text-amber-700 shadow-inner">
                  <ShieldCheck className="size-10 text-[#f26522]" />
                </div>
                <span className="mt-2 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  VERIFIED SEAL
                </span>
              </div>

              {/* Cryptographic hash & verification info */}
              <div className="sm:text-right text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Issuing Organization:
                </span>
                <p className="font-bold text-[#07294d] mt-0.5">{certData.issuingOrg}</p>
                <p className="text-[11px] text-slate-500 mt-1 truncate font-mono">
                  {certData.verificationHash.slice(0, 24)}…
                </p>
              </div>
            </div>
          </div>

          {/* Verification Audit Checklist Box */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Institutional Verification Criteria
            </h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Core Modules & Lessons Passed</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>2 Production Capstone Repositories Audited</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Defense Panel Review Completed in Arusha</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
