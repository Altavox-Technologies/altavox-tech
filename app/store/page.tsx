'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, BookOpen, ShoppingBag, ArrowRight, LibraryBig } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

type Book = {
  id: string
  slug: string
  title: string
  author: string
  description: string
  cover_image_url: string | null
  format: 'ebook' | 'print' | 'both'
  category: string | null
  language: string
  digital_price: string | null
  print_price: string | null
  stock_quantity: number
}

const money = (value: string | null) => value == null ? 'Price not set' : new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(Number(value))

export default function BookstorePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`/api/bookstore/products${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`, { signal: controller.signal, cache: 'no-store' })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Unable to load the catalogue.')
        setBooks(data.products ?? [])
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : 'Unable to load the catalogue.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 180)
    return () => { clearTimeout(timer); controller.abort() }
  }, [query])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AltavoxHeader />
      <main>
        <section className="bg-[#07294d] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f9a477]">ALTAVOX BOOKSTORE</p>
            <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Stories, knowledge and ideas worth keeping.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Discover digital books and printed editions from independent authors. Your purchased eBooks will be available in your personal library.</p>
              </div>
              <Link href="/my-library" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f26522] px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"><LibraryBig className="size-4" /> My Library</Link>
            </div>
            <div className="mt-9 flex max-w-2xl items-center gap-3 rounded-xl bg-white p-2 text-slate-900">
              <Search className="ml-2 size-5 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books, authors or topics..." className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none" aria-label="Search books" />
              <span className="hidden rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500 sm:inline">Search</span>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">THE COLLECTION</p><h2 className="mt-2 text-2xl font-bold">Browse the bookshelf</h2></div>
            <span className="text-xs text-slate-500">{books.length} published {books.length === 1 ? 'book' : 'books'}</span>
          </div>
          {loading ? <div className="py-20 text-center text-sm text-slate-500">Loading published books…</div> : error ? <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div> : books.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
              <BookOpen className="mx-auto size-10 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold">The bookshelf is being prepared</h3>
              <p className="mt-2 text-sm text-slate-500">No books have been published yet. New titles will appear here when they are added by the bookstore administrator.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => <article key={book.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/5] bg-slate-100">
                  {book.cover_image_url ? <Image src={book.cover_image_url} alt={book.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" /> : <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400"><BookOpen className="size-12" /><span className="text-xs font-semibold">Cover not uploaded</span></div>}
                </div>
                <div className="p-5">
                  {book.category && <p className="text-[10px] font-bold uppercase tracking-widest text-[#f26522]">{book.category}</p>}
                  <h3 className="mt-2 line-clamp-2 text-base font-bold">{book.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">by {book.author}</p>
                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-600">{book.description}</p>
                  <div className="mt-4 space-y-1 text-xs">
                    {(book.format === 'ebook' || book.format === 'both') && <p className="font-semibold">eBook: {money(book.digital_price)}</p>}
                    {(book.format === 'print' || book.format === 'both') && <p className="font-semibold">Print: {money(book.print_price)} {Number(book.stock_quantity) > 0 ? `· ${book.stock_quantity} in stock` : '· Stock unavailable'}</p>}
                  </div>
                  <Link href={`/books/${book.slug}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#07294d] px-4 py-3 text-xs font-bold text-white hover:bg-[#0b3b6c]">View book <ArrowRight className="size-4" /></Link>
                </div>
              </article>)}
            </div>
          )}
        </section>
        <section className="border-t border-slate-200 bg-slate-50"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="flex gap-4"><BookOpen className="mt-1 size-6 text-[#f26522]" /><div><h3 className="font-bold">Digital editions</h3><p className="mt-1 text-xs leading-5 text-slate-600">Access purchased digital titles from your library once payment is confirmed.</p></div></div>
          <div className="flex gap-4"><ShoppingBag className="mt-1 size-6 text-[#f26522]" /><div><h3 className="font-bold">Printed editions</h3><p className="mt-1 text-xs leading-5 text-slate-600">Order physical copies. Delivery options and charges are confirmed during checkout.</p></div></div>
        </div></section>
      </main>
      <AltavoxFooter />
    </div>
  )
}
