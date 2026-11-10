'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  ShoppingBag,
  LockKeyhole,
  CheckCircle2,
  Bookmark,
  Share2,
  Truck,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Phone,
  ArrowRight,
  FileText,
  X
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { BookItem, publishedBooks } from '@/lib/bookstore-data'

const money = (value: string | number | null) => {
  if (value == null || value === '') return 'Price not set'
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0
  }).format(Number(value))
}

export default function BookDetailPage() {
  const params = useParams<{ slug: string }>()
  const [book, setBook] = useState<BookItem | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedFormat, setSelectedFormat] = useState<'ebook' | 'print'>('ebook')
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerLocation, setCustomerLocation] = useState('Arusha')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/bookstore/products/${encodeURIComponent(params.slug)}`, {
      signal: controller.signal,
      cache: 'no-store'
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Kitabu hakipatikani.')
        return data.product
      })
      .then((prod) => {
        setBook(prod)
        if (prod.format === 'print') setSelectedFormat('print')
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [params.slug])

  function handleWhatsAppOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!book) return

    const price = selectedFormat === 'ebook' ? book.digital_price : book.print_price
    const message = encodeURIComponent(
      `Habari Altavox Bookstore,\n\nNahitaji kuagiza kitabu:\n- Kitabu: ${book.title}\n- Toleo: ${selectedFormat === 'ebook' ? 'Digital eBook (PDF/EPUB)' : 'Printed Hardcover/Paperback'}\n- Bei: ${money(price)}\n- Jina la Mteja: ${customerName || 'Mteja'}\n- Simu: ${customerPhone || 'Haijatajwa'}\n- Mahali: ${customerLocation}\n\nTafadhali nisaidie na maelekezo ya malipo na upatikanaji.`
    )
    window.open(`https://wa.me/255750227073?text=${message}`, '_blank')
    setOrderSubmitted(true)
  }

  const relatedBooks = publishedBooks.filter((b) => b.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#f26522] selection:text-white">
      <AltavoxHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/store" className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#f26522] transition">
            <ArrowLeft className="size-3.5" /> Altavox Bookstore
          </Link>
          <span>/</span>
          {book?.category && (
            <>
              <span className="text-slate-600 font-medium">{book.category}</span>
              <span>/</span>
            </>
          )}
          <span className="text-[#f26522] font-semibold truncate max-w-xs">{book?.title || 'Kitabu'}</span>
        </nav>

        {loading ? (
          <div className="py-32 text-center text-sm text-slate-500">
            Inapakia maelezo kamili ya kitabu...
          </div>
        ) : error || !book ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-24 px-6 text-center shadow-sm">
            <BookOpen className="mx-auto size-12 text-slate-300" />
            <h1 className="mt-4 text-2xl font-bold text-[#07294d]">Kitabu Hakipatikani</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              {error || 'Kitabu hiki huenda kimehamishwa au hakijachapishwa bado.'}
            </p>
            <Link
              href="/store"
              className="mt-6 inline-flex rounded-xl bg-[#07294d] px-6 py-3 text-xs font-bold text-white hover:bg-[#051c36] transition"
            >
              Rudi Kwenye Maktaba ya Vitabu
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Main Book Presentation Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                
                {/* Left: Book Cover Image & Physical Attributes */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
                    <Image
                      src={book.cover_image_url}
                      alt={book.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#07294d]/90 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">
                      {book.category}
                    </div>
                  </div>

                  <div className="mt-6 w-full max-w-sm rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">ISBN:</span>
                      <span className="font-mono font-bold text-slate-800">{book.isbn || '978-9912-780-01-2'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Lugha (Language):</span>
                      <span className="font-bold text-slate-800">{book.language}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Kurasa (Pages):</span>
                      <span className="font-bold text-slate-800">{book.pages || 320}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-medium">Mchapishaji:</span>
                      <span className="font-bold text-[#f26522]">Altavox Tech Publishing</span>
                    </div>
                  </div>
                </div>

                {/* Right: Book Details, Pricing & Order Actions */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                        Altavox Technical Publication
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{book.publicationDate}</span>
                    </div>

                    <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold text-[#07294d] leading-tight">
                      {book.title}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      Kimeandikwa na <strong className="text-slate-900">{book.author}</strong>
                    </p>
                  </div>

                  {/* Summary / Description */}
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                    <p>{book.description}</p>
                  </div>

                  {/* Pricing Selector */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Chagua Toleo la Kitabu (Select Book Edition):
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {(book.format === 'ebook' || book.format === 'both') && (
                        <button
                          type="button"
                          onClick={() => setSelectedFormat('ebook')}
                          className={`rounded-xl border p-4 text-left transition cursor-pointer ${
                            selectedFormat === 'ebook'
                              ? 'border-[#f26522] bg-white shadow-md'
                              : 'border-slate-200 bg-white/60 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-[#07294d]">
                              <BookOpen className="size-4 text-[#f26522]" /> Digital eBook
                            </span>
                            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              Instant Access
                            </span>
                          </div>
                          <p className="mt-3 text-xl font-extrabold text-[#07294d]">{money(book.digital_price)}</p>
                          <p className="mt-1 text-[11px] text-slate-500">PDF & EPUB inapatikana moja kwa moja kwenye My Library.</p>
                        </button>
                      )}

                      {(book.format === 'print' || book.format === 'both') && (
                        <button
                          type="button"
                          onClick={() => setSelectedFormat('print')}
                          className={`rounded-xl border p-4 text-left transition cursor-pointer ${
                            selectedFormat === 'print'
                              ? 'border-[#f26522] bg-white shadow-md'
                              : 'border-slate-200 bg-white/60 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-[#07294d]">
                              <ShoppingBag className="size-4 text-emerald-600" /> Printed Hardcover
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {book.stock_quantity} zipo stoo
                            </span>
                          </div>
                          <p className="mt-3 text-xl font-extrabold text-[#07294d]">{money(book.print_price)}</p>
                          <p className="mt-1 text-[11px] text-slate-500">Usafirishaji wa haraka nchi nzima ndani ya masaa 24-48.</p>
                        </button>
                      )}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderModalOpen(true)}
                        className="flex-1 rounded-xl bg-[#f26522] py-3.5 text-center text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="size-4" />
                        <span>Agiza Toleo la {selectedFormat === 'ebook' ? 'eBook' : 'Hardcover'} ({money(selectedFormat === 'ebook' ? book.digital_price : book.print_price)})</span>
                      </button>

                      <a
                        href={`https://wa.me/255750227073?text=Habari%20Altavox%20Bookstore%2C%20nahitaji%20kuagiza%20kitabu%20cha%20${encodeURIComponent(book.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-3.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition flex items-center gap-2"
                      >
                        <MessageSquare className="size-4 text-emerald-600" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>

                  {/* Trust Highlights */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#f26522] shrink-0" />
                      <span>Malipo salama kwa M-Pesa / Tigo Pesa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="size-4 text-[#f26522] shrink-0" />
                      <span>Ofisi: Nduruma Road, Unguuni, Arusha</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Chapters / Table of Contents & Sample Excerpt */}
            <div className="grid gap-8 lg:grid-cols-12">
              
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="size-5 text-[#f26522]" />
                  <h3 className="text-xl font-bold text-[#07294d]">Maudhui na Sura Zilizomo (Table of Contents)</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Uchambuzi wa mada na miradi ya kiutendaji iliyoelezwa kwa kina ndani ya kitabu hiki:
                </p>

                <div className="space-y-2.5 pt-2">
                  {book.chapters?.map((ch, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-800 font-medium">
                      <span className="font-mono text-[#f26522] font-bold">0{idx + 1}.</span>
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Excerpt & Key Takeaways */}
              <div className="lg:col-span-5 space-y-8">
                {book.sampleExcerpt && (
                  <div className="rounded-3xl border border-orange-200 bg-orange-50/70 p-6 sm:p-8 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c24a13]">
                      <FileText className="size-4" />
                      <span>Kipande cha Sampuli (Reading Excerpt)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic border-l-2 border-[#f26522] pl-3 py-1">
                      &quot;{book.sampleExcerpt}&quot;
                    </p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Kutoka Kitabu: {book.title}
                    </p>
                  </div>
                )}

                {book.keyTakeaways && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-3">
                    <h4 className="text-base font-bold text-[#07294d]">Utakachojifunza (Key Takeaways)</h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {book.keyTakeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

            {/* Related Engineering Titles */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#f26522]">Vitabu Vinavyohusiana</p>
                  <h3 className="text-xl font-bold text-[#07294d]">Mfululizo Mwingine wa Uhandisi</h3>
                </div>
                <Link href="/store" className="text-xs font-bold text-[#f26522] hover:underline flex items-center gap-1">
                  <span>Maktaba Yote</span> <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {relatedBooks.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/books/${rel.slug}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#f26522] hover:shadow-md transition group"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
                      <Image
                        src={rel.cover_image_url}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-[#f26522]">{rel.category}</span>
                    <h4 className="font-bold text-sm text-[#07294d] mt-1 line-clamp-1 group-hover:text-[#f26522] transition-colors">{rel.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Na {rel.author}</p>
                    <p className="text-xs font-bold text-[#07294d] mt-2">{money(rel.digital_price)} (eBook)</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      <AltavoxFooter />

      {/* ======================================================== */}
      {/* ORDER ENQUIRY MODAL */}
      {/* ======================================================== */}
      {orderModalOpen && book && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            
            <div className="bg-[#07294d] px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#f26522] text-white">
                  <ShoppingBag className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-300">Kuagiza Kitabu</p>
                  <h4 className="text-base font-bold truncate max-w-xs">{book.title}</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOrderModalOpen(false)}
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
                    Ujumbe wako wa WhatsApp umetumwa kwa afisa usambazaji. Utathibitishiwa namba ya malipo (Lipa Namba) na kuwezeshwa kupokea nakala yako mara moja.
                  </p>
                  <button
                    onClick={() => {
                      setOrderModalOpen(false)
                      setOrderSubmitted(false)
                    }}
                    className="mt-4 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition cursor-pointer"
                  >
                    Funga Dirisha
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Toleo Linaloagizwa:</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedFormat('ebook')}
                        className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                          selectedFormat === 'ebook'
                            ? 'border-[#f26522] bg-orange-50 text-[#f26522]'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-bold">Digital eBook</p>
                        <p className="text-sm mt-0.5">{money(book.digital_price)}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedFormat('print')}
                        className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                          selectedFormat === 'print'
                            ? 'border-[#f26522] bg-orange-50 text-[#f26522]'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-bold">Printed Hardcover</p>
                        <p className="text-sm mt-0.5">{money(book.print_price)}</p>
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
                    <label className="block text-xs font-bold text-slate-700">Mkoa / Eneo la Usafirishaji:</label>
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
