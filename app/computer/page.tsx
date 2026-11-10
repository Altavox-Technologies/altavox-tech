'use client'

import { useState } from 'react'
import {
  Activity, ArrowRight, BadgeCheck, BookOpen, CalendarClock, CheckCircle2,
  ChevronRight, CircleDot, ClipboardCheck, CloudDownload, Cpu, ExternalLink,
  FileText, HardDrive, Headphones, Laptop, LockKeyhole, MonitorCog, Network,
  Search, ShieldCheck, Wrench,
} from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const services = [
  { id: 'PC Maintenance', title: 'Endpoint diagnostics & maintenance', category: 'ENDPOINT ENGINEERING', detail: 'Hardware health checks, OS integrity, startup analysis, driver remediation, thermal inspection and performance optimisation.', scope: 'Diagnostics · Preventive maintenance · Performance tuning', icon: Wrench },
  { id: 'Windows Installation & Activation', title: 'Windows deployment & configuration', category: 'OPERATING SYSTEMS', detail: 'Clean OS deployment, partition planning, driver provisioning, update configuration and activation with a valid licence.', scope: 'Windows setup · Drivers · Licence validation', icon: MonitorCog },
  { id: 'Software Centre', title: 'Software deployment & configuration', category: 'APPLICATION MANAGEMENT', detail: 'Installation, configuration and troubleshooting for business, education, productivity, creative and developer software.', scope: 'Application setup · Compatibility · Updates', icon: CloudDownload },
  { id: 'Security Centre', title: 'Endpoint security & hardening', category: 'CYBERSECURITY', detail: 'Malware assessment, patching, firewall configuration, backup planning and practical endpoint security controls.', scope: 'Threat checks · Patching · Backup readiness', icon: ShieldCheck },
  { id: 'Hardware Support', title: 'Hardware diagnostics & upgrades', category: 'HARDWARE ENGINEERING', detail: 'Assessment of storage, memory, batteries, displays, keyboards, power systems, printers and connected peripherals.', scope: 'Component testing · Upgrade advice · Repair assessment', icon: Cpu },
  { id: 'Remote Support', title: 'Remote technical assistance', category: 'REMOTE OPERATIONS', detail: 'Technician-led troubleshooting through an agreed remote session with customer authorisation and session safeguards.', scope: 'Remote diagnosis · Configuration · User assistance', icon: Headphones },
  { id: 'Service Booking', title: 'Technical service request intake', category: 'SERVICE MANAGEMENT', detail: 'Structured issue submission with device information, requested service, preferred date and a unique service reference.', scope: 'Request intake · Triage · Scheduling confirmation', icon: CalendarClock },
  { id: 'Repair Tracking', title: 'Repair lifecycle tracking', category: 'WORK ORDER VISIBILITY', detail: 'Check the latest recorded work-order stage using the unique reference and the email associated with the request.', scope: 'Reference lookup · Status visibility · Quote status', icon: Activity },
  { id: 'IT Knowledge Base', title: 'Technical knowledge base', category: 'SELF-SERVICE SUPPORT', detail: 'Step-by-step guidance for common Windows, networking, printer, software and device maintenance issues.', scope: 'Troubleshooting · User guides · Best practices', icon: BookOpen },
  { id: 'Quotations & Invoices', title: 'Technical quotations & billing', category: 'COMMERCIAL SERVICES', detail: 'Submit requirements for an itemised estimate. Chargeable work proceeds only after the scope and quotation are agreed.', scope: 'Scope definition · Cost estimate · Invoice process', icon: FileText },
]

const guides = [
  { title: 'Windows performance diagnostics', level: 'ENDPOINT', steps: ['Review CPU, memory and disk utilisation in Task Manager.', 'Check startup applications and Windows reliability history.', 'Verify free storage and inspect pending system updates.', 'If abnormal temperatures, disk errors or repeated crashes occur, stop intensive use and request a diagnostic assessment.'] },
  { title: 'Windows Update troubleshooting', level: 'OPERATING SYSTEM', steps: ['Confirm a stable internet connection and connect the device to power.', 'Check available system drive capacity.', 'Restart only when Windows indicates it is safe to do so.', 'Record any update error code before requesting support.'] },
  { title: 'Wi-Fi connectivity diagnostics', level: 'NETWORKING', steps: ['Check whether the issue affects one device or every device on the network.', 'Compare Wi-Fi signal strength near the access point.', 'Restart the network adapter and verify the saved network profile.', 'Record the error and router indicator state if the issue persists.'] },
  { title: 'Printer and peripheral troubleshooting', level: 'PERIPHERALS', steps: ['Verify power, cabling, paper path and consumables.', 'Confirm the correct printer queue and device driver.', 'Check network reachability for wireless or shared printers.', 'Capture the model number and error code before booking service.'] },
]

const softwareLinks = [
  { name: 'Microsoft 365', href: 'https://www.microsoft.com/microsoft-365', type: 'Productivity suite' },
  { name: 'Google Chrome', href: 'https://www.google.com/chrome/', type: 'Web browser' },
  { name: 'Mozilla Firefox', href: 'https://www.mozilla.org/firefox/new/', type: 'Web browser' },
  { name: '7-Zip', href: 'https://www.7-zip.org/', type: 'Archive utility' },
  { name: 'VLC Media Player', href: 'https://www.videolan.org/vlc/', type: 'Media utility' },
  { name: 'Visual Studio Code', href: 'https://code.visualstudio.com/', type: 'Developer tooling' },
  { name: 'Malwarebytes', href: 'https://www.malwarebytes.com/', type: 'Endpoint security' },
  { name: 'Rufus', href: 'https://rufus.ie/', type: 'Boot media utility' },
]

type RequestResult = { trackingCode: string; message: string }
type TrackingResult = { trackingCode: string; serviceType: string; device: string; statusCode: string; status: string; quote: { amount: string; currency: string } | null; createdAt: string; updatedAt: string }

const inputClass = 'mt-2 w-full border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f26522] focus:ring-2 focus:ring-orange-100'
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-slate-600'

export default function ComputerPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', serviceType: 'PC Maintenance', deviceDetails: '', issueDescription: '', preferredDate: '' })
  const [submitting, setSubmitting] = useState(false)
  const [requestResult, setRequestResult] = useState<RequestResult | null>(null)
  const [requestError, setRequestError] = useState('')
  const [tracking, setTracking] = useState({ code: '', email: '' })
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)
  const [trackingError, setTrackingError] = useState('')
  const [trackingBusy, setTrackingBusy] = useState(false)
  const [activeGuide, setActiveGuide] = useState(0)

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setRequestError('')
    setRequestResult(null)
    try {
      const response = await fetch('/api/computer/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request could not be saved.')
      setRequestResult(data)
      setForm({ name: '', email: '', phone: '', serviceType: 'PC Maintenance', deviceDetails: '', issueDescription: '', preferredDate: '' })
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Request could not be saved.')
    } finally {
      setSubmitting(false)
    }
  }

  async function lookupRepair(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTrackingBusy(true)
    setTrackingError('')
    setTrackingResult(null)
    try {
      const params = new URLSearchParams({ code: tracking.code, email: tracking.email })
      const response = await fetch(`/api/computer/requests?${params.toString()}`, { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Tracking lookup failed.')
      setTrackingResult(data.request)
    } catch (error) {
      setTrackingError(error instanceof Error ? error.message : 'Tracking lookup failed.')
    } finally {
      setTrackingBusy(false)
    }
  }

  return (
    <PageFrame eyebrow="ALTAVOX TECHNICAL SERVICES / COMPUTING" title="IT Operations & Computer Support" intro="Technical services for endpoint systems, operating systems, software, hardware and user environments. Submit a service request, access verified software sources and follow your work-order status.">
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-0 border border-slate-200 bg-white lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden bg-[#061d35] p-7 text-white sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
            <div className="relative">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-300"><CircleDot className="size-3" /> Technical service desk</div>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">Diagnose. Resolve. Maintain. Secure.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">A structured support channel for personal computers, business workstations, operating systems, applications and connected devices.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#service-request" className="inline-flex items-center gap-2 bg-[#f26522] px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Open service request <ArrowRight className="size-4" /></a>
                <a href="#work-order" className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Track work order <Search className="size-4" /></a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-slate-50">
            {[
              { icon: Laptop, label: 'Endpoint systems', value: 'PC / Laptop' },
              { icon: Network, label: 'Connectivity', value: 'Wi-Fi / LAN' },
              { icon: HardDrive, label: 'Storage & memory', value: 'SSD / RAM' },
              { icon: LockKeyhole, label: 'Security posture', value: 'OS / Apps' },
            ].map((item, index) => {
              const Icon = item.icon
              return <div key={item.label} className={`flex flex-col justify-between border-b border-l border-slate-200 p-5 sm:p-6 ${index > 1 ? 'border-b-0' : ''}`}>
                <Icon className="size-5 text-[#f26522]" />
                <div className="mt-8"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</p><p className="mt-1 text-sm font-bold text-[#07294d]">{item.value}</p></div>
              </div>
            })}
          </div>
        </section>

        <section id="service-catalog">
          <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">01 / Service catalogue</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#07294d]">Technical capabilities</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Ten service functions organised around the full lifecycle of computer support.</p></div>
            <span className="font-mono text-xs text-slate-500">AVX / COMPUTE / 010</span>
          </div>
          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => {
              const Icon = service.icon
              const target = service.id === 'Repair Tracking' ? '#work-order' : service.id === 'IT Knowledge Base' ? '#knowledge-base' : service.id === 'Quotations & Invoices' ? '#quotations' : '#service-request'
              return <a key={service.id} href={target} className="group flex min-h-56 flex-col border-b border-r border-slate-200 bg-white p-5 transition hover:bg-slate-50">
                <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-slate-400">0{index + 1}</span><Icon className="size-5 text-[#f26522]" /></div>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">{service.category}</p>
                <h3 className="mt-2 text-sm font-bold leading-5 text-[#07294d] group-hover:text-[#f26522]">{service.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{service.detail}</p>
                <p className="mt-auto flex items-center gap-1 pt-4 text-[10px] font-semibold text-slate-500">{service.scope}<ChevronRight className="ml-auto size-3 shrink-0" /></p>
              </a>
            })}
          </div>
        </section>

        <section id="service-request" className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">02 / Service management</p>
            <h2 className="mt-2 text-2xl font-bold text-[#07294d]">Create a technical service request</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Provide accurate device and fault information. The service desk uses these details to review the request and determine the appropriate next step.</p>
            <div className="mt-7 border-l-2 border-[#f26522] pl-4">
              <p className="text-xs font-bold text-[#07294d]">Request lifecycle</p>
              <ol className="mt-3 space-y-3 text-xs text-slate-600">
                {['Request submitted and reference generated', 'Technical review and issue triage', 'Quotation or service scope confirmed', 'Work authorised and service performed', 'Completion status recorded'].map((step, i) => <li key={step} className="flex gap-3"><span className="font-mono text-[#f26522]">0{i + 1}</span>{step}</li>)}
              </ol>
            </div>
            <p className="mt-7 flex gap-2 text-xs leading-5 text-slate-500"><LockKeyhole className="size-4 shrink-0 text-[#f26522]" /> Submit only information needed to diagnose the device. Never include passwords, PINs or authentication codes.</p>
          </div>
          <form onSubmit={submitRequest} className="border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4"><div><p className="text-xs font-bold text-[#07294d]">New service intake</p><p className="mt-1 text-[10px] text-slate-500">All fields marked * are required</p></div><span className="font-mono text-[10px] text-slate-400">FORM / CS-01</span></div>
            <div className="space-y-5 p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>Customer / contact name *<input required maxLength={120} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} autoComplete="name" /></label>
                <label className={labelClass}>Business email *<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} autoComplete="email" /></label>
                <label className={labelClass}>Phone / WhatsApp *<input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} autoComplete="tel" /></label>
                <label className={labelClass}>Requested service *<select value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })} className={inputClass}>{services.map(s => <option key={s.id}>{s.id}</option>)}</select></label>
              </div>
              <div className="border-t border-slate-100 pt-5"><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Device & incident details</p>
                <label className={labelClass}>Device make, model and operating system *<input required maxLength={300} value={form.deviceDetails} onChange={e => setForm({ ...form, deviceDetails: e.target.value })} placeholder="e.g. Dell Latitude 5420 · Windows 11 Pro · 16 GB RAM" className={inputClass} /></label>
                <label className={`${labelClass} mt-4`}>Fault symptoms / requested configuration *<textarea required maxLength={2000} rows={5} value={form.issueDescription} onChange={e => setForm({ ...form, issueDescription: e.target.value })} placeholder="Describe symptoms, error codes, recent changes and the outcome you need…" className={inputClass} /></label>
                <label className={`${labelClass} mt-4 max-w-xs`}>Preferred service date<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.preferredDate} onChange={e => setForm({ ...form, preferredDate: e.target.value })} className={inputClass} /></label>
              </div>
              {requestError && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{requestError}</p>}
              {requestResult && <div role="status" className="border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><div className="flex items-center gap-2 font-bold"><BadgeCheck className="size-5" /> Request successfully recorded</div><p className="mt-2 text-xs">Service reference</p><p className="mt-1 font-mono text-2xl font-bold">{requestResult.trackingCode}</p><p className="mt-2 text-xs">{requestResult.message} Keep this reference and use the same email address for status lookup.</p></div>}
              <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center"><p className="max-w-sm text-[10px] leading-5 text-slate-500">Submitting a request does not confirm a booking or authorise paid work. The service desk will review and confirm the next step.</p><button disabled={submitting} className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#f26522] px-6 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50">{submitting ? 'Submitting request…' : 'Submit service request'} <ArrowRight className="size-4" /></button></div>
            </div>
          </form>
        </section>

        <section id="work-order" className="grid gap-8 border-y border-slate-200 bg-slate-50 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-7">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">03 / Work order visibility</p><h2 className="mt-2 text-2xl font-bold text-[#07294d]">Track a service request</h2><p className="mt-3 text-sm leading-7 text-slate-600">Retrieve the latest status recorded by the service desk. For privacy, the lookup requires both the unique service reference and the booking email.</p><div className="mt-5 flex items-center gap-2 text-xs text-slate-500"><ClipboardCheck className="size-4 text-[#f26522]" /> Status reflects the latest saved work-order update.</div></div>
          <div>
            <form onSubmit={lookupRepair} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <label className={labelClass}>Service reference<input required placeholder="AVX-12AB34CD56EF" value={tracking.code} onChange={e => setTracking({ ...tracking, code: e.target.value.toUpperCase() })} className={inputClass} /></label>
              <label className={labelClass}>Booking email<input required type="email" placeholder="name@example.com" value={tracking.email} onChange={e => setTracking({ ...tracking, email: e.target.value })} className={inputClass} /></label>
              <button disabled={trackingBusy} className="inline-flex h-[43px] items-center justify-center gap-2 bg-[#07294d] px-5 text-xs font-bold text-white hover:bg-[#0b3b69] disabled:opacity-50">{trackingBusy ? 'Checking…' : 'Check status'} <Search className="size-4" /></button>
            </form>
            {trackingError && <p role="alert" className="mt-3 text-sm text-red-700">{trackingError}</p>}
            {trackingResult && <div className="mt-5 border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs font-bold text-[#f26522]">{trackingResult.trackingCode}</p><h3 className="mt-1 text-lg font-bold text-[#07294d]">{trackingResult.status}</h3></div><span className="border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">Work order status</span></div><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Work order lifecycle</p><ol className="mt-3 grid gap-2 sm:grid-cols-5">{[{ key: "received", label: "Received" }, { key: "reviewing", label: "Technical review" }, { key: "quoted", label: "Quotation" }, { key: "in_progress", label: "In progress" }, { key: "ready", label: "Ready" }].map((stage, index) => { const stages = ["received", "reviewing", "quoted", "approved", "in_progress", "ready", "completed"]; const current = stages.indexOf(trackingResult.statusCode); const done = current >= stages.indexOf(stage.key); return <li key={stage.key} className={`border-l-2 pl-2 py-1 text-[10px] ${done ? "border-[#f26522] text-[#07294d] font-bold" : "border-slate-200 text-slate-400"}`}><span className="block font-mono">0{index + 1}</span>{stage.label}</li> })}</ol></div><div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-xs sm:grid-cols-2"><p><span className="block text-slate-400">Requested service</span><strong className="mt-1 block text-slate-700">{trackingResult.serviceType}</strong></p><p><span className="block text-slate-400">Device</span><strong className="mt-1 block text-slate-700">{trackingResult.device}</strong></p>{trackingResult.quote && <p><span className="block text-slate-400">Recorded quotation</span><strong className="mt-1 block text-slate-700">{trackingResult.quote.currency} {Number(trackingResult.quote.amount).toLocaleString()}</strong></p>}<p><span className="block text-slate-400">Last updated</span><strong className="mt-1 block text-slate-700">{new Date(trackingResult.updatedAt).toLocaleString()}</strong></p></div></div>}
          </div>
        </section>

        <section id="software">
          <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">04 / Application management</p><h2 className="mt-2 text-2xl font-bold text-[#07294d]">Verified software sources</h2><p className="mt-2 text-sm text-slate-600">Official publisher destinations for commonly used system and productivity tools.</p></div><span className="text-[10px] text-slate-400">EXTERNAL PUBLISHER LINKS</span></div>
          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">{softwareLinks.map((item, index) => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border-b border-r border-slate-200 bg-white p-4 hover:bg-slate-50"><span><span className="block font-mono text-[10px] text-slate-400">APP / 0{index + 1}</span><strong className="mt-1 block text-sm text-[#07294d]">{item.name}</strong><span className="mt-1 block text-xs text-slate-500">{item.type}</span></span><ExternalLink className="size-4 shrink-0 text-[#f26522]" /></a>)}</div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Downloads are hosted by their respective publishers. Licence terms, compatibility and installation requirements are controlled by each publisher.</p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">05 / Endpoint security</p><h2 className="mt-2 text-xl font-bold text-[#07294d]">Security baseline</h2><p className="mt-2 text-sm leading-6 text-slate-600">A practical baseline for reducing common endpoint risks.</p>
            <ul className="mt-5 space-y-3">{['Apply operating system and application security updates.', 'Enable firewall and reputable endpoint protection.', 'Use genuine, supported software and remove unknown activators.', 'Maintain tested backups of business-critical data.', 'Enforce unique passwords and multi-factor authentication.', 'Restrict remote access and review permissions regularly.'].map(x => <li key={x} className="flex gap-3 text-xs leading-5 text-slate-600"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]" />{x}</li>)}</ul>
          </div>
          <div className="border border-slate-200 bg-[#07294d] p-6 text-white sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-300">06 / Remote operations</p><h2 className="mt-2 text-xl font-bold">Remote technical assistance</h2><p className="mt-3 text-sm leading-7 text-slate-300">Remote sessions are arranged after request review. A technician confirms the scope, obtains your approval and provides the connection procedure for the agreed session.</p>
            <div className="mt-5 border-t border-white/15 pt-4"><p className="flex gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="size-4 shrink-0 text-orange-300" /> Never disclose passwords, banking credentials, PINs or one-time authentication codes during support.</p><a href="#service-request" onClick={() => setForm(current => ({ ...current, serviceType: 'Remote Support' }))} className="mt-5 inline-flex items-center gap-2 bg-[#f26522] px-4 py-3 text-xs font-bold text-white">Request remote assistance <ArrowRight className="size-4" /></a></div>
          </div>
        </section>

        <section id="knowledge-base">
          <div className="mb-6 border-b border-slate-200 pb-5"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">07 / Technical documentation</p><h2 className="mt-2 text-2xl font-bold text-[#07294d]">IT knowledge base</h2><p className="mt-2 text-sm text-slate-600">Initial troubleshooting procedures for common endpoint and peripheral incidents.</p></div>
          <div className="grid gap-0 border border-slate-200 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">{guides.map((guide, index) => <button key={guide.title} onClick={() => setActiveGuide(index)} className={`flex w-full items-center justify-between border-b border-slate-200 px-5 py-4 text-left last:border-b-0 ${activeGuide === index ? 'bg-[#07294d] text-white' : 'bg-white text-[#07294d] hover:bg-slate-50'}`}><span><span className={`block font-mono text-[9px] tracking-widest ${activeGuide === index ? 'text-orange-300' : 'text-slate-400'}`}>{guide.level}</span><span className="mt-1 block text-xs font-bold">{guide.title}</span></span><ChevronRight className="size-4 shrink-0" /></button>)}</div>
            <article className="bg-slate-50 p-6 sm:p-8"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#f26522]"><BookOpen className="size-4" /> Technical procedure</div><h3 className="mt-3 text-lg font-bold text-[#07294d]">{guides[activeGuide].title}</h3><ol className="mt-5 space-y-4">{guides[activeGuide].steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="font-mono text-xs font-bold text-[#f26522]">0{index + 1}</span>{step}</li>)}</ol></article>
          </div>
        </section>

        <section id="quotations" className="grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f26522]">08 / Commercial services</p><h2 className="mt-2 text-2xl font-bold text-[#07294d]">Quotations & service billing</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">Request an itemised quotation by selecting “Quotations & Invoices” in the service intake form. The service desk reviews the device, scope and parts requirements before confirming an estimate. No chargeable work is authorised by submitting the form alone.</p></div>
          <a href="#service-request" onClick={() => setForm(current => ({ ...current, serviceType: 'Quotations & Invoices' }))} className="inline-flex items-center justify-center gap-2 bg-[#f26522] px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Request quotation <FileText className="size-4" /></a>
        </section>

        <section className="border-t border-slate-200 pt-5"><div className="flex flex-col gap-3 text-[10px] leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>ALTAVOX TECH · COMPUTER SERVICES · SERVICE DESK</p><p>All service stages reflect recorded information. Scheduling, pricing and completion are confirmed separately.</p></div></section>
      </div>
    </PageFrame>
  )
}
