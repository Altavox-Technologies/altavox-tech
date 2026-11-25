'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, LogIn } from 'lucide-react'
import { signIn } from '@/lib/auth-client'
import { useFirebaseAuth } from '@/components/firebase-provider'

export default function SignInPage() {
  const router = useRouter()
  const { user, signInWithGoogle, authError } = useFirebaseAuth()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nativeEvent = event.nativeEvent as KeyboardEvent
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return
    setPending(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const result = await signIn.email({ email: String(data.get('email')), password: String(data.get('password')) })
    if (result.error) setError('Sign-in failed. Check your credentials and try again.')
    else { router.push('/admin/inquiries'); router.refresh() }
    setPending(false)
  }

  async function handleGoogleLogin() {
    const signedIn = await signInWithGoogle()
    if (signedIn) {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen bg-[#07294d] px-6 py-16 flex items-center justify-center font-sans">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#093563] p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Altavox Tech Home">
            <Image
              src="/capricorn_emblem_clean_black.svg"
              alt="Altavox Tech Capricorn emblem"
              width={40}
              height={46}
              className="h-10 w-9 object-contain brightness-0 invert transition group-hover:scale-105"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-base font-black tracking-tight text-white">ALTAVOX</span>
                <span className="text-base font-black tracking-tight text-[#f26522]">TECH</span>
              </div>
              <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-slate-300 mt-0.5">
                Portal Authentication
              </span>
            </div>
          </Link>
          <Link href="/" className="text-xs text-slate-300 hover:text-[#f26522] flex items-center gap-1 transition">
            <ArrowLeft className="size-3.5" /> Back to Site
          </Link>
        </div>

        <div className="mt-6">
          <span className="rounded-full bg-[#f26522] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Operations Control Plane
          </span>
          <h1 className="mt-3 text-2xl font-bold">Sign In</h1>
          <p className="mt-1.5 text-xs text-slate-300">
            Sign in with Google for Firebase Portfolio & Academy LMS access, or use administrator Better Auth credentials.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => void handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white text-[#07294d] py-3 text-xs font-extrabold shadow-sm hover:bg-slate-100 transition cursor-pointer"
          >
            <LogIn className="size-4 text-[#f26522]" />
            <span>{user ? `Signed in (${user.email}) — Go to Admin` : 'Continue with Google (Firebase Auth)'}</span>
          </button>

          {authError && (
            <p role="alert" className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-2.5 text-xs text-rose-200">
              {authError}
            </p>
          )}
        </div>

        <div className="my-5 flex items-center gap-3 text-[11px] text-slate-400">
          <div className="h-px flex-1 bg-white/10" />
          <span>OR ADMIN CREDENTIALS</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-200">Email Address</label>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white/15 transition"
              placeholder="admin@altavox.space"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200">Password</label>
            <input
              required
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white/15 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-2.5 text-xs text-rose-200">
              {error}
            </p>
          )}

          <button
            disabled={pending}
            className="w-full rounded-xl bg-[#f26522] py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50 cursor-pointer"
          >
            {pending ? 'Authenticating...' : 'Sign In to Control Plane'}
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
