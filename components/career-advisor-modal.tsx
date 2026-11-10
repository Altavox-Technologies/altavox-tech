'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, X, Award, Briefcase, DollarSign, BookOpen, Layers, Server, Network } from 'lucide-react'
import { coursesData } from '@/lib/courses-data'

export function CareerAdvisorModal({
  isOpen,
  onClose,
  onSelectCourse
}: {
  isOpen: boolean
  onClose: () => void
  onSelectCourse?: (courseSlug: string) => void
}) {
  const [needType, setNeedType] = useState('Deploy an Operational System')
  const [background, setBackground] = useState('Internet Service Provider (ISP) / Telecom')
  const [interest, setInterest] = useState('ISP Billing & MikroTik Queue Automation')
  const [scale, setScale] = useState('1,000 - 5,000 active users / subscribers')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  if (!isOpen) return null

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)

      let recommendedCourse = coursesData[0]
      if (interest.includes('ISP') || interest.includes('Network') || interest.includes('MikroTik') || interest.includes('RADIUS')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'isp-management-network-engineering') || coursesData[0]
      } else if (interest.includes('Cloud') || interest.includes('DevOps') || interest.includes('Docker')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'cloud-infrastructure-devops') || coursesData[0]
      } else if (interest.includes('Cyber') || interest.includes('Security')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'cybersecurity-secure-software') || coursesData[0]
      } else if (interest.includes('AI') || interest.includes('Local')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'ai-engineering-local-systems') || coursesData[0]
      } else if (interest.includes('Database') || interest.includes('Supabase')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'database-engineering-supabase') || coursesData[0]
      } else if (interest.includes('Architecture') || interest.includes('System Design')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'software-architecture-system-design') || coursesData[0]
      } else if (interest.includes('Next.js') || interest.includes('React')) {
        recommendedCourse = coursesData.find((c) => c.slug === 'react-nextjs-engineering') || coursesData[0]
      } else {
        recommendedCourse = coursesData.find((c) => c.slug === 'full-stack-web-development') || coursesData[0]
      }

      setResult({
        course: recommendedCourse,
        matchScore: 'High Compatibility',
        targetRole: recommendedCourse.careerRoles[0] || 'Software Engineer',
        projectedSalary: 'Focus on production skills and demonstrable projects',
        timeline: recommendedCourse.duration,
        steps: [
          `Phase 1: Foundations and architecture review tailored for ${background}`,
          `Phase 2: Live lab exercises, code implementation, and testing`,
          `Phase 3: Capstone defense and production deployment runbook`
        ]
      })
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header in Altavox Navy & Orange */}
        <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#f26522] text-white">
              <Sparkles className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f26522]">
                NEW FEATURE · INTERACTIVE AI ADVISOR
              </div>
              <h3 className="text-xl font-bold">Altavox AI Systems & Career Advisor</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!result ? (
            <form onSubmit={handleAnalyze} className="space-y-4">
              <p className="text-xs text-slate-600">
                Answer 3 quick questions about your organization or career goals. Our engine will generate an instant technical blueprint, recommended platform stack, and deployment timeline.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700">What is your primary goal?</label>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  {['Deploy an Operational System', 'Upskill Team / Get Certified'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNeedType(type)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                        needType === type
                          ? 'border-[#f26522] bg-orange-50 text-[#f26522]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">What domain or industry are you in?</label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                >
                  <option>Internet Service Provider (ISP) / Telecom</option>
                  <option>Primary / Secondary Education Complex</option>
                  <option>Cloud Infrastructure & DevOps Team</option>
                  <option>Software Engineering & Web Systems</option>
                  <option>Non-IT / Career Switcher to Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">What capability do you need to solve?</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                >
                  <option>ISP Management & Network Engineering (MikroTik RouterOS, RADIUS)</option>
                  <option>Full-Stack Web Development (Next.js, TypeScript, PostgreSQL)</option>
                  <option>React and Next.js Engineering (App Router & SSR)</option>
                  <option>Cloud Infrastructure and DevOps (Linux, Docker, CI/CD)</option>
                  <option>Cybersecurity and Secure Software Development</option>
                  <option>AI Engineering and Local AI Systems (Ollama, RAG)</option>
                  <option>Database Engineering and Supabase</option>
                  <option>Software Architecture and System Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Estimated Target Capacity / User Base</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                >
                  <option>Under 500 active users (Early Stage)</option>
                  <option>1,000 - 5,000 active users / subscribers</option>
                  <option>10,000+ high-concurrency enterprise tier</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full rounded-xl bg-[#f26522] py-3.5 text-center text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50"
              >
                {analyzing ? 'Generating Blueprint...' : 'Generate AI Technical Roadmap →'}
              </button>
            </form>
          ) : (
            <div className="space-y-5 animate-in fade-in">
              <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f26522]">
                    Recommended Architecture & Platform
                  </span>
                  <h4 className="mt-1 text-base font-bold text-[#07294d]">{result.course.title}</h4>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold shrink-0">
                  {result.matchScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                  <p className="text-slate-500 font-medium">Domain Outcome / Impact:</p>
                  <p className="mt-1 font-bold text-slate-900">{result.projectedSalary}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                  <p className="text-slate-500 font-medium">Implementation Window:</p>
                  <p className="mt-1 font-bold text-slate-900">{result.timeline}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">Your Recommended 3-Phase Implementation Blueprint:</p>
                <div className="mt-2.5 space-y-2">
                  {result.steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700 border border-slate-100">
                      <CheckCircle2 className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">Core Technologies Deployed:</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.course.skillsCovered.map((skill: string, i: number) => (
                    <span key={i} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    if (onSelectCourse) onSelectCourse(result.course.slug)
                  }}
                  className="flex-1 rounded-xl bg-[#f26522] py-3 text-center text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition"
                >
                  Inspect Full Architecture & Blueprint →
                </button>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
