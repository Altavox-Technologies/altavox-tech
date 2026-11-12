import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Layers3 } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { SevenCipherSeal } from '@/components/system-pages/seven-cipher-seal'

const systems = [
  { id: 'A', name: 'Codex Knowledge', area: 'Engineering decisions', href: '/codex', feeds: 'Architecture guidance' },
  { id: 'B', name: 'Enigma Diagnostic', area: 'Guided troubleshooting', href: '/enigma', feeds: 'Diagnostic checklists' },
  { id: 'C', name: 'Research Lab & RFCs', area: 'Research and prototypes', href: '/research-lab', feeds: 'Research notes' },
  { id: 'D', name: 'Digital Archive', area: 'Published records', href: '/archive', feeds: 'Public record index' },
  { id: 'E', name: 'Atlas System Map', area: 'System navigation', href: '/atlas', feeds: 'System relationships' },
  { id: 'F', name: 'Security Challenge', area: 'Defensive learning', href: '/security-challenge', feeds: 'Security principles' },
  { id: 'G', name: 'Altavox Origin', area: 'History and charter', href: '/origin', feeds: 'Company context' },
]

export function AtlasPage() {
  return (
    <PageFrame eyebrow="System E · Architecture index" title="Atlas System Map" intro="A navigable map of the seven public systems and how they relate. This is a documented architecture index, not live network telemetry.">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs sm:p-7">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-[#07294d] text-white"><Layers3 className="size-5" aria-hidden="true" /></div>
          <h2 className="mt-3 text-sm font-bold text-[#07294d]">Altavox public systems</h2>
          <p className="mt-1 text-xs text-slate-600">Shared navigation connects each system to its published purpose and relevant records.</p>
          <ArrowDown className="mx-auto mt-3 size-4 text-[#f26522]" aria-hidden="true" />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Seven systems">
          {systems.map((system) => <article key={system.id} className="flex min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#f26522]">SYSTEM {system.id}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700">{system.area}</span></div>
            <h3 className="mt-3 text-base font-bold text-[#07294d]">{system.name}</h3><p className="mt-1 flex-1 text-xs leading-relaxed text-slate-600">Publishes {system.feeds.toLowerCase()} for the Altavox ecosystem.</p>
            <Link href={system.href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#f26522] hover:underline">Open system <ArrowUpRight className="size-3.5" /></Link>
          </article>)}
        </div>
        <div className="mt-8"><SevenCipherSeal system="atlas" /></div>
      </section>
    </PageFrame>
  )
}
