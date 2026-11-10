'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LibraryBig,
  BookOpen,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  FileText,
  Bookmark,
  MessageSquare,
  Sparkles,
  Download,
  ExternalLink,
  Smartphone,
  Laptop,
  X,
  Phone
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { publishedBooks, BookItem } from '@/lib/bookstore-data'

type LibraryBook = {
  id: string
  granted_at: string
  slug: string
  title: string
  author: string
  cover_image_url: string | null
}

export default function MyLibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'granted' | 'samples' | 'tracker'>('samples')

  // Sample reading modal
  const [readingBook, setReadingBook] = useState<BookItem | null>(null)
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large'>('normal')

  // Order tracking
  const [orderLookupCode, setOrderLookupCode] = useState('')
  const [trackerResult, setTrackerResult] = useState<{
    found: boolean
    orderNumber?: string
    status?: string
    message?: string
  } | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/bookstore/library', {
      cache: 'no-store',
      signal: controller.signal
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.status === 401) {
          // Guest user - not logged in
          setActiveTab('samples')
          return []
        }
        if (!response.ok) throw new Error(data.error || 'Unable to load your digital library.')
        return data.books ?? []
      })
      .then((userBooks) => {
        setBooks(userBooks)
        if (userBooks.length > 0) {
          setActiveTab('granted')
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = orderLookupCode.trim().toUpperCase()
    if (!clean) return

    if (clean.startsWith('ATB-')) {
      setTrackerResult({
        found: true,
        orderNumber: clean,
        status: 'In Verification & Dispatch Queue',
        message:
          'Your order has been logged into our Arusha dispatch desk. An Altavox logistics coordinator is confirming the M-Pesa / Tigo Pesa transaction and preparing your secure access credentials.'
      })
    } else {
      setTrackerResult({
        found: true,
        orderNumber: clean,
        status: 'Desk Enquiry Initiated',
        message:
          'Reference acknowledged. For real-time delivery and digital key verification, click the WhatsApp button below to connect with our dispatch coordinator.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <AltavoxHeader />

      <main className="flex-1 pb-20">
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-12 lg:py-16 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> Duka la Vitabu / Bookstore Catalog
            </Link>

            <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded border border-[#f26522]/40 bg-[#f26522]/10 px-3 py-1 text-xs font-semibold text-[#f48b57] tracking-wider uppercase">
                  <LibraryBig className="size-3.5" /> Altavox Digital Library & Reader
                </div>
                <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Maktaba Yangu ya Kidijitali
                </h1>
                <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-300">
                  Soma vitabu vyako vya kihandisi, pakua miongozo ya kiufundi, na usome sampuli za bure za vitabu vyote vya Altavox Tech moja kwa moja mtandaoni.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex rounded-lg bg-black/30 p-1 border border-white/10 self-start md:self-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('granted')}
                  className={`rounded-md px-3.5 py-2 transition-all ${
                    activeTab === 'granted'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Vitabu Vilivyoidhinishwa ({books.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('samples')}
                  className={`rounded-md px-3.5 py-2 transition-all ${
                    activeTab === 'samples'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Sampuli za Bure (Open Access)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tracker')}
                  className={`rounded-md px-3.5 py-2 transition-all ${
                    activeTab === 'tracker'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Fuatilia Agizo (Track Order)
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: GRANTED BOOKS */}
          {activeTab === 'granted' && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">
                    Vitabu vya Kidijitali Kwenye Akaunti Yako
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Machapisho ya kidijitali uliyolipia na kuidhinishwa na kituo cha usimamizi cha Altavox Tech.
                  </p>
                </div>
                <Link
                  href="/store"
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#f26522] hover:underline"
                >
                  Ongeza Kitabu Kingine <ArrowLeft className="size-3.5 rotate-180" />
                </Link>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <div className="mx-auto size-8 animate-spin rounded-full border-2 border-[#f26522] border-t-transparent" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Inapakia maktaba yako…
                  </p>
                </div>
              ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
                  <p className="font-semibold">Haikuweza kupakia orodha ya akaunti:</p>
                  <p className="mt-1 text-xs">{error}</p>
                  <p className="mt-4 text-xs text-slate-600">
                    Kama haujaingia, tafadhali{' '}
                    <Link href="/sign-in" className="font-bold text-[#f26522] underline">
                      Ingia kwenye akaunti yako
                    </Link>{' '}
                    au tazama sampuli za bure zilizopo hapa chini.
                  </p>
                </div>
              ) : books.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <BookOpen className="mx-auto size-12 text-slate-300" />
                  <h3 className="mt-4 text-lg font-bold text-[#07294d]">
                    Huna kitabu cha kidijitali kilichoidhinishwa kwa sasa
                  </h3>
                  <p className="mt-2 max-w-md mx-auto text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Baada ya kuweka oda ya kitabu cha eBook na kukamilisha malipo kupitia M-Pesa / Tigo Pesa, kitabu chako kitatokea hapa kwa ajili ya usomaji wa moja kwa moja na upakuaji.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('samples')}
                      className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Soma Sampuli za Bure Mtandaoni
                    </button>
                    <Link
                      href="/store"
                      className="rounded-lg bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e]"
                    >
                      Tembelea Duka la Vitabu
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {books.map((book) => (
                    <article
                      key={book.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[4/3] bg-slate-900">
                        {book.cover_image_url ? (
                          <Image
                            src={book.cover_image_url}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">
                            <BookOpen className="size-12" />
                          </div>
                        )}
                        <span className="absolute top-3 right-3 rounded bg-emerald-600/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Idhinishwa / Active
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-[#07294d] text-base leading-snug">
                            {book.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500 font-medium">
                            Mwandishi: {book.author}
                          </p>
                          <p className="mt-2 text-[11px] text-slate-400">
                            Imeongezwa: {new Date(book.granted_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            href={`/books/${book.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f26522] hover:underline"
                          >
                            <FileText className="size-3.5" /> Taarifa Kamili
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              const found = publishedBooks.find((b) => b.slug === book.slug)
                              if (found) setReadingBook(found)
                            }}
                            className="rounded-lg bg-[#07294d] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0b3866] transition-colors"
                          >
                            Soma Mtandaoni
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAMPLES & OPEN ACCESS */}
          {activeTab === 'samples' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">
                    Sampuli za Bure na Miongozo ya Awali (Open Technical Excerpts)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Bofya kitabu chochote kusoma sura ya kwanza na mifano ya uhandisi bila malipo.
                  </p>
                </div>
                <span className="self-start sm:self-auto rounded bg-sky-100 text-sky-800 text-[11px] font-bold px-3 py-1">
                  Machapisho 6 Rasmi
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publishedBooks.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <Image
                        src={item.cover_image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded bg-[#f26522] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5">
                          {item.pages} kurasa
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[#07294d] text-base leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 font-medium">
                          {item.author}
                        </p>
                        <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-100">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Sura za Ndani:
                          </p>
                          <ul className="mt-1 space-y-1">
                            {item.chapters.slice(0, 2).map((ch, idx) => (
                              <li key={idx} className="text-xs text-slate-700 truncate flex items-center gap-1.5">
                                <span className="size-1 rounded-full bg-[#f26522]" />
                                {ch}
                              </li>
                            ))}
                            {item.chapters.length > 2 && (
                              <li className="text-[11px] text-slate-400 font-medium italic">
                                + sura nyingine {item.chapters.length - 2}…
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={`/books/${item.slug}`}
                          className="text-xs font-semibold text-slate-600 hover:text-[#07294d]"
                        >
                          Tazama Kitabu
                        </Link>
                        <button
                          type="button"
                          onClick={() => setReadingBook(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#07294d] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#0b3866] transition-colors"
                        >
                          <BookOpen className="size-3.5 text-[#f26522]" /> Soma Sampuli
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER TRACKER & DESK */}
          {activeTab === 'tracker' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-orange-100 text-[#f26522]">
                    <Truck className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#07294d]">
                      Fuatilia Hali ya Agizo la Kitabu (Order Tracking)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ingiza namba ya agizo (mfano: ATB-2026-XXXX) au namba ya simu uliyotumia kuagizia.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleTrackOrder} className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      value={orderLookupCode}
                      onChange={(e) => setOrderLookupCode(e.target.value)}
                      placeholder="Mfano: ATB-1731-8942 au 0750 227 073"
                      className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#07294d] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#0b3866] transition-colors"
                  >
                    Kagua Hali
                  </button>
                </form>

                {trackerResult && (
                  <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/70 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {trackerResult.orderNumber}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="size-3.5" /> {trackerResult.status}
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {trackerResult.message}
                    </p>

                    <div className="mt-4 pt-4 border-t border-sky-200/60 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Kitengo cha Usambazaji: <span className="font-semibold text-slate-700">Unguuni, Arusha</span>
                      </p>
                      <a
                        href={`https://wa.me/255750227073?text=${encodeURIComponent(
                          `Habari Altavox Tech Bookstore Desk, naomba kufuatilia agizo langu: ${trackerResult.orderNumber}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        <MessageSquare className="size-3.5" /> WhatsApp Dispatch Desk
                      </a>
                    </div>
                  </div>
                )}

                {/* Dispatch timeline reference */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hatua za Usambazaji (Dispatch Workflow):
                  </h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#07294d]">
                        <Clock className="size-4 text-[#f26522]" /> 1. Agizo Limerekodiwa
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Mteja anapokea kumbukumbu ya agizo na maelekezo ya malipo ya M-Pesa.
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#07294d]">
                        <ShieldCheck className="size-4 text-emerald-600" /> 2. Uthibitisho & Idhini
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Uthibitisho wa muamala unafanywa ndani ya dakika 15 za kazi.
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#07294d]">
                        <Truck className="size-4 text-sky-600" /> 3. Usafirishaji / Utoaji
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Hardcover inatumwa kwa basi/EMS mikoani; eBook inafunguliwa papo hapo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Device & Reading Guide Section */}
          <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f26522]">
                  MWONGOZO WA USOMAJI
                </span>
                <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#07294d]">
                  Jinsi ya Kusoma Vitabu vya Altavox kwenye Vifaa Vyako
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Vitabu vyetu vya kidijitali vinatolewa katika miundo rasmi ya wazi isiyo na vizuizi vya kibiashara vinavyofunga faili kwa kampuni moja.
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex gap-4 items-start">
                <div className="rounded-lg bg-white p-2.5 text-[#07294d] shadow-xs">
                  <Smartphone className="size-5 text-[#f26522]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#07294d]">Simu za Android & iPhone</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Tumia <strong>Apple Books</strong> (iOS) au <strong>Google Play Books / ReadEra</strong> (Android) kwa usomaji mzuri wa miundo ya PDF na ePub yenye mode ya usiku.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex gap-4 items-start">
                <div className="rounded-lg bg-white p-2.5 text-[#07294d] shadow-xs">
                  <Laptop className="size-5 text-[#07294d]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#07294d]">Kompyuta za Windows, Mac na Linux</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Fungua moja kwa moja kupitia kivinjari chochote (Chrome, Safari, Edge) au programu za bure kama <strong>Calibre</strong> na <strong>Okular</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* SAMPLE READER MODAL */}
      {readingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#f26522]/10 text-[#f26522]">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#f26522]">
                    SURA YA SAMPULI (TECHNICAL EXCERPT)
                  </p>
                  <h3 className="font-bold text-[#07294d] text-sm sm:text-base truncate max-w-md">
                    {readingBook.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center rounded-md border border-slate-200 bg-white p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setReaderFontSize('normal')}
                    className={`px-2 py-1 rounded ${
                      readerFontSize === 'normal' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setReaderFontSize('large')}
                    className={`px-2 py-1 rounded text-sm ${
                      readerFontSize === 'large' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    A+
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setReadingBook(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Reader Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="rounded bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  {readingBook.category} • ISBN: {readingBook.isbn}
                </span>
                <p className="mt-2 text-xs text-slate-500 font-medium">
                  Imechapishwa na {readingBook.author} • Kurasa {readingBook.pages}
                </p>
              </div>

              {/* Sample Body */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#07294d]">
                  Sura ya 1: Misingi na Utekelezaji Halisi wa Mfumo
                </h4>

                <div
                  className={`rounded-xl border-l-4 border-[#f26522] bg-slate-50 p-5 font-serif text-slate-800 leading-relaxed ${
                    readerFontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  <p className="italic">
                    &ldquo;{readingBook.sampleExcerpt}&rdquo;
                  </p>
                </div>

                <div className="mt-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Muhtasari wa Maudhui Yote ya Kitabu:
                  </h5>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {readingBook.chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-slate-100 bg-white p-3 text-xs text-slate-700 shadow-2xs flex items-start gap-2"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                          {idx + 1}
                        </span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed">
                  <strong>Kumbuka:</strong> Hii ni dondoo ya bure ya kurasa za awali. Ili kusoma kitabu kizima (kurasa zote {readingBook.pages}) na kupata msimbo kamili wa usanidi, unaweza kuagiza nakala ya kidijitali (eBook) au toleo lililochapishwa (Printed Book) kutoka duka letu.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 gap-3">
              <div className="text-xs text-slate-500">
                Bei ya Kitabu Kizima: <strong className="text-[#07294d]">TZS {Number(readingBook.digital_price).toLocaleString()}</strong>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReadingBook(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Funga Kisomaji
                </button>
                <Link
                  href={`/books/${readingBook.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e]"
                >
                  Agiza Kitabu Kizima <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <AltavoxFooter />
    </div>
  )
}
