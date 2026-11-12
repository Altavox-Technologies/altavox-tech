'use client'

import { useState } from 'react'
import { Activity, CheckCircle2, Download, RotateCcw, ShieldCheck } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal'

const runbooks = {
  outage: {
    title: 'Site or service outage',
    urgency: 'P1 · Widespread outage',
    next: 'If more than one site is affected, compare the upstream/backhaul state and escalate with the timestamps and affected site codes.',
    steps: [
      { id: 'scope', title: 'Scope the impact', detail: 'Confirm whether one subscriber, one access point, or multiple sites are affected. Record counts, not customer names.' },
      { id: 'power', title: 'Check safe local power', detail: 'Ask the onsite contact to confirm equipment power and visible status indicators. Do not open energized equipment.' },
      { id: 'path', title: 'Compare the path', detail: 'Compare a wired test with Wi-Fi and check the managed backhaul or upstream status page.' },
      { id: 'escalate', title: 'Preserve an escalation trail', detail: 'Record when symptoms began, the last known healthy time, affected site codes, and each check result.' },
    ],
  },
  slow: {
    title: 'Slow or intermittent service',
    urgency: 'P2 · Degraded service',
    next: 'Compare wired and Wi-Fi results across peak and off-peak periods; if both degrade together, investigate the shared backhaul or upstream path.',
    steps: [
      { id: 'compare', title: 'Separate Wi-Fi from uplink', detail: 'Compare one wired device with one Wi-Fi device at the same location and time.' },
      { id: 'time', title: 'Record when it happens', detail: 'Note start/end time and whether symptoms correlate with peak usage or weather.' },
      { id: 'signal', title: 'Check managed signal indicators', detail: 'Review the normal operator dashboard for signal quality, link stability, and error trends.' },
      { id: 'load', title: 'Compare shared capacity', detail: 'Check whether other sites on the same backhaul show the same pattern before changing configuration.' },
    ],
  },
  subscriber: {
    title: 'Subscriber cannot connect',
    urgency: 'P2 · Individual or access-point issue',
    next: 'If the account is active and the device is visible but cannot pass traffic, escalate with the site code, device reference, and the check results.',
    steps: [
      { id: 'account', title: 'Confirm service state', detail: 'Check the authorized billing system for an active service state; do not infer payment from a screenshot or message.' },
      { id: 'device', title: 'Confirm device visibility', detail: 'Use the approved management console to see whether the device is connected. Avoid sharing passwords or full customer details.' },
      { id: 'local', title: 'Separate local from network fault', detail: 'Test another known-good device at the same access point and compare a wired connection when available.' },
      { id: 'history', title: 'Check recent changes', detail: 'Record whether the issue followed a device swap, service renewal, or planned maintenance.' },
    ],
  },
  payment: {
    title: 'Payment recorded but service remains pending',
    urgency: 'P1 · Money and access mismatch',
    next: 'Keep access unchanged until the payment provider confirms the transaction server-side; send the order/reference ID to the authorized finance queue.',
    steps: [
      { id: 'identity', title: 'Match the reference', detail: 'Compare the order reference and account using authorized records; do not collect payment credentials.' },
      { id: 'provider', title: 'Check provider confirmation', detail: 'Verify provider status, amount, currency, and transaction reference from the server-side gateway or webhook record.' },
      { id: 'retry', title: 'Avoid duplicate collection', detail: 'Do not ask the user to pay again while the first transaction is unresolved. Record the current status and timestamp.' },
      { id: 'handoff', title: 'Escalate reconciliation', detail: 'Attach only the minimum transaction reference required by the finance team. Never paste tokens or card details.' },
    ],
  },
} as const

type IssueKey = keyof typeof runbooks

export function EnigmaPage() {
  const [issue, setIssue] = useState<IssueKey>('outage')
  const [system, setSystem] = useState('Jaslyn Net ISP')
  const [siteCode, setSiteCode] = useState('')
  const [startedAt, setStartedAt] = useState('')
  const [severity, setSeverity] = useState('P2 · Degraded')
  const [affectedCount, setAffectedCount] = useState('')
  const [notes, setNotes] = useState('')
  const [completedChecks, setCompletedChecks] = useState<string[]>([])
  const [reportMessage, setReportMessage] = useState('')

  const runbook = runbooks[issue]

  function changeIssue(value: IssueKey) {
    setIssue(value)
    setCompletedChecks([])
    setReportMessage('')
  }

  function toggleCheck(id: string) {
    setCompletedChecks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function downloadIncidentReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const checklist = runbook.steps.map((step) => `- [${completedChecks.includes(step.id) ? 'x' : ' '}] ${step.title}: ${step.detail}`).join('\n')
    const report = [
      '# Enigma field incident handoff',
      '',
      `- System: ${system}`,
      `- Site / POP code: ${siteCode.trim()}`,
      `- Issue: ${runbook.title}`,
      `- Severity: ${severity}`,
      `- Affected subscriber estimate: ${affectedCount || 'Not recorded'}`,
      `- Started at: ${startedAt || 'Not recorded'}`,
      '',
      '## Checks',
      checklist,
      '',
      '## Operator notes',
      notes.trim() || 'No additional notes.',
      '',
      '## Recommended next step',
      runbook.next,
      '',
      'This report was generated in the browser and was not uploaded or saved by Altavox.',
    ].join('\n')
    const file = new Blob([report], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    const safeSite = siteCode.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-') || 'site'
    anchor.href = url
    anchor.download = `enigma-incident-${safeSite}.md`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setReportMessage('Incident handoff downloaded. Review it before sharing; it remains on your device.')
  }

  function resetWorkbench() {
    setSiteCode('')
    setStartedAt('')
    setSeverity('P2 · Degraded')
    setAffectedCount('')
    setNotes('')
    setCompletedChecks([])
    setReportMessage('')
  }

  return (
    <PageFrame eyebrow="System B · Field diagnostics" title="Enigma Diagnostic" intro="A practical incident workbench for ISP and operations teams. Build a focused checklist, track checks during the visit, and download a handoff report without storing or uploading customer data.">
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={downloadIncidentReport} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#07294d]"><Activity className="size-4 text-[#f26522]" aria-hidden="true" /> Field incident details</div>
              <p className="mt-1 text-xs text-slate-600">Use a site or POP code, not a customer name, phone number, password, or payment credential.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-800"><ShieldCheck className="size-3.5" aria-hidden="true" /> Browser-only · No upload</span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="enigma-system" className="block text-xs font-semibold text-slate-700">Service or system</label>
              <select id="enigma-system" value={system} onChange={(event) => setSystem(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
                <option>Jaslyn Net ISP</option><option>School or campus network</option><option>Website or hosting</option><option>Payments</option><option>Internal platform</option>
              </select>
            </div>
            <div>
              <label htmlFor="enigma-site-code" className="block text-xs font-semibold text-slate-700">Site / POP code</label>
              <input id="enigma-site-code" value={siteCode} onChange={(event) => setSiteCode(event.target.value)} maxLength={40} required placeholder="e.g. ARK-POP-02" className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-500" />
            </div>
            <div>
              <label htmlFor="enigma-issue" className="block text-xs font-semibold text-slate-700">Observed issue</label>
              <select id="enigma-issue" value={issue} onChange={(event) => changeIssue(event.target.value as IssueKey)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
                <option value="outage">Site or service outage</option><option value="slow">Slow or intermittent service</option><option value="subscriber">Subscriber cannot connect</option><option value="payment">Payment / access mismatch</option>
              </select>
            </div>
            <div>
              <label htmlFor="enigma-severity" className="block text-xs font-semibold text-slate-700">Incident priority</label>
              <select id="enigma-severity" value={severity} onChange={(event) => setSeverity(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
                <option>P1 · Critical</option><option>P2 · Degraded</option><option>P3 · Localized</option>
              </select>
            </div>
            <div>
              <label htmlFor="enigma-affected" className="block text-xs font-semibold text-slate-700">Affected subscribers (estimate)</label>
              <input id="enigma-affected" type="number" min="0" max="1000000" value={affectedCount} onChange={(event) => setAffectedCount(event.target.value)} placeholder="Optional count" className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-500" />
            </div>
            <div>
              <label htmlFor="enigma-start" className="block text-xs font-semibold text-slate-700">Incident start time</label>
              <input id="enigma-start" type="datetime-local" value={startedAt} onChange={(event) => setStartedAt(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div><h2 className="text-base font-bold text-[#07294d]">{runbook.title}</h2><p className="mt-1 text-xs font-semibold text-[#b54708]">Suggested priority: {runbook.urgency}</p></div>
                <span className="text-[11px] font-mono text-slate-500">{completedChecks.length} / {runbook.steps.length} checks done</span>
              </div>
              <fieldset className="mt-4 space-y-3">
                <legend className="sr-only">Incident checklist</legend>
                {runbook.steps.map((step, index) => <label key={step.id} className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                  <input type="checkbox" checked={completedChecks.includes(step.id)} onChange={() => toggleCheck(step.id)} className="mt-1 size-4 shrink-0 accent-[#f26522]" />
                  <span><span className="block text-xs font-bold text-[#07294d]">{index + 1}. {step.title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-600">{step.detail}</span></span>
                </label>)}
              </fieldset>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5">
                <h3 className="text-sm font-bold text-[#07294d]">Recommended next step</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">{runbook.next}</p>
              </div>
              <div>
                <label htmlFor="enigma-notes" className="block text-xs font-semibold text-slate-700">Operator notes <span className="font-normal text-slate-500">(no personal data)</span></label>
                <textarea id="enigma-notes" value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={800} rows={5} placeholder="What was checked? What changed? Include times and non-sensitive observations." className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 placeholder:text-slate-500" />
                <p className="mt-1 text-right text-[10px] text-slate-500">{notes.length}/800</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="min-h-5 text-xs text-emerald-700" aria-live="polite">{reportMessage}</p>
            <div className="flex gap-2">
              <button type="button" onClick={resetWorkbench} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"><RotateCcw className="size-3.5" /> Clear form</button>
              <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#f26522] px-4 text-xs font-bold text-white hover:bg-[#d95316]"><Download className="size-3.5" /> Download handoff</button>
            </div>
          </div>
        </form>

        <SevenCipherSeal system="enigma" />
      </section>
    </PageFrame>
  )
}
