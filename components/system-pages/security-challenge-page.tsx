'use client'

import { useState } from 'react'
import { CheckCircle2, ShieldCheck, XCircle } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal'

const questions = [
  { prompt: 'A payment provider callback cannot be verified because the webhook secret is missing. What should the service do?', options: ['Accept the callback if its JSON says completed.', 'Keep the payment pending and report verification as unavailable.', 'Grant access and reconcile it later.'], answer: 1, explanation: 'Access is granted only after server-side verification. Missing credentials must fail closed.' },
  { prompt: 'An API request contains a customer ID in its body. How should a private order query be scoped?', options: ['Trust the submitted ID.', 'Use the authenticated or verified identity from the server session.', 'Return all orders and filter them in the browser.'], answer: 1, explanation: 'The server must derive the owner from a verified identity and scope the database query there.' },
  { prompt: 'A provider request takes too long and the page is waiting. Which response is safest?', options: ['Wait indefinitely.', 'Use a bounded timeout and return a safe retryable error.', 'Tell the user the payment succeeded.'], answer: 1, explanation: 'Bounded network calls limit resource use, and a timeout is not evidence of successful payment.' },
]

export function SecurityChallengePage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const question = questions[current]

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selected === null) return
    const nextScore = score + Number(selected === question.answer)
    setScore(nextScore)
    if (current === questions.length - 1) setFinished(true)
    else { setCurrent((value) => value + 1); setSelected(null) }
  }

  function restart() { setCurrent(0); setSelected(null); setScore(0); setFinished(false) }

  return (
    <PageFrame eyebrow="System F · Defensive learning" title="Security Challenge" intro="Practice secure engineering decisions with short defensive scenarios. This challenge is educational; it does not target systems, run exploits, or perform network scans.">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8" aria-live="polite">
          {finished ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-10 text-emerald-600" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold text-[#07294d]">Challenge complete</h2>
              <p className="mt-2 text-sm text-slate-700">Your score: <strong>{score} of {questions.length}</strong></p>
              <p className="mt-2 text-xs text-slate-600">Review each explanation to reinforce fail-closed verification, identity-scoped queries, and bounded requests.</p>
              <button type="button" onClick={restart} className="mt-5 min-h-11 rounded-xl bg-[#07294d] px-5 text-sm font-bold text-white hover:bg-[#0a3a69]">Try again</button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#07294d]"><ShieldCheck className="size-4 text-[#f26522]" aria-hidden="true" /> Defensive engineering</div><span className="text-xs font-mono text-slate-500">{current + 1} / {questions.length}</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Challenge progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={current}><div className="h-full rounded-full bg-[#f26522] transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
              <h2 className="mt-6 text-lg font-bold leading-relaxed text-[#07294d]">{question.prompt}</h2>
              <form onSubmit={submitAnswer} className="mt-5 space-y-3">
                {question.options.map((option, index) => <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${selected === index ? 'border-[#f26522] bg-orange-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <input type="radio" name={`question-${current}`} value={index} checked={selected === index} onChange={() => setSelected(index)} className="mt-1 accent-[#f26522]" />
                  <span className="text-slate-800">{option}</span>
                </label>)}
                <button type="submit" disabled={selected === null} className="min-h-11 w-full rounded-xl bg-[#f26522] px-4 text-sm font-bold text-white hover:bg-[#d95316] disabled:cursor-not-allowed disabled:opacity-50">{current === questions.length - 1 ? 'Finish challenge' : 'Submit and continue'}</button>
              </form>
            </>
          )}
          <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500"><XCircle className="size-3.5" aria-hidden="true" />No network activity or external targets are used.</div>
        </div>
        <div className="mt-8"><SevenCipherSeal system="security" /></div>
      </section>
    </PageFrame>
  )
}
