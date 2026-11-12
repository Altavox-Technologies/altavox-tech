'use client'

import { FormEvent, useState } from 'react'
import { KeyRound, LockKeyhole, Unlock } from 'lucide-react'

export type CipherSystem = 'codex' | 'enigma' | 'research' | 'archive' | 'atlas' | 'security' | 'origin'

const seals: Record<CipherSystem, { number: number; name: string; cipher: string; prompt: string; hint: string; answer: string; token: string }> = {
  codex: { number: 1, name: 'Codex', cipher: 'ARCHITECTURE → ?', prompt: 'Use the first-letter cipher on the word above.', hint: 'Read its first character from left to right.', answer: 'a', token: 'A' },
  enigma: { number: 2, name: 'Enigma', cipher: 'O  |  Caesar shift −3', prompt: 'Decode the letter by shifting three places backward.', hint: 'O → N → M → L.', answer: 'l', token: 'L' },
  research: { number: 3, name: 'Research Lab', cipher: 'TEST → evidence', prompt: 'In a research cycle, take the first letter of the step shown.', hint: 'The word is already written above the arrow.', answer: 't', token: 'T' },
  archive: { number: 4, name: 'Digital Archive', cipher: 'QQ==  |  Base64', prompt: 'Decode the Base64 value into its single ASCII character.', hint: 'QQ== is the Base64 encoding of the first alphabet letter.', answer: 'a', token: 'A' },
  atlas: { number: 5, name: 'Atlas', cipher: 'V  |  Roman numeral', prompt: 'Enter the Roman numeral shown; it is also the seal character.', hint: 'It represents five.', answer: 'v', token: 'V' },
  security: { number: 6, name: 'Security Challenge', cipher: 'ONLY trust verified events', prompt: 'Take the first letter of the defensive rule above.', hint: 'The safe rule begins with the word “Only”.', answer: 'o', token: 'O' },
  origin: { number: 7, name: 'Altavox Origin', cipher: 'The map marks the unknown point: X', prompt: 'Enter the map marker shown above.', hint: 'The final seal is the familiar mark on a treasure map.', answer: 'x', token: 'X' },
}

const finalCode = 'ALTAVOX'

export function SevenCipherSeal({ system, dark = false }: { system: CipherSystem; dark?: boolean }) {
  const seal = seals[system]
  const [answer, setAnswer] = useState('')
  const [opened, setOpened] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [code, setCode] = useState('')
  const [trailUnlocked, setTrailUnlocked] = useState(false)
  const shell = dark ? 'border-amber-500/30 bg-slate-950/75 text-slate-100' : 'border-amber-200 bg-white text-slate-800'
  const muted = dark ? 'text-slate-300' : 'text-slate-600'

  function solveSeal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (answer.trim().toLowerCase() === seal.answer) {
      setOpened(true)
      setFeedback(`Seal ${seal.number} opened. Record its character before moving on.`)
    } else {
      setFeedback('That does not match this seal. Try the hint and check the cipher type.')
    }
  }

  function solveTrail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = code.toUpperCase().replace(/[^A-Z]/g, '')
    setTrailUnlocked(normalized === finalCode)
    setFeedback(normalized === finalCode ? 'The seven-seal trail is complete.' : 'The final code does not match. Recheck the seal order A–G.')
  }

  return (
    <section className={`rounded-2xl border p-5 shadow-xs sm:p-7 ${shell}`} aria-labelledby={`cipher-title-${system}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><KeyRound className="size-4 text-amber-500" aria-hidden="true" /><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-600">Seven-seal cipher trail</p></div>
        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${dark ? 'bg-amber-500/15 text-amber-200' : 'bg-amber-50 text-amber-800'}`}>Seal {seal.number} of 7 · {seal.name}</span>
      </div>
      <h2 id={`cipher-title-${system}`} className={`mt-3 text-lg font-bold ${dark ? 'text-white' : 'text-[#07294d]'}`}>Find the hidden character</h2>
      <p className={`mt-1 text-xs leading-relaxed ${muted}`}>Solve this original, fictional puzzle clue and collect its character. No account, private data, or external service is involved; the puzzle does not protect system access.</p>
      <div className={`mt-4 rounded-xl border p-4 text-center font-mono text-lg font-bold tracking-[0.2em] ${dark ? 'border-slate-700 bg-slate-900 text-amber-200' : 'border-slate-200 bg-slate-50 text-[#07294d]'}`}>{seal.cipher}</div>
      <form onSubmit={solveSeal} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`cipher-answer-${system}`} className="sr-only">Answer for the {seal.name} seal</label>
        <input id={`cipher-answer-${system}`} value={answer} onChange={(event) => setAnswer(event.target.value)} maxLength={32} autoComplete="off" className={`min-h-11 flex-1 rounded-xl border px-3 text-sm outline-none focus:border-amber-500 ${dark ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500' : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500'}`} placeholder="Enter the decoded character" />
        <button type="submit" className="min-h-11 rounded-xl bg-[#07294d] px-4 text-xs font-bold text-white hover:bg-[#0a3a69]">Open seal</button>
      </form>
      <details className="mt-3 text-xs">
        <summary className={`cursor-pointer font-semibold ${dark ? 'text-amber-200' : 'text-[#9a4c00]'}`}>Show a hint</summary>
        <p className={`mt-2 ${muted}`}>{seal.hint}</p>
      </details>
      <div className="mt-3 min-h-5 text-xs" aria-live="polite">
        {feedback && <p className={opened ? 'font-semibold text-emerald-600' : dark ? 'text-amber-200' : 'text-slate-600'}>{feedback}</p>}
      </div>
      {opened && <div className={`mt-2 flex items-center gap-3 rounded-xl border p-3 ${dark ? 'border-emerald-800 bg-emerald-950/50' : 'border-emerald-200 bg-emerald-50'}`}>
        <Unlock className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <p className={`text-xs ${dark ? 'text-emerald-100' : 'text-emerald-900'}`}>Your character: <code className="ml-1 text-base font-black tracking-widest">{seal.token}</code> — keep it in seal order.</p>
      </div>}
      {system === 'origin' && opened && <form onSubmit={solveTrail} className="mt-5 border-t border-current/10 pt-4">
        <label htmlFor="cipher-final-code" className={`block text-xs font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>Enter the seven characters from A through G</label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input id="cipher-final-code" value={code} onChange={(event) => setCode(event.target.value)} maxLength={20} autoComplete="off" className={`min-h-11 flex-1 rounded-xl border px-3 text-sm uppercase tracking-widest outline-none focus:border-amber-500 ${dark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'}`} placeholder="7-character final code" />
          <button type="submit" className="min-h-11 rounded-xl bg-amber-500 px-4 text-xs font-bold text-slate-950 hover:bg-amber-400">Unlock the trail</button>
        </div>
        {trailUnlocked && <p className={`mt-3 flex items-center gap-2 text-xs font-bold ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}><LockKeyhole className="size-4" aria-hidden="true" /> The seven-seal puzzle is solved. This is a game result only.</p>}
      </form>}
    </section>
  )
}
