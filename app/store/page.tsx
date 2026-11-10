'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  LibraryBig,
  Sparkles,
  CheckCircle2,
  X,
  Phone,
  MessageSquare,
  Truck,
  ShieldCheck,
  FileText,
  Bookmark,
  Share2
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { bookstoreCategories, BookItem } from '@/lib/bookstore-data'

const money = (value: string | number | null) => {
  if (value == null || value === '') return 'Price not set'
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0
  }).format(Number(value))
}

export default function BookstorePage() {
  const [books, setBooks] = useState<BookItem[]>([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Titles')
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'ebook' | 'print'>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Modals state
  const [previewBook, setPreviewBook] = useState<BookItem | null>(null)
  const [orderModalBook, setOrderModalBook] = useState<BookItem | null>(null)
  const [orderFormat, setOrderFormat] = useState<'ebook' | 'print'>('ebook')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerLocation, setCustomerLocation] = useState('Arusha')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (query.trim()) params.set('q', query.trim())
        if (selectedCategory !== 'All Titles') params.set('category', selectedCategory)
        if (selectedFormat !== 'all') params.set('format', selectedFormat)

        const response = await fetch(`/api/bookstore/products?${params.toString()}`, {
          signal: controller.signal,
          cache: 'no-store'
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Unable to load the catalogue.')
        setBooks(data.products ?? [])
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unable to load the catalogue.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 120)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, selectedCategory, selectedFormat])

  function handleOpenOrder(book: BookItem, format: 'ebook' | 'print' = 'ebook') {
    setOrderModalBook(book)
    setOrderFormat(format)
    setOrderSubmitted(false)
  }

  function handleWhatsAppOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!orderModalBook) return

    const price = orderFormat === 'ebook' ? orderModalBook.digital_price : orderModalBook.print_price
    const message = encodeURIComponent(
      `Habari Altavox Bookstore,\n\nNahitaji kuagiza kitabu kifuatacho:\n- Kitabu: ${orderModalBook.title}\n- Toleo: ${orderFormat === 'ebook' ? 'Digital eBook (PDF/EPUB)' : 'Printed Hardcover/Paperback'}\n- Bei: ${money(price)}\n- Jina la Mteja: ${customerName || 'Mteja'}\n- Simu: ${customerPhone || 'Haijatajwa'}\n- Mahali: ${customerLocation}\n\nTafadhali nisaidie na taratibu za malipo (M-Pesa / Tigo Pesa) na upatikanaji.`
    )
    window.open(`https://wa.me/255750227073?text=${message}`, '_blank')
    setOrderSubmitted(true)
  }

  const featuredBook = books[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#f26522] selection:text-white">
      <AltavoxHeader />

      <main className="pb-24">
        {/* ======================================================== */}
        {/* HERO SECTION - CORPORATE NAVY & WARM ORANGE */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-14 lg:py-20 border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
                  <Sparkles className="size-3.5 text-[#f26522]" />
                  <span>Altavox Tech Publishing Desk</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Vitabu vya Uhandisi, Mitandao na <span className="text-[#f26522]">Mifumo Halisi.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                  Discover authoritative technical manuals, MikroTik ISP configuration blueprints, School SIMS architectures, and Swahili technology guides authored for practicing engineers and technology leaders.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#bookshelf-section"
                    className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#e05312] transition"
                  >
                    Tazama Vitabu Vyote (Explore Collection)
                  </a>
                  <Link
                    href="/my-library"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    <LibraryBig className="size-4 text-orange-300" />
                    <span>My Digital Library</span>
                  </Link>
                  <a
                    href="https://wa.me/255750227073?text=Habari%20Altavox%20Bookstore%2C%20nahitaji%20maelezo%20kuhusu%20ununuzi%20wa%20vitabu."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition"
                  >
                    <MessageSquare className="size-4" />
                    <span>Order Desk WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Hero: Quick Highlights & Trust Cards */}
              <div className="lg:col-span-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md text-xs space-y-4">
                <p className="font-bold uppercase tracking-wider text-orange-300 text-[11px]">
                  Bookstore Guarantees & Formats
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl bg-black/25 p-3">
                    <BookOpen className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Digital Editions (PDF / EPUB)</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">Instant online reading and offline copy to your personal library.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-black/25 p-3">
                    <Truck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Printed Hardcover & Paperback</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">Courier dispatch across Arusha, Dar es Salaam, and all regions of Tanzania.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-black/25 p-3">
                    <ShieldCheck className="size-4 text-cyan-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Verified Technical Authoring</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">Real code samples, tested RouterOS scripts, and documented architectures.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SPOTLIGHT: FEATURED ENGINEERING PUBLICATION */}
        {/* ======================================================== */}
        {featuredBook && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative aspect-[3/4] w-64 sm:w-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
                    <Image
                      src={featuredBook.cover_image_url}
                      alt={featuredBook.title}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#f26522] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      Kitabu Kilichoangaziwa
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                      Featured Technical Manual
                    </span>
                    <span className="text-xs font-mono text-slate-500">ISBN: {featuredBook.isbn}</span>
                    <span className="text-xs font-semibold text-slate-500">· {featuredBook.pages} kurasa (pages)</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07294d] leading-tight">
                    {featuredBook.title}
                  </h2>
                  <p className="text-sm font-semibold text-slate-700">Na {featuredBook.author}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {featuredBook.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">eBook Edition</p>
                      <p className="mt-1 text-base sm:text-lg font-extrabold text-[#07294d]">{money(featuredBook.digital_price)}</p>
                      <p className="text-[10px] text-emerald-700 font-medium">Instant Digital PDF/EPUB</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Printed Edition</p>
                      <p className="mt-1 text-base sm:text-lg font-extrabold text-[#07294d]">{money(featuredBook.print_price)}</p>
                      <p className="text-[10px] text-slate-500">{featuredBook.stock_quantity} nakala zipo stoo</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lugha & Toleo</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">{featuredBook.language}</p>
                      <p className="text-[10px] text-slate-500">{featuredBook.publicationDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenOrder(featuredBook, 'ebook')}
                      className="rounded-xl bg-[#f26522] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="size-4" />
                      <span>Agiza Kitabu (Order Copy)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewBook(featuredBook)}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-[#07294d] hover:bg-slate-50 transition flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="size-4 text-[#f26522]" />
                      <span>Soma Sampuli (Read Excerpt)</span>
                    </button>
                    <Link
                      href={`/books/${featuredBook.slug}`}
                      className="text-xs font-bold text-[#f26522] hover:underline flex items-center gap-1"
                    >
                      <span>Full Specification</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* SEARCH, CATEGORIES & BOOKSHELF SECTION */}
        {/* ======================================================== */}
        <section id="bookshelf-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          
          {/* Header & Search Bar */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">
                  Mkusanyiko wa Vitabu (Book Catalogue)
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#07294d]">
                  Tafuta na Chagua Kitabu Chako
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Vitabu vya kidijitali na nakala halisi zilizochapishwa. Bei zote ni kwa Shilingi za Kitanzania (TZS).
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tafuta kitabu, mwandishi, mada (e.g. MikroTik, SIMS)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#f26522] focus:bg-white transition"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-5">
              {bookstoreCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-[#07294d] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Format Filter Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Toleo (Format):</span>
                {[
                  { key: 'all', label: 'Zote (All Formats)' },
                  { key: 'ebook', label: 'eBook (Digital)' },
                  { key: 'print', label: 'Printed (Hardcover)' }
                ].map((fmt) => (
                  <button
                    key={fmt.key}
                    onClick={() => setSelectedFormat(fmt.key as any)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                      selectedFormat === fmt.key
                        ? 'bg-[#f26522] text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              <span>Inaonyesha <strong>{books.length}</strong> ya vitabu vinavyopatikana</span>
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="mt-10">
            {loading ? (
              <div className="py-24 text-center text-sm text-slate-500">
                Inapakia orodha ya vitabu kutoka Altavox Bookstore...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 text-center">
                {error}
              </div>
            ) : books.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <BookOpen className="mx-auto size-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-bold text-[#07294d]">Hakuna kitabu kilichopatikana</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Jaribu kubadili neno unalotafuta au weka upya vichungi.
                </p>
                <button
                  onClick={() => {
                    setQuery('')
                    setSelectedCategory('All Titles')
                    setSelectedFormat('all')
                  }}
                  className="mt-5 rounded-xl bg-[#07294d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#051c36] transition cursor-pointer"
                >
                  Weka Upya Vichungi (Reset Filters)
                </button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <article
                    key={book.id}
                    className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-[#f26522] hover:shadow-xl transition-all duration-200 group"
                  >
                    <div>
                      {/* Book Cover Container */}
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 mb-5 shadow-inner">
                        <Image
                          src={book.cover_image_url}
                          alt={book.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#07294d]/90 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">
                          {book.category}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-orange-300">
                          {book.language}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{book.isbn}</span>
                        {book.pages && <span>{book.pages} kurasa</span>}
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-[#07294d] group-hover:text-[#f26522] transition-colors leading-snug line-clamp-2">
                        <Link href={`/books/${book.slug}`}>{book.title}</Link>
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 font-medium">Na {book.author}</p>
                      <p className="mt-3 text-xs leading-5 text-slate-600 line-clamp-3">
                        {book.description}
                      </p>

                      {/* Pricing Box */}
                      <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 border border-slate-100 space-y-1.5 text-xs">
                        {(book.format === 'ebook' || book.format === 'both') && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium flex items-center gap-1.5">
                              <BookOpen className="size-3 text-[#f26522]" /> eBook (PDF/EPUB):
                            </span>
                            <span className="font-bold text-[#07294d]">{money(book.digital_price)}</span>
                          </div>
                        )}
                        {(book.format === 'print' || book.format === 'both') && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium flex items-center gap-1.5">
                              <ShoppingBag className="size-3 text-emerald-600" /> Printed Hardcover:
                            </span>
                            <span className="font-bold text-[#07294d]">{money(book.print_price)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewBook(book)}
                          className="rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition cursor-pointer"
                        >
                          Soma Sampuli
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenOrder(book, book.format === 'print' ? 'print' : 'ebook')}
                          className="rounded-xl bg-[#f26522] py-2.5 text-center text-xs font-bold text-white shadow-sm hover:bg-[#e05312] transition cursor-pointer"
                        >
                          Agiza Sasa
                        </button>
                      </div>

                      <Link
                        href={`/books/${book.slug}`}
                        className="block text-center text-[11px] font-semibold text-slate-500 hover:text-[#07294d] pt-1"
                      >
                        Maelezo Kamili na Sura za Kitabu →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* PHYSICAL DELIVERY & ORDER DESK INFORMATION */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  Ununuzi wa Vitabu kwa Taasisi na Watu Binafsi
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Je, Unahitaji Nakala Nyingi kwa Ajili ya Timu Yako au Maktaba?
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Tunatoa punguzo maalum la ununuzi wa pamoja (bulk order) kwa vyuo, makampuni ya ISP, na shule. Unaweza kupokea risiti ya kodi (tax invoice) na usafirishaji wa haraka popote Tanzania.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="tel:+255750227073"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white hover:bg-[#e05312] transition"
                  >
                    <Phone className="size-4" />
                    <span>Piga Simu: +255 750 227 073</span>
                  </a>
                  <a
                    href="https://wa.me/255750227073?text=Habari%20Altavox%2C%20nahitaji%20kuagiza%20vitabu%20vya%20uhandisi%20kwa%20wingi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition"
                  >
                    <MessageSquare className="size-4" />
                    <span>Ongea Nasi WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md text-xs space-y-3">
                <p className="font-bold uppercase tracking-wider text-orange-200">Kituo cha Maktaba & Usambazaji</p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Ofisi Kuu:</strong> Nduruma Road, Unguuni, Arusha, Tanzania.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Masaa ya Kazi:</strong> Jumatatu - Jumamosi (08:30 - 18:00 EAT).
                </p>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-emerald-400 font-semibold">✓ Malipo Salama: M-Pesa, Tigo Pesa, Airtel Money, Bank</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <AltavoxFooter />

      {/* ======================================================== */}
      {/* MODAL 1: SAMPLE CHAPTER PREVIEW (SOMA SAMPULI) */}
      {/* ======================================================== */}
      {previewBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#f26522] text-white">
                  <BookOpen className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-300">Sampuli ya Kitabu (Book Excerpt)</p>
                  <h4 className="text-base sm:text-lg font-bold truncate max-w-md">{previewBook.title}</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewBook(null)}
                className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              <div>
                <p className="font-bold text-[#07294d] uppercase tracking-wider text-xs">Maudhui na Sura Zilizomo (Table of Contents)</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {previewBook.chapters?.map((ch, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-50 p-2.5 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <Bookmark className="size-3.5 text-[#f26522] shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {previewBook.sampleExcerpt && (
                <div className="rounded-2xl bg-orange-50/70 border border-orange-200 p-5">
                  <p className="font-bold text-[#c24a13] uppercase tracking-wider text-xs mb-2">
                    Kipande cha Mfano (Reading Excerpt):
                  </p>
                  <p className="text-slate-800 leading-relaxed italic text-xs sm:text-sm">
                    &quot;{previewBook.sampleExcerpt}&quot;
                  </p>
                </div>
              )}

              {previewBook.keyTakeaways && (
                <div>
                  <p className="font-bold text-[#07294d] uppercase tracking-wider text-xs mb-2">Utakachojifunza (Key Takeaways):</p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {previewBook.keyTakeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Bei ya Kitabu:</p>
                  <p className="text-base font-bold text-[#07294d]">
                    eBook: {money(previewBook.digital_price)} · Hardcover: {money(previewBook.print_price)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const book = previewBook
                      setPreviewBook(null)
                      handleOpenOrder(book, 'ebook')
                    }}
                    className="rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer"
                  >
                    Agiza Sasa
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ORDER / ENQUIRY DESK (KUAGIZA KITABU) */}
      {/* ======================================================== */}
      {orderModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            
            <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#f26522] text-white">
                  <ShoppingBag className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-300">Kuagiza Kitabu (Order Desk)</p>
                  <h4 className="text-base font-bold truncate max-w-xs">{orderModalBook.title}</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOrderModalBook(null)}
                className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {orderSubmitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Ombi Lako Limepokelewa!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Ujumbe wako wa WhatsApp umetumwa moja kwa moja kwa timu yetu ya usambazaji. Afisa wetu atakutumia namba ya malipo (Lipa Namba ya M-Pesa / Tigo Pesa) na kukuthibitishia usafirishaji au ufunguo wa dijitali mara moja.
                  </p>
                  <button
                    onClick={() => setOrderModalBook(null)}
                    className="mt-4 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition cursor-pointer"
                  >
                    Funga Dirisha
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Chagua Toleo Unalotaka:</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setOrderFormat('ebook')}
                        className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                          orderFormat === 'ebook'
                            ? 'border-[#f26522] bg-orange-50 text-[#f26522]'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-bold">Digital eBook</p>
                        <p className="text-sm mt-0.5">{money(orderModalBook.digital_price)}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderFormat('print')}
                        className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                          orderFormat === 'print'
                            ? 'border-[#f26522] bg-orange-50 text-[#f26522]'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-bold">Printed Hardcover</p>
                        <p className="text-sm mt-0.5">{money(orderModalBook.print_price)}</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Jina Lako Kamili:</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Mfano: David Mrema"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Namba ya Simu (WhatsApp / Kupokea Msimbo):</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Mfano: +255 750 227 073"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Eneo la Usafirishaji / Mkoa:</label>
                    <select
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                    >
                      <option>Arusha (Ofisini Unguuni / Nduruma)</option>
                      <option>Arusha (Mjini / Courier)</option>
                      <option>Dar es Salaam</option>
                      <option>Mwanza</option>
                      <option>Dodoma</option>
                      <option>Kilimanjaro / Moshi</option>
                      <option>Mbeya</option>
                      <option>Morogoro</option>
                      <option>Tanga</option>
                      <option>Zanzibar</option>
                      <option>Mkoa Mwingine Tanzania</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">Mchakato wa Malipo na Utoaji:</p>
                    <p>• Toleo la eBook: Utatumiwa kiungo na kitabu kuwekwa kwenye My Library baada ya malipo.</p>
                    <p>• Toleo la Hardcover: Kinasafirishwa ndani ya masaa 24 baada ya uthibitisho wa malipo.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 py-3.5 text-center text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="size-4" />
                    <span>Tuma Oda kwa WhatsApp (+255 750 227 073)</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
