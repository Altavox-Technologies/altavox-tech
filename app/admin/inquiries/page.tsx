import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/db/schema'
import { isAdminEmail } from '@/lib/admin'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AdminSignOut } from '@/components/admin-sign-out'
import { isAltavoxAdmin } from '@/lib/admin'

export default async function AdminInquiriesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdminEmail(session.user.email, session.user.emailVerified)) redirect('/sign-in')
  const rows = db ? await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(100) : []

  return (
    <main className="min-h-screen bg-[#07294d] px-6 py-12 text-white font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Altavox Tech Home">
              <Image
                src="/Black%20Ibex%20Horns%20Emblem.png"
                alt="Altavox Tech"
                width={40}
                height={40}
                className="h-9 w-9 object-contain brightness-125 transition group-hover:scale-105"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-base font-black tracking-tight text-white">ALTAVOX</span>
                  <span className="text-base font-black tracking-tight text-[#f26522]">TECH</span>
                </div>
                <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-slate-300 mt-0.5">
                  Operations Console
                </span>
              </div>
            </Link>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <span className="rounded-full bg-[#f26522] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Control Plane</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-300">Signed in as <strong className="text-white">{session.user.email}</strong></span>
            <AdminSignOut />
          </div>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Enterprise Inquiries & Proposals</h1>
            <p className="mt-1 text-xs text-slate-300">Client inquiries received via public intake and proposal forms.</p>
            {!db && <p role="alert" className="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">Database connection is unavailable. Records are not being displayed from a demo source.</p>}
          </div>
          <span className="text-xs font-mono text-[#f26522] font-bold bg-[#f26522]/10 px-3 py-1 rounded-full border border-[#f26522]/30">{rows.length} Total Records</span>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#093563] shadow-xl">
          <table className="w-full min-w-[860px] text-left text-xs">
            <thead className="border-b border-white/10 bg-black/20 text-[11px] uppercase tracking-wider text-slate-300"><tr><th className="p-4">Received</th><th className="p-4">Client Name</th><th className="p-4">Email</th><th className="p-4">Phone</th><th className="p-4">Service Track</th><th className="p-4">Status</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row) => <tr key={row.id} className="hover:bg-white/[0.02] transition"><td className="p-4 text-slate-300">{row.createdAt.toLocaleString()}</td><td className="p-4 font-bold text-white">{row.name}</td><td className="p-4 text-slate-300">{row.email}</td><td className="p-4 text-slate-300">{row.phone ? <a href={`tel:${row.phone}`} className="hover:text-[#f26522]">{row.phone}</a> : '—'}</td><td className="p-4 text-slate-300">{row.service ?? 'General Enterprise'}</td><td className="p-4"><span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">{row.status}</span></td></tr>)}
              {rows.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-slate-400">No enterprise inquiries recorded yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
