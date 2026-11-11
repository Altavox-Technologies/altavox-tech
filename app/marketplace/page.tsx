'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  BookOpen,
  Download,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { publishedBooks } from '@/lib/bookstore-data'

export default function AltavoxMarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'books', label: 'Technical Books' },
    { id: 'blueprints', label: 'Architecture Blueprints' },
    { id: 'templates', label: 'Production Templates' }
  ]

  const digitalTemplates = [
    {
      id: 'tmpl-01',
      slug: 'nextjs-enterprise-saas-starter',
      title: 'Next.js 16 Enterprise Multi-Tenant Starter',
      category: 'templates',
      author: 'Altavox Core Engineering',
      price: '$79.00 USD',
      format: 'Source Code (TypeScript)',
      description: 'Production-ready Next.js 16 with Turbopack, Tailwind CSS v4, Better Auth, PostgreSQL Row-Level Security, and isolated tenant routing.'
    },
    {
      id: 'tmpl-02',
      slug: 'mikrotik-vlan-isp-automation-kit',
      title: 'MikroTik RouterOS v7 ISP Automation Kit',
      category: 'templates',
      author: 'Altavox Telecom Systems Lab',
      price: '$120.00 USD',
      format: 'RouterOS .rsc Scripts & Node.js Daemon',
      description: 'Automated subscriber bandwidth shaping, dynamic PPPoE server profiles, failover BGP scripts, and M-Pesa automatic unblocking hooks.'
    },
    {
      id: 'tmpl-03',
      slug: 'sims-school-management-ddl-schema',
      title: 'High-Integrity School SIMS Database Schema',
      category: 'blueprints',
      author: 'Altavox Database Architecture',
      price: '$49.00 USD',
      format: 'PostgreSQL DDL & Drizzle Schema',
      description: 'Comprehensive educational institution schema covering enrollment, multi-term grading, fee reconciliation, and biometric attendance logs.'
    }
  ]

  const filteredBooks = publishedBooks.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || activeCategory === 'books'
    return matchesSearch && matchesCategory
  })

  const filteredTemplates = digitalTemplates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || activeCategory === t.category
    return matchesSearch && matchesCategory
  })

  const triggerDownload = async (bookId: string) => {
    try {
      const res = await fetch(`/api/bookstore/download/${bookId}`)
      const data = await res.json()
      if (data.success && data.authorizedDownload) {
        setDownloadNotice(`Authorized download link generated: ${data.authorizedDownload.token}. Expires in 15 minutes.`)
      } else {
        setDownloadNotice(data.error || 'Download verification required.')
      }
    } catch (err) {
      setDownloadNotice('Download server currently offline.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#f48b57]">
                <ShoppingBag className="size-3.5" /> Altavox Marketplace
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white">
                Digital Engineering Products & Publications
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Authorized technical manuals, production-ready source code templates, and system architecture blueprints engineered by Altavox Tech specialists.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search technical publications, templates, RouterOS scripts..."
                  className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-[#f26522]"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                      activeCategory === c.id
                        ? 'bg-[#f26522] text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {downloadNotice && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{downloadNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setDownloadNotice(null)}
                className="font-bold text-emerald-800 hover:text-emerald-950 text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
          {/* SECTION 1: TECHNICAL BOOKS & MANUALS */}
          {(activeCategory === 'all' || activeCategory === 'books') && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Official Engineering Publications</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authored by Altavox engineering leads for practitioners and network operators.
                  </p>
                </div>
                <Link
                  href="/store"
                  className="text-xs font-bold text-[#f26522] hover:underline flex items-center gap-1"
                >
                  <span>View Bookstore</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book) => (
                  <article
                    key={book.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#f26522] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>ISBN: {book.isbn}</span>
                        <span className="font-bold text-[#f26522] uppercase">{book.category}</span>
                      </div>

                      <h3 className="mt-3 text-base font-bold text-[#07294d] leading-snug">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 font-medium">By {book.author}</p>

                      <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {book.description}
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-mono">{book.pages} Pages</span>
                        <span className="text-sm font-extrabold text-[#07294d]">
                          TZS {Number(book.digital_price || '35000').toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between gap-2">
                      <Link
                        href={`/books/${book.slug}`}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Inspect Book
                      </Link>

                      <button
                        type="button"
                        onClick={() => triggerDownload(book.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#0b3866] transition"
                      >
                        <Download className="size-3.5 text-[#f26522]" /> Download Preview
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: ARCHITECTURE BLUEPRINTS & TEMPLATES */}
          {(activeCategory === 'all' || activeCategory === 'templates' || activeCategory === 'blueprints') && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Production Software Kits & Blueprints</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ready-to-deploy architectural codebases and telecommunications configurations.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#f26522] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="uppercase text-[#f26522] font-bold">{item.category}</span>
                        <span>{item.format}</span>
                      </div>

                      <h3 className="mt-3 text-base font-bold text-[#07294d] leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 font-medium">{item.author}</p>

                      <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-mono">Licensed for Commercial Use</span>
                        <span className="text-base font-extrabold text-[#07294d]">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between gap-2">
                      <Link
                        href="/contact"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        License Inquiries
                      </Link>

                      <Link
                        href="/start-project"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#f26522] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#d9531e] transition"
                      >
                        <CreditCard className="size-3.5" /> Purchase Kit
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
