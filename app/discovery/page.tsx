'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import {
  ArrowRight, BookOpen, Brain, Compass, Fingerprint, FlaskConical, Globe2,
  KeyRound, LibraryBig, LockKeyhole, Search, ShieldCheck, Sparkles
} from 'lucide-react'

type ModuleId = 'codex' | 'enigma' | 'research' | 'archive' | 'atlas' | 'security' | 'origin'

const modules: { id: ModuleId; name: string; label: string; description: string; icon: typeof BookOpen }[] = [
  { id: 'codex', name: 'ALTAVOX CODEX', label: 'Knowledge & history', description: 'Explore historical mysteries, scientific discoveries, symbols and primary sources.', icon: BookOpen },
  { id: 'enigma', name: 'ALTAVOX ENIGMA', label: 'Puzzles & cryptography', description: 'Learn classical ciphers, pattern recognition and structured problem solving.', icon: Brain },
  { id: 'research', name: 'RESEARCH LAB', label: 'Research workspace', description: 'Plan investigations, evaluate evidence and document reproducible findings.', icon: FlaskConical },
  { id: 'archive', name: 'ALTAVOX ARCHIVE', label: 'Digital library', description: 'A curated starting point for books, papers, standards and engineering references.', icon: LibraryBig },
  { id: 'atlas', name: 'ALTAVOX ATLAS', label: 'Knowledge map', description: 'Navigate the relationships between disciplines, technologies and discoveries.', icon: Globe2 },
  { id: 'security', name: 'SECURITY CHALLENGE', label: 'Defensive security', description: 'Practice secure engineering through safe, self-contained learning challenges.', icon: ShieldCheck },
  { id: 'origin', name: 'ALTAVOX ORIGIN', label: 'Company story', description: 'The principles, identity and engineering mission behind Altavox Tech.', icon: Fingerprint },
]

const codexTopics = [
  { title: 'The Da Vinci Code: fact, theory & fiction', category: 'Historical inquiry', detail: 'Separate documented people and places from interpretations and the novel’s fictional plot. Start with Leonardo’s notebooks, the history of the Templars and the provenance of claims about the Priory of Sion.' },
  { title: 'The history of cryptography', category: 'Mathematics & computing', detail: 'Trace secret writing from substitution ciphers to modern public-key cryptography. Learn what each method protects against and where it fails.' },
  { title: 'How to read historical evidence', category: 'Research methods', detail: 'Check authorship, date, provenance, translation, independent corroboration and the difference between a primary source and a later retelling.' },
  { title: 'Symbols in art and architecture', category: 'Art history', detail: 'Study symbols in their original cultural setting. A visual resemblance alone is not proof of a hidden message or secret organisation.' },
]

const archiveResources = [
  { name: 'Project Gutenberg', kind: 'Public-domain books', url: 'https://www.gutenberg.org/' },
  { name: 'Internet Archive', kind: 'Books and historical collections', url: 'https://archive.org/' },
  { name: 'arXiv', kind: 'Research preprints', url: 'https://arxiv.org/' },
  { name: 'DOAJ', kind: 'Open-access journals', url: 'https://doaj.org/' },
  { name: 'NIST Cybersecurity', kind: 'Security standards and guidance', url: 'https://www.nist.gov/cybersecurity' },
  { name: 'CERN Document Server', kind: 'Science and engineering papers', url: 'https://cds.cern.ch/' },
]

const atlasNodes = [
  { name: 'Computer Science', detail: 'Algorithms, operating systems, databases and distributed systems.', links: 'Cryptography · AI · Software architecture' },
  { name: 'Human History', detail: 'Primary sources, archaeology, languages and historical methods.', links: 'Manuscripts · Trade · Civilisations' },
  { name: 'Natural Sciences', detail: 'Physics, biology, chemistry and reproducible experimentation.', links: 'Scientific method · Measurement · Models' },
  { name: 'Engineering', detail: 'Design, build, test and maintain systems under real constraints.', links: 'Networks · Energy · Materials' },
  { name: 'African Innovation', detail: 'Technology, research and practical problem-solving across Africa.', links: 'AgriTech · HealthTech · Connectivity' },
]

const challenges = [
  { question: 'Which practice best protects passwords stored by a web application?', options: ['Encrypt with a reversible shared key', 'Hash with Argon2id or bcrypt using unique salts', 'Store in browser localStorage'], answer: 1, explain: 'Use a dedicated password-hashing function with per-password salts and suitable cost settings. Never store plaintext passwords.' },
  { question: 'A security researcher finds a flaw in a system they do not own. What is the right first step?', options: ['Exploit it to collect proof', 'Publish user data', 'Follow the owner’s responsible disclosure process'], answer: 2, explain: 'Only test systems with explicit authorization. Minimize access, preserve evidence safely and report through the approved channel.' },
  { question: 'What does least privilege mean?', options: ['Give each account only the access needed for its task', 'Give everyone administrator access', 'Disable audit logs'], answer: 0, explain: 'Least privilege limits the impact of mistakes and compromised accounts.' },
]

function caesar(input: string, shift: number, decode = false) {
  const offset = ((decode ? -shift : shift) % 26 + 26) % 26
  return input.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65
    return String.fromCharCode(((char.charCodeAt(0) - base + offset) % 26) + base)
  })
}

export default function DiscoveryPage() {
  const [active, setActive] = useState<ModuleId>('codex')
  const [query, setQuery] = useState('')
  const [cipherText, setCipherText] = useState('ALTAVOX DISCOVERS')
  const [shift, setShift] = useState(3)
  const [decode, setDecode] = useState(false)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [expandedTopic, setExpandedTopic] = useState(0)
  const cipherResult = useMemo(() => caesar(cipherText, shift, decode), [cipherText, shift, decode])
  const filteredModules = modules.filter((item) => (item.name + ' ' + item.label + ' ' + item.description).toLowerCase().includes(query.toLowerCase()))
  const current = modules.find((item) => item.id === active)!

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100">
      <AltavoxHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0d1420]">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(214,175,93,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(214,175,93,.10) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-[#c8a45d]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.22em] text-[#dfbd76]">
                <Sparkles className="size-3.5" /> Altavox Discovery & Knowledge Hub
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Beyond what is known.<br /><span className="text-[#d6af5d]">Discover what is possible.</span></h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">A connected space for research, cryptography, historical inquiry, digital collections, knowledge exploration and defensive security learning.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setActive('enigma')} className="inline-flex items-center gap-2 bg-[#c49a4a] px-5 py-3 text-sm font-semibold text-[#11151b] hover:bg-[#dfbd76]">Try Enigma <ArrowRight className="size-4" /></button>
                <button onClick={() => setActive('codex')} className="border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-[#d6af5d]">Explore Codex</button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex aspect-square w-full max-w-[340px] items-center justify-center border border-[#c8a45d]/30">
                <div className="absolute inset-5 rounded-full border border-[#c8a45d]/30" />
                <div className="absolute inset-12 rounded-full border border-dashed border-[#c8a45d]/40" />
                <div className="absolute h-px w-full bg-[#c8a45d]/30" />
                <div className="absolute h-full w-px bg-[#c8a45d]/30" />
                <div className="relative flex size-36 items-center justify-center rounded-full border border-[#d6af5d]/60 bg-[#111a27] text-[#d6af5d] shadow-[0_0_70px_rgba(214,175,93,.12)]"><Fingerprint className="size-20 stroke-[1]" /></div>
                <span className="absolute left-4 top-5 text-[9px] tracking-[.2em] text-[#d6af5d]">KNOWLEDGE / 01</span>
                <span className="absolute bottom-5 right-4 text-[9px] tracking-[.2em] text-slate-500">EST. ALTAVOX</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map((item) => {
              const Icon = item.icon
              return <button key={item.id} onClick={() => setActive(item.id)} className={`group border p-4 text-left transition ${active === item.id ? 'border-[#d6af5d] bg-[#171d27]' : 'border-white/10 bg-[#101722] hover:border-white/30'}`}>
                <div className="flex items-center justify-between"><Icon className="size-5 text-[#d6af5d]" /><span className="text-[10px] text-slate-500">0{modules.indexOf(item) + 1}</span></div>
                <h2 className="mt-4 text-sm font-bold tracking-wide">{item.name}</h2>
                <p className="mt-1 text-xs text-[#d6af5d]">{item.label}</p>
                <p className="mt-3 text-xs leading-5 text-slate-400">{item.description}</p>
              </button>
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-4">
              <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a module..." className="w-full border border-white/15 bg-[#101722] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#d6af5d]" /></div>
              <nav className="space-y-1" aria-label="Discovery modules">
                {filteredModules.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className={`w-full border-l-2 px-3 py-3 text-left text-xs font-semibold ${active === item.id ? 'border-[#d6af5d] bg-white/5 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>{item.name}</button>)}
                {filteredModules.length === 0 && <p className="px-3 py-4 text-xs text-slate-500">No matching modules.</p>}
              </nav>
              <div className="border border-white/10 bg-[#101722] p-4 text-xs leading-6 text-slate-400"><LockKeyhole className="mb-2 size-4 text-[#d6af5d]" /> Research notes and challenge progress are currently local to this page. Account sync and publishing require a configured backend workflow.</div>
            </aside>

            <section className="min-h-[520px] border border-white/10 bg-[#0e151f] p-5 sm:p-8">
              <div className="border-b border-white/10 pb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#d6af5d]">Discovery module / {current.id}</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{current.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{current.description}</p>
              </div>

              {active === 'codex' && <div className="mt-6 space-y-3">
                <p className="text-xs uppercase tracking-widest text-slate-500">Featured investigations</p>
                {codexTopics.map((topic, index) => <article key={topic.title} className="border border-white/10">
                  <button onClick={() => setExpandedTopic(expandedTopic === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-4 text-left"><span><span className="block text-[10px] uppercase tracking-wider text-[#d6af5d]">{topic.category}</span><span className="mt-1 block text-sm font-semibold">{topic.title}</span></span><span className="text-xl text-[#d6af5d]">{expandedTopic === index ? '−' : '+'}</span></button>
                  {expandedTopic === index && <p className="border-t border-white/10 px-4 py-4 text-sm leading-7 text-slate-300">{topic.detail}</p>}
                </article>)}
                <p className="pt-3 text-xs leading-6 text-slate-500">Editorial rule: every investigation distinguishes primary evidence, scholarly interpretation, disputed claims and fiction. The presence of a mystery is not evidence that a conspiracy exists.</p>
              </div>}

              {active === 'enigma' && <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div><label className="mb-2 block text-xs font-semibold text-slate-300" htmlFor="cipher-text">Message</label><textarea id="cipher-text" value={cipherText} onChange={(e) => setCipherText(e.target.value)} rows={4} className="w-full border border-white/15 bg-[#080d14] p-3 text-sm text-white outline-none focus:border-[#d6af5d]" /></div>
                  <div className="flex flex-wrap items-center gap-4"><label className="text-xs text-slate-300">Shift <input type="number" min="0" max="25" value={shift} onChange={(e) => setShift(Math.max(0, Math.min(25, Number(e.target.value) || 0)))} className="ml-2 w-16 border border-white/15 bg-[#080d14] p-2 text-white" /></label><label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={decode} onChange={(e) => setDecode(e.target.checked)} /> Decode instead of encode</label></div>
                  <div className="border border-[#d6af5d]/30 bg-[#171d27] p-4"><p className="text-[10px] uppercase tracking-widest text-[#d6af5d]">Live Caesar cipher result</p><p className="mt-3 break-words font-mono text-lg">{cipherResult}</p><button onClick={() => navigator.clipboard?.writeText(cipherResult)} className="mt-3 text-xs text-[#d6af5d] underline">Copy result</button></div>
                </div>
                <div className="border border-white/10 p-5"><KeyRound className="size-6 text-[#d6af5d]" /><h3 className="mt-3 font-semibold">How Caesar cipher works</h3><p className="mt-2 text-sm leading-7 text-slate-400">Each letter is shifted by a fixed number of positions in the alphabet. It is useful for learning substitution ciphers, but it is not secure for protecting real information.</p><p className="mt-4 text-xs text-slate-500">Try: HELLO with a shift of 3 becomes KHOOR.</p></div>
              </div>}

              {active === 'research' && <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ['Research brief', 'Question, scope, hypothesis, constraints and expected output.'],
                  ['Source register', 'Author, title, publication date, source URL, evidence type and reliability notes.'],
                  ['Evidence log', 'Observation, supporting evidence, alternative explanations and confidence.'],
                  ['Reproducibility checklist', 'Methods, dataset provenance, tools, version, limitations and steps to reproduce.'],
                ].map(([title, detail]) => <div key={title} className="border border-white/10 p-5"><FlaskConical className="size-5 text-[#d6af5d]" /><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p></div>)}
                <div className="border border-[#d6af5d]/30 bg-[#171d27] p-5 md:col-span-2"><h3 className="text-sm font-semibold text-[#dfbd76]">Responsible research standard</h3><p className="mt-2 text-xs leading-6 text-slate-300">Use public, lawfully accessible sources. Respect privacy, licensing and research ethics. OSINT activities must not become stalking, credential theft, unauthorized access or doxxing.</p></div>
              </div>}

              {active === 'archive' && <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {archiveResources.map((resource) => <a key={resource.name} href={resource.url} target="_blank" rel="noreferrer" className="border border-white/10 p-4 transition hover:border-[#d6af5d]"><div className="flex items-center justify-between"><LibraryBig className="size-5 text-[#d6af5d]" /><ArrowRight className="size-4 text-slate-500" /></div><h3 className="mt-4 text-sm font-semibold">{resource.name}</h3><p className="mt-1 text-xs text-slate-400">{resource.kind}</p></a>)}
                <p className="text-xs leading-6 text-slate-500 sm:col-span-2">External collections retain their own access, copyright and licensing rules. Altavox does not claim ownership of these resources.</p>
              </div>}

              {active === 'atlas' && <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {atlasNodes.map((node, index) => <div key={node.name} className="border border-white/10 p-5"><div className="flex items-center gap-2 text-[#d6af5d]"><Compass className="size-4" /><span className="text-[10px] uppercase tracking-widest">Knowledge node 0{index + 1}</span></div><h3 className="mt-3 font-semibold">{node.name}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{node.detail}</p><p className="mt-3 border-t border-white/10 pt-3 text-[10px] text-[#d6af5d]">{node.links}</p></div>)}
                <p className="text-xs text-slate-500 sm:col-span-2">This first release is a curated knowledge map. Geographic pins and live institutional datasets will only be added when verified source data is connected.</p>
              </div>}

              {active === 'security' && <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#d6af5d]"><ShieldCheck className="size-4" /> Defensive security fundamentals / {Object.keys(answers).length} of {challenges.length} answered</div>
                {challenges.map((item, index) => <div key={item.question} className="border border-white/10 p-4"><p className="text-sm font-semibold">{index + 1}. {item.question}</p><div className="mt-3 space-y-2">{item.options.map((option, optionIndex) => <label key={option} className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-slate-300"><input type="radio" name={`challenge-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((old) => ({ ...old, [index]: optionIndex }))} className="mt-1 accent-[#d6af5d]" />{option}</label>)}</div>{answers[index] !== undefined && <p className={`mt-3 border-t border-white/10 pt-3 text-xs leading-6 ${answers[index] === item.answer ? 'text-emerald-300' : 'text-amber-200'}`}>{answers[index] === item.answer ? 'Correct. ' : 'Not quite. '}{item.explain}</p>}</div>)}
                <button onClick={() => setAnswers({})} className="border border-white/20 px-4 py-2 text-xs hover:border-[#d6af5d]">Reset challenge</button>
                <p className="text-xs text-slate-500">Learning-only quiz. No external systems are scanned or tested.</p>
              </div>}

              {active === 'origin' && <div className="mt-6 space-y-5">
                <div className="border-l-2 border-[#d6af5d] pl-5"><p className="text-[10px] uppercase tracking-widest text-[#d6af5d]">Our principle</p><h3 className="mt-2 text-xl font-semibold">Build useful technology. Verify what matters. Keep learning.</h3><p className="mt-3 text-sm leading-7 text-slate-400">Altavox Tech is a software engineering and digital product company building practical systems, connected services and learning experiences.</p></div>
                <div className="grid gap-3 sm:grid-cols-3">{[['Engineering','Systems designed around real operational needs.'],['Integrity','Evidence before claims; privacy and security by design.'],['Discovery','Curiosity, research and continuous improvement.']].map(([title, detail]) => <div key={title} className="border border-white/10 p-4"><h4 className="text-sm font-semibold text-[#dfbd76]">{title}</h4><p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p></div>)}</div>
                <Link href="/about" className="inline-flex items-center gap-2 text-xs font-semibold text-[#d6af5d] hover:underline">Company profile <ArrowRight className="size-3.5" /></Link>
              </div>}
            </section>
          </div>
        </section>
      </main>
      <AltavoxFooter />
    </div>
  )
}
