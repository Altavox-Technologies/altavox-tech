'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Users,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Award,
  PhoneCall,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { ArchitectureCalculator } from '@/components/architecture-calculator'

type FormFieldKey = 'companyName' | 'contactName' | 'email' | 'phone' | 'message'

export default function CorporateTrainingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    teamSize: '10-25 employees',
    track: 'Cloud Computing & AWS',
    timeline: 'Within 30 days',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<Record<FormFieldKey, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  function validateField(field: FormFieldKey, val: string): string | undefined {
    const value = val.trim()
    switch (field) {
      case 'companyName':
        if (!value) return 'Company name is required'
        if (value.length < 2) return 'Company name must be at least 2 characters'
        return undefined

      case 'contactName':
        if (!value) return 'Your full name is required'
        if (value.length < 2) return 'Full name must be at least 2 characters'
        return undefined

      case 'email':
        if (!value) return 'Corporate email address is required'
        const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
        if (!emailPattern.test(value)) {
          return 'Please provide a valid work email (e.g. name@company.com)'
        }
        return undefined

      case 'phone':
        if (!value) return 'Contact telephone number is required'
        const cleanedPhone = value.replace(/[\s\-\(\)\.]/g, '')
        const phonePattern = /^(\+?[0-9]{7,15})$/
        if (!phonePattern.test(cleanedPhone)) {
          return 'Please enter a valid phone number with 7 to 15 digits (e.g. +255 750 227 073)'
        }
        return undefined

      case 'message':
        if (value.length > 0 && value.length < 5) {
          return 'Please write at least 5 characters for requirements'
        }
        return undefined

      default:
        return undefined
    }
  }

  function handleFieldChange(field: FormFieldKey, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field] || submitAttempted) {
      const err = validateField(field, value)
      setErrors((prev) => {
        const next = { ...prev }
        if (err) next[field] = err
        else delete next[field]
        return next
      })
    }
  }

  function handleBlur(field: FormFieldKey) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const err = validateField(field, formData[field])
    setErrors((prev) => {
      const next = { ...prev }
      if (err) next[field] = err
      else delete next[field]
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitAttempted(true)

    const requiredFields: FormFieldKey[] = ['companyName', 'contactName', 'email', 'phone', 'message']
    const nextTouched: Partial<Record<FormFieldKey, boolean>> = {}
    const newErrors: Partial<Record<FormFieldKey, string>> = {}
    let firstErrorField: FormFieldKey | null = null

    for (const f of requiredFields) {
      nextTouched[f] = true
      const err = validateField(f, formData[f])
      if (err) {
        newErrors[f] = err
        if (!firstErrorField) firstErrorField = f
      }
    }

    setTouched((prev) => ({ ...prev, ...nextTouched }))
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      if (firstErrorField) {
        const el = document.getElementById(`field-${firstErrorField}`)
        if (el) {
          el.focus()
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  function handleReset() {
    setSubmitted(false)
    setSubmitAttempted(false)
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      teamSize: '10-25 employees',
      track: 'Cloud Computing & AWS',
      timeline: 'Within 30 days',
      message: ''
    })
    setErrors({})
    setTouched({})
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 lg:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="rounded-full bg-[#f26522] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Enterprise & Business Solutions
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Upskill Your Enterprise Workforce with Custom IT Training
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Empower your engineering, cloud, security, and QA teams with tailored live training delivered by certified industry practitioners. Measure business ROI with skill benchmarking and hands-on capstone projects.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#quote-form"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#e05312] transition"
                >
                  Request a Custom Training Proposal
                </a>
                <a
                  href="tel:+255750227073"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  <PhoneCall className="size-4 text-[#f26522]" />
                  <span>Call Direct Desk: +255 750 227 073 / +255 708 227 073</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Highlights Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                <Building2 className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#07294d]">Tailored Curriculum</h3>
              <p className="mt-1 text-xs text-slate-600 leading-5">
                Training content designed around your company&apos;s specific architecture, codebase, and security policies.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-[#07294d]">
                <Users className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#07294d]">Dedicated Private Cohorts</h3>
              <p className="mt-1 text-xs text-slate-600 leading-5">
                Exclusive live classes for your team with flexible schedules across US, UK, and European timezones.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <BarChart3 className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#07294d]">Skill Benchmarking</h3>
              <p className="mt-1 text-xs text-slate-600 leading-5">
                Pre-training diagnostic exams, milestone skill trackers, and post-training competency scorecards.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Award className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#07294d]">Vendor Certifications</h3>
              <p className="mt-1 text-xs text-slate-600 leading-5">
                Prepares team members to pass official exams from AWS, Salesforce, Microsoft, CompTIA, and Scrum.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Architecture Sizing & Team ROI Estimator */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <ArchitectureCalculator
            onSelectSetup={(summary) => {
              setFormData((prev) => ({
                ...prev,
                message: `Architecture Blueprint Selected:\n${summary}\n\nPlease prepare an enterprise proposal based on these specifications.`
              }))
              const el = document.getElementById('quote-form')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </section>

        {/* Enterprise Tracks & RFP Form */}
        <section id="quote-form" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Left: What We Train */}
            <div className="lg:col-span-6 space-y-6">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Enterprise Skill Domains
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                Popular Enterprise Cohort Tracks
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Cloud Architecture & DevOps',
                    desc: 'AWS Well-Architected frameworks, Terraform infrastructure-as-code, Docker, Kubernetes container orchestration, and CI/CD pipelines.'
                  },
                  {
                    title: 'Salesforce Enterprise CRM Solutions',
                    desc: 'Platform Developer I & II, Lightning Web Components (LWC), OmniStudio, Service Cloud, and enterprise integration patterns.'
                  },
                  {
                    title: 'Data Science, Machine Learning & Gen AI',
                    desc: 'Python analytics, predictive modeling, LLM prompt engineering, RAG architectures, and enterprise AI governance.'
                  },
                  {
                    title: 'QA Automation & Continuous Testing',
                    desc: 'Selenium WebDriver, Playwright, REST-assured API testing, Performance testing with JMeter, and Agile sprint integration.'
                  },
                  {
                    title: 'Enterprise Cyber Security & DevSecOps',
                    desc: 'Security operations (SOC), vulnerability management, cloud IAM compliance, ethical hacking, and threat intelligence.'
                  }
                ].map((track, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <h3 className="text-sm font-bold text-[#07294d] flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#f26522] shrink-0" />
                      <span>{track.title}</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 pl-6 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: RFP Request Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[#07294d] text-white">
                    <Mail className="size-4 text-[#f26522]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#07294d]">Request an Enterprise Proposal</h3>
                    <p className="text-xs text-slate-500">Receive a detailed syllabus, timeline, and group rate quote</p>
                  </div>
                </div>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center animate-in fade-in">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <h4 className="mt-4 text-base font-bold text-emerald-950">
                      Proposal Request Received!
                    </h4>
                    <p className="mt-2 text-xs text-emerald-800 leading-relaxed">
                      Thank you! Our Corporate Learning Director will review your requirements for <strong>{formData.companyName}</strong> and send an enterprise training proposal to <strong>{formData.email}</strong> within 1 business day.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                    {/* Error summary alert when submit fails */}
                    {submitAttempted && Object.keys(errors).length > 0 && (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in"
                      >
                        <AlertCircle className="size-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-900">Please correct the following before submitting:</p>
                          <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px] text-rose-700 font-medium">
                            {errors.companyName && <li>Company Name: {errors.companyName}</li>}
                            {errors.contactName && <li>Full Name: {errors.contactName}</li>}
                            {errors.email && <li>Work Email: {errors.email}</li>}
                            {errors.phone && <li>Phone: {errors.phone}</li>}
                            {errors.message && <li>Requirements: {errors.message}</li>}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="field-companyName" className="block text-xs font-semibold text-slate-700">
                          Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="field-companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleFieldChange('companyName', e.target.value)}
                          onBlur={() => handleBlur('companyName')}
                          placeholder="Acme Corp / Tech Inc"
                          aria-invalid={!!errors.companyName}
                          aria-describedby={errors.companyName ? 'error-companyName' : undefined}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 outline-none transition ${
                            errors.companyName
                              ? 'border-rose-500 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                              : touched.companyName
                              ? 'border-emerald-500/70 bg-emerald-50/20 focus:border-[#f26522]'
                              : 'border-slate-200 focus:border-[#f26522]'
                          }`}
                        />
                        {errors.companyName && (
                          <p id="error-companyName" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                            <AlertCircle className="size-3 text-rose-600 shrink-0" />
                            <span>{errors.companyName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="field-contactName" className="block text-xs font-semibold text-slate-700">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="field-contactName"
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => handleFieldChange('contactName', e.target.value)}
                          onBlur={() => handleBlur('contactName')}
                          placeholder="Sarah Jenkins"
                          aria-invalid={!!errors.contactName}
                          aria-describedby={errors.contactName ? 'error-contactName' : undefined}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 outline-none transition ${
                            errors.contactName
                              ? 'border-rose-500 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                              : touched.contactName
                              ? 'border-emerald-500/70 bg-emerald-50/20 focus:border-[#f26522]'
                              : 'border-slate-200 focus:border-[#f26522]'
                          }`}
                        />
                        {errors.contactName && (
                          <p id="error-contactName" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                            <AlertCircle className="size-3 text-rose-600 shrink-0" />
                            <span>{errors.contactName}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="field-email" className="block text-xs font-semibold text-slate-700">
                          Corporate Work Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="sarah@acme.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'error-email' : undefined}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 outline-none transition ${
                            errors.email
                              ? 'border-rose-500 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                              : touched.email
                              ? 'border-emerald-500/70 bg-emerald-50/20 focus:border-[#f26522]'
                              : 'border-slate-200 focus:border-[#f26522]'
                          }`}
                        />
                        {errors.email && (
                          <p id="error-email" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                            <AlertCircle className="size-3 text-rose-600 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="field-phone" className="block text-xs font-semibold text-slate-700">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="+255 750 227 073"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'error-phone' : undefined}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 outline-none transition ${
                            errors.phone
                              ? 'border-rose-500 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                              : touched.phone
                              ? 'border-emerald-500/70 bg-emerald-50/20 focus:border-[#f26522]'
                              : 'border-slate-200 focus:border-[#f26522]'
                          }`}
                        />
                        {errors.phone && (
                          <p id="error-phone" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                            <AlertCircle className="size-3 text-rose-600 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="field-teamSize" className="block text-xs font-semibold text-slate-700">Team Size to Train</label>
                        <select
                          id="field-teamSize"
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                        >
                          <option>5 - 10 employees</option>
                          <option>10 - 25 employees</option>
                          <option>25 - 50 employees</option>
                          <option>50 - 100+ employees</option>
                          <option>Entire Engineering Dept</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="field-track" className="block text-xs font-semibold text-slate-700">Primary Domain Track</label>
                        <select
                          id="field-track"
                          value={formData.track}
                          onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                        >
                          <option>Cloud Computing & AWS</option>
                          <option>Salesforce CRM & Dev</option>
                          <option>Data Science & Gen AI</option>
                          <option>QA Automation & Selenium</option>
                          <option>Cyber Security & DevSecOps</option>
                          <option>Custom Multi-Skill Track</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="field-message" className="block text-xs font-semibold text-slate-700">Specific Requirements or Objectives</label>
                      <textarea
                        id="field-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Tell us about your team's current stack, goals, and desired start dates..."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'error-message' : undefined}
                        className={`mt-1 w-full rounded-xl border p-3 text-xs text-slate-900 outline-none transition ${
                          errors.message
                            ? 'border-rose-500 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#f26522]'
                        }`}
                      />
                      {errors.message && (
                        <p id="error-message" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
                          <AlertCircle className="size-3 text-rose-600 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-xl bg-[#f26522] py-3 text-center text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50"
                    >
                      {submitting ? 'Sending Request...' : 'Submit Enterprise Proposal Request'}
                    </button>
                    <p className="text-center text-[11px] text-slate-400">
                      We sign mutual NDAs upon request before reviewing proprietary codebases.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
