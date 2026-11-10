'use client'

import { motion } from 'motion/react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Altavox Computer', href: '/computer' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  return <AltavoxHeader />
}

export function SiteFooter() {
  return <AltavoxFooter />
}

export function PageFrame({
  children,
  eyebrow,
  title,
  intro,
}: {
  children: React.ReactNode
  eyebrow?: string
  title?: string
  intro?: string
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#f26522] selection:text-white">
      <AltavoxHeader />
      <main className="flex-1 overflow-x-hidden pb-20">
        {title && (
          <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 lg:py-18 border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow && (
                  <span className="inline-block rounded-full bg-[#f26522] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white mb-3 shadow-xs">
                    {eyebrow}
                  </span>
                )}
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                  {title}
                </h1>
                {intro && (
                  <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-200">
                    {intro}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>
      <AltavoxFooter />
    </div>
  )
}
