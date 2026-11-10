'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function AdminSetupForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if ((event.nativeEvent as KeyboardEvent).isComposing) return
    setPending(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email')).trim().toLowerCase()
    const response = await fetch('/api/admin/bootstrap', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: String(data.get('password')), token: String(data.get('setupToken')) }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) setError(result.error || 'Account setup failed. Check the setup token and authorized email.')
    else { router.push('/sign-in?setup=complete'); router.refresh() }
    setPending(false)
  }

  return (
    <main className="min-h-screen bg-[#07294d] px-6 py-16 flex items-center justify-center font-sans">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#093563] p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="inline-block group" aria-label="Altavox Tech Home">
            <Image
              src="/altavox-logo.svg"
              alt="Altavox Tech"
              width={160}
              height={40}
              className="h-9 w-auto rounded-lg shadow-xs"
              priority
              referrerPolicy="no-referrer"
            />
          </Link>
          <Link href="/" className="text-xs text-slate-300 hover:text-[#f26522] flex items-center gap-1 transition">
            <ArrowLeft className="size-3.5" /> Back to Site
          </Link>
        </div>

        <div className="mt-6">
          <span className="rounded-full bg-[#f26522] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Altavox Control Plane
          </span>
          <h1 className="mt-3 text-2xl font-bold">Admin Account Setup</h1>
          <p className="mt-1.5 text-xs text-slate-300">
            One-time administrative credential initialization for authorized personnel.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-200">Email Address</label>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white/15 transition"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200">One-time setup token</label>
            <input required name="setupToken" type="password" autoComplete="off" className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#f26522]" placeholder="Provided by the system operator" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-200">Password</label>
            <input
              required
              minLength={12}
              name="password"
              type="password"
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white/15 transition"
              placeholder="•••••••• (Min 12 chars)"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-2.5 text-xs text-rose-200">
              {error}
            </p>
          )}

          <button
            disabled={pending}
            className="w-full rounded-xl bg-[#f26522] py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50"
          >
            {pending ? 'Creating Account…' : 'Create Admin Account'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 text-center text-[11px] text-slate-400">
          Direct Desk support:{' '}
          <a href="tel:+255750227073" className="font-semibold text-[#f26522] hover:underline">
            +255 750 227 073
          </a>
        </div>
      </div>
    </main>
  )
}
