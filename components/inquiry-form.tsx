'use client'

import { useState } from 'react'
import { CheckCircle2, Send, Sparkles, AlertCircle } from 'lucide-react'
import { services } from '@/lib/site-data'

export function InquiryForm({ detailed = false }: { detailed?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [projectType, setProjectType] = useState('')
  const [timeline, setTimeline] = useState('')
  const [description, setDescription] = useState('')

  // Quick preset loader
  function applyPreset(preset: { service: string; type: string; desc: string }) {
    setSelectedService(preset.service)
    setProjectType(preset.type)
    setDescription(preset.desc)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setErrorMessage('')

    const payload = {
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim() || undefined,
      service: selectedService || undefined,
      projectType: projectType.trim() || undefined,
      timeline: timeline.trim() || undefined,
      description: description.trim(),
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setState('sent')
      } else {
        const errorData = await res.json().catch(() => ({}))
        setErrorMessage(errorData.error || 'Failed to submit inquiry. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMessage('Network connection error. Please try again later.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-300/40 bg-emerald-50/50 p-8 text-center sm:p-12 shadow-xs">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-[#07294d]">Inquiry Received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{name || 'there'}</span>. Your inquiry has been registered in our operational backlog. An engineer will review your requirements and reach out via <span className="font-semibold text-slate-900">{email}</span> within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setState('idle')
            setName('')
            setEmail('')
            setDescription('')
            setOrganization('')
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#07294d] px-6 py-3 text-xs font-bold text-white hover:bg-[#051c36] transition shadow-xs"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Quick Presets */}
      <div className="mb-6 border-b border-slate-100 pb-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Quick Requirement Templates
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            {
              label: 'ISP Billing & Hotspot',
              service: 'ISP billing & subscriber systems',
              type: 'ISP Automation',
              desc: 'We operate a local wireless network and need automated subscriber billing with M-Pesa integration, bandwidth shaping on MikroTik routers, and customer SMS expiration alerts.'
            },
            {
              label: 'School SIMS Portal',
              service: 'Websites & web applications',
              type: 'Education Software',
              desc: 'We need a school management system to handle student records, fee collection tracking, report card generation, and teacher gradebook portals.'
            },
            {
              label: 'Cloud Infrastructure Audit',
              service: 'Cloud deployment & infrastructure',
              type: 'Cloud Migration',
              desc: 'We need to migrate our web apps and databases to a resilient, containerized setup with automated zero-downtime deployments and SSL management.'
            }
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#f26522] hover:bg-orange-50/60 hover:text-[#f26522] transition"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Your Name <span className="text-rose-500">*</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Mwangi"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
            />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Work Email <span className="text-rose-500">*</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@organization.com"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Organization or Company
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Horizon ISP Ltd."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
            />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Primary Area of Interest
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
            >
              <option value="">Select a capability...</option>
              {services.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </label>
        </div>

        {detailed && (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Project Type / Scope
              <input
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g. Green-field build, System refactor"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
              />
            </label>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Desired Timeline
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
              >
                <option value="">Select timeline...</option>
                <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                <option value="Next month">Next month</option>
                <option value="Next quarter (1-3 months)">Next quarter (1-3 months)</option>
                <option value="Exploratory / Planning stage">Exploratory / Planning stage</option>
              </select>
            </label>
          </div>
        )}

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          Describe the operational problem or requirements <span className="text-rose-500">*</span>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us what is slowing the team down, which systems need to be connected, or what functionality you need to ship..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#f26522] focus:bg-white transition"
          />
        </label>

        {state === 'error' && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
          <p className="text-[11px] text-slate-500">
            Submitting this brief does not incur obligation. Details remain confidential.
          </p>

          <button
            type="submit"
            disabled={state === 'sending'}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f26522] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#d95316] disabled:opacity-50 shadow-sm"
          >
            {state === 'sending' ? (
              'Submitting brief…'
            ) : (
              <>
                Submit Brief <Send className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
