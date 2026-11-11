'use client'

import { useState } from 'react'
import { Activity, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const diagnostics = {
  availability: {
    title: 'A route or service is unavailable',
    steps: ['Check the route directly and note its HTTP status.', 'Confirm the intended app service is running and listening on its configured port.', 'Review recent deploy or build output before changing application code.'],
  },
  database: {
    title: 'A database-backed feature is returning an error',
    steps: ['Confirm the feature reports a safe, actionable error rather than fabricated data.', 'Check that the expected table exists in the connected database schema.', 'Verify the query is scoped to the correct record owner and uses parameterized values.'],
  },
  payment: {
    title: 'A payment is pending or cannot be verified',
    steps: ['Do not grant access while the provider result is pending or unverified.', 'Compare the server-calculated amount and currency with the provider capture.', 'Check the provider webhook signature and reconcile the same event idempotently.'],
  },
  navigation: {
    title: 'A system link opens a not-found page',
    steps: ['Copy the exact route from the navigation link.', 'Confirm an App Router page exists at that route or add an explicit redirect to its canonical page.', 'Open the destination directly, then verify the header and footer links.'],
  },
} as const

type DiagnosticKey = keyof typeof diagnostics

export function EnigmaPage() {
  const [issue, setIssue] = useState<DiagnosticKey>('availability')
  const [system, setSystem] = useState('Website')
  const [result, setResult] = useState<(typeof diagnostics)[DiagnosticKey] | null>(null)

  function runDiagnostic(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResult(diagnostics[issue])
  }

  return (
    <PageFrame eyebrow="System B · Guided diagnostics" title="Enigma Diagnostic" intro="A local, defensive troubleshooting guide for common service, database, payment, and navigation symptoms. It does not scan networks or send your input anywhere.">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <form onSubmit={runDiagnostic} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-[#07294d]"><Activity className="size-4 text-[#f26522]" aria-hidden="true" /> Describe the symptom</div>
          <label htmlFor="enigma-system" className="mt-5 block text-xs font-semibold text-slate-700">System area</label>
          <select id="enigma-system" value={system} onChange={(event) => setSystem(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
            <option>Website</option><option>Database</option><option>Payments</option><option>Navigation</option><option>Network operations</option>
          </select>
          <label htmlFor="enigma-issue" className="mt-4 block text-xs font-semibold text-slate-700">Observed issue</label>
          <select id="enigma-issue" value={issue} onChange={(event) => setIssue(event.target.value as DiagnosticKey)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900">
            <option value="availability">Page or service unavailable</option><option value="database">Database-backed feature error</option><option value="payment">Payment pending or unverified</option><option value="navigation">System link not found</option>
          </select>
          <button type="submit" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#f26522] px-4 text-sm font-bold text-white hover:bg-[#d95316]">Run guided diagnostic</button>
          <p className="mt-4 text-xs leading-relaxed text-slate-600">Selected area: <span className="font-semibold text-slate-800">{system}</span>. This tool gives troubleshooting steps; it does not claim live health checks.</p>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8" aria-live="polite">
          {result ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-[#07294d]"><CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" /> Diagnostic checklist</div>
              <h2 className="mt-4 text-xl font-bold text-[#07294d]">{result.title}</h2>
              <ol className="mt-5 space-y-4">
                {result.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-700"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#07294d]">{index + 1}</span><span>{step}</span></li>)}
              </ol>
              <button type="button" onClick={() => setResult(null)} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#f26522] hover:underline"><RotateCcw className="size-3.5" /> Reset diagnostic</button>
            </>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center text-center">
              <ShieldCheck className="size-9 text-slate-400" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-[#07294d]">Ready for a safe diagnosis</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">Choose a symptom to get a practical checklist. Sensitive credentials and customer data are not requested.</p>
            </div>
          )}
        </div>
      </section>
    </PageFrame>
  )
}
