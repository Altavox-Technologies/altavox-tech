'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Archive, ArrowUpRight, Search } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal'

const records = [
  { title: 'Company overview', type: 'Company', updated: 'Public page', href: '/about', description: 'Organization background and engineering focus.' },
  { title: 'Privacy policy', type: 'Governance', updated: 'Public page', href: '/privacy', description: 'How the site describes privacy and data handling.' },
  { title: 'Terms of service', type: 'Governance', updated: 'Public page', href: '/terms', description: 'Terms governing the use of Altavox services.' },
  { title: 'Refund policy', type: 'Governance', updated: 'Public page', href: '/refund', description: 'Published refund and cancellation information.' },
  { title: 'Research Lab', type: 'Research', updated: 'Current index', href: '/research-lab', description: 'Research prototypes and RFC-oriented project notes.' },
  { title: 'Codex Knowledge', type: 'Engineering', updated: 'Current index', href: '/codex', description: 'Published architecture decisions and operating principles.' },
  { title: 'Altavox Origin', type: 'History', updated: 'Current index', href: '/origin', description: 'The public company timeline and architectural charter.' },
]

export function ArchivePage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const types = ['All', ...Array.from(new Set(records.map((item) => item.type)))]
  const filtered = useMemo(() => records.filter((item) => {
    const matchesType = type === 'All' || item.type === type
    const matchesQuery = !query.trim() || `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesType && matchesQuery
  }), [query, type])

  return (
    <PageFrame eyebrow="System D · Public records index" title="Digital Archive" intro="Browse published public records and system indexes. This is a navigable catalog, not a cryptographic vault; it does not claim document hashes or private files that are not published here.">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <label htmlFor="archive-search" className="text-xs font-semibold text-slate-700">Search published records</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3"><Search className="size-4 text-slate-500" aria-hidden="true" /><input id="archive-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, type, or summary" className="min-h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500" /></div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter records by type">
            {types.map((item) => <button key={item} type="button" aria-pressed={type === item} onClick={() => setType(item)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${type === item ? 'bg-[#07294d] text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-[#f26522]'}`}>{item}</button>)}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
          {filtered.map((record) => <article key={record.href} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#f26522]"><Archive className="size-5" aria-hidden="true" /></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700">{record.type}</span></div>
            <h2 className="mt-4 text-base font-bold text-[#07294d]">{record.title}</h2><p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{record.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-[11px] text-slate-500">{record.updated}</span><Link href={record.href} className="inline-flex items-center gap-1 text-xs font-bold text-[#f26522] hover:underline">Open record <ArrowUpRight className="size-3.5" /></Link></div>
          </article>)}
          {filtered.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600 sm:col-span-2">No published records match your search.</p>}
        </div>
        <div className="mt-8"><SevenCipherSeal system="archive" /></div>
      </section>
    </PageFrame>
  )
}
