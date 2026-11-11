'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Search, ArrowUpRight } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const decisions = [
  {
    id: 'ADR-001',
    title: 'Use Neon Postgres as the application source of truth',
    category: 'Data',
    status: 'Accepted',
    summary: 'Persistent customer, order, inquiry, and operational records belong in PostgreSQL. Browser state is not treated as an authoritative record.',
    rationale: 'Transactions, constraints, and queryable audit history are required for dependable operations.',
    href: '/about',
  },
  {
    id: 'ADR-002',
    title: 'Fail closed when payment verification is unavailable',
    category: 'Security',
    status: 'Accepted',
    summary: 'A checkout or webhook must not grant access without provider-side verification of the actual transaction.',
    rationale: 'A missing credential, invalid signature, or mismatched amount is an unverified payment, never a successful one.',
    href: '/security-challenge',
  },
  {
    id: 'ADR-003',
    title: 'Keep system guidance accessible and server-routed',
    category: 'Web',
    status: 'Accepted',
    summary: 'Use semantic App Router pages and keyboard-accessible controls for public systems and documentation.',
    rationale: 'Direct links, browser navigation, and assistive technology should all reach the same feature.',
    href: '/research-lab',
  },
]

const categories = ['All', ...Array.from(new Set(decisions.map((item) => item.category)))]

export function CodexPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return decisions.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesQuery = !normalized || `${item.id} ${item.title} ${item.summary} ${item.rationale}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <PageFrame eyebrow="System A · Knowledge base" title="Codex Knowledge" intro="A concise index of engineering decisions and operating principles. Search and filter the currently published records below.">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <label htmlFor="codex-search" className="text-xs font-semibold text-slate-700">Search decisions</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3">
            <Search className="size-4 text-slate-500" aria-hidden="true" />
            <input id="codex-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, topic, or ADR number" className="min-h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${category === item ? 'bg-[#07294d] text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-[#f26522]'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4" aria-live="polite">
          {filtered.length ? filtered.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-[#f26522]">{item.id}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">{item.category}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800">{item.status}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-[#07294d] sm:text-xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.summary}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-600"><span className="font-semibold text-slate-800">Rationale: </span>{item.rationale}</p>
              <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#f26522] hover:underline">Related system <ArrowUpRight className="size-3.5" /></Link>
            </article>
          )) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <BookOpen className="mx-auto size-7 text-slate-400" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-slate-800">No decisions match that search.</p>
              <button type="button" onClick={() => { setQuery(''); setCategory('All') }} className="mt-3 text-xs font-bold text-[#f26522] hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </PageFrame>
  )
}
