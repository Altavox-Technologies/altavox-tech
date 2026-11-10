'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, User, Mail, Phone, X, BookOpen } from 'lucide-react'
import { coursesData } from '@/lib/courses-data'

export function DemoModal({
  isOpen,
  onClose,
  initialCourse
}: {
  isOpen: boolean
  onClose: () => void
  initialCourse?: string
}) {
  const [selectedCourse, setSelectedCourse] = useState(initialCourse || coursesData[0].title)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setSelectedCourse(initialCourse || coursesData[0].title)
    setMessage('')
    setSubmitted(false)
    setLoading(false)
  }, [isOpen, initialCourse])

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    void fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, description: 'Course enquiry: ' + selectedCourse + '. Phone: ' + phone, service: 'Altavox Academy', projectType: 'Course enquiry' }) }).then(async (response) => { const result = await response.json().catch(() => ({})); if (!response.ok) throw new Error(result.error || 'Unable to submit enquiry'); setSubmitted(true) }).catch((error) => setMessage(error instanceof Error ? error.message : 'Unable to submit enquiry. Please try again.')).finally(() => setLoading(false))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="course-enquiry-title" className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f26522]">
              <BookOpen className="size-3.5" /> ALTAVOX ACADEMY
            </div>
            <h3 id="course-enquiry-title" className="mt-1 text-xl font-bold">Course enquiry</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close course enquiry"
            className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#07294d]">Enquiry submitted</h4>
            <p className="text-sm text-slate-600 leading-6 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{name}</strong>. Your enquiry for <strong className="text-[#07294d]">{selectedCourse}</strong> has been saved. Our team can follow up using the contact details you provided.
            </p>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 text-left space-y-2">
              <p>Enquiry email: <strong className="text-slate-900">{email}</strong></p>
              <p>Contact number: <strong className="text-slate-900">{phone}</strong></p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-xl bg-[#f26522] px-6 py-3 text-sm font-bold text-white hover:bg-[#e05312] transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Select Course Track
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-[#f26522] focus-visible:ring-offset-1 focus:bg-white transition"
              >
                {coursesData.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>


            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-slate-400" />
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
                  <input
                    required
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 size-4 text-slate-400" />
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+255 750 227 073"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
                />
              </div>
            </div>

            {message && <p role="alert" className="text-sm text-red-600">{message}</p>}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#f26522] py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#e05312] transition disabled:opacity-50"
              >
                {loading ? 'Submitting enquiry…' : 'Submit course enquiry'}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500">
              Your details are sent securely to the Altavox Tech enquiry endpoint.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
