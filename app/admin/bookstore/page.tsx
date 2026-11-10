'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  BookOpen,
  PlusCircle,
  Package,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Truck,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { publishedBooks, BookItem, bookstoreCategories } from '@/lib/bookstore-data'

export default function BookstoreAdminPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'add' | 'dispatch'>('catalog')
  const [form, setForm] = useState({
    title: '',
    author: '',
    slug: '',
    description: '',
    coverImageUrl: '',
    format: 'both',
    category: '',
    language: 'English',
    digitalPrice: '',
    printPrice: '',
    stockQuantity: '0'
  })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  function change(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/bookstore/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to save book.')
      setMessage(
        `Imefanikiwa kuhifadhiwa kama Rasimu: "${data.product.title}". Itapitiwa na kusajiliwa kwenye orodha kuu.`
      )
      setForm({
        title: '',
        author: '',
        slug: '',
        description: '',
        coverImageUrl: '',
        format: 'both',
        category: '',
        language: 'English',
        digitalPrice: '',
        printPrice: '',
        stockQuantity: '0'
      })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save book.')
    } finally {
      setBusy(false)
    }
  }

  const field = (
    label: string,
    key: keyof typeof form,
    placeholder: string,
    type = 'text',
    required = false
  ) => (
    <label className="block text-xs font-bold text-slate-700">
      {label} {required && <span className="text-[#f26522]">*</span>}
      <input
        type={type}
        required={required}
        value={form[key]}
        onChange={(e) => change(key, e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm font-normal outline-none focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522]"
      />
    </label>
  )

  const filteredBooks = publishedBooks.filter((b) =>
    searchQuery
      ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <AltavoxHeader />

      <main className="flex-1 pb-20">
        {/* Admin Header */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-10 lg:py-14 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> Rudi Duka Kuu la Vitabu
            </Link>

            <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded bg-[#f26522]/20 px-2.5 py-0.5 text-xs font-bold text-[#f48b57] tracking-wider uppercase">
                  Altavox Tech Publication Operations
                </span>
                <h1 className="mt-2 text-3xl font-extrabold text-white">
                  Usimamizi wa Duka la Vitabu (Bookstore Admin)
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Dawati la kusimamia orodha ya machapisho ya kiufundi, bei za TZS kwa nakala za eBook na Printed, idadi ya vitabu vilivyopo ghalani (stock), na mtiririko wa usambazaji.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex rounded-lg bg-black/30 p-1 border border-white/10 self-start md:self-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className={`rounded-md px-3.5 py-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'catalog'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="size-3.5" /> Orodha ya Vitabu ({publishedBooks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className={`rounded-md px-3.5 py-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'add'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <PlusCircle className="size-3.5" /> Sajili Kitabu Kipya
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dispatch')}
                  className={`rounded-md px-3.5 py-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'dispatch'
                      ? 'bg-[#f26522] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Truck className="size-3.5" /> Usambazaji & Ghala
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          {/* TAB 1: CATALOG OVERVIEW */}
          {activeTab === 'catalog' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">
                    Machapisho Yaliyopo Dukan (Active Publications)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Vitabu hivi vinapatikana mtandaoni kwa wateja na wahandisi wa TEHAMA.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tafuta kitabu au mwandishi…"
                    className="w-full rounded-lg border border-slate-300 pl-8 pr-3 py-1.5 text-xs outline-none focus:border-[#f26522]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Kitabu / ISBN</th>
                      <th className="py-3.5 px-4">Kitengo (Category)</th>
                      <th className="py-3.5 px-4">Muundo (Format)</th>
                      <th className="py-3.5 px-4">Bei ya eBook</th>
                      <th className="py-3.5 px-4">Bei ya Nakala (Print)</th>
                      <th className="py-3.5 px-4">Ghalani (Stock)</th>
                      <th className="py-3.5 px-4 text-right">Vitendo (Actions)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBooks.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 shrink-0 rounded bg-slate-800 overflow-hidden">
                              <Image
                                src={item.cover_image_url}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-[#07294d] leading-snug line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-500 font-mono">
                                ISBN: {item.isbn}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {item.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="rounded bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-bold uppercase">
                            {item.format === 'both' ? 'eBook + Print' : item.format}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#07294d]">
                          TZS {Number(item.digital_price).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#07294d]">
                          TZS {Number(item.print_price).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              item.stock_quantity > 10
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <Package className="size-3" /> {item.stock_quantity} nakala
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <Link
                            href={`/books/${item.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Tazama <ExternalLink className="size-3 text-slate-400" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD BOOK DRAFT */}
          {activeTab === 'add' && (
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#f26522]/10 text-[#f26522]">
                    <PlusCircle className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#07294d]">
                      Sajili Chapisho Jipya la Kiufundi
                    </h2>
                    <p className="text-xs text-slate-500">
                      Kitabu hiki kitahifadhiwa kama rasimu (draft) kwenye orodha kwa ajili ya uhakiki wa maudhui.
                    </p>
                  </div>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {field('Jina la Kitabu (Book Title)', 'title', 'Mfano: MikroTik RouterOS v7 Ops', 'text', true)}
                    {field('Mwandishi (Author)', 'author', 'Altavox Telecom Systems Lab', 'text', true)}
                    {field('URL Slug', 'slug', 'mikrotik-routeros-ops', 'text', true)}
                    {field('Kitengo (Category)', 'category', 'ISP & Telecom, Architecture, Security')}
                    {field('Lugha ya Kitabu (Language)', 'language', 'English au Kiswahili')}
                    {field('Picha ya Jalada (Cover Image URL)', 'coverImageUrl', 'https://...')}

                    <label className="block text-xs font-bold text-slate-700">
                      Miundo Inayopatikana (Format)
                      <select
                        value={form.format}
                        onChange={(e) => change('format', e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm font-normal outline-none focus:border-[#f26522]"
                      >
                        <option value="both">eBook na Nakala Iliyochapishwa (Both)</option>
                        <option value="ebook">eBook Pekee (Digital Only)</option>
                        <option value="print">Nakala Iliyochapishwa Pekee (Print Only)</option>
                      </select>
                    </label>

                    {field('Bei ya eBook (TZS)', 'digitalPrice', 'Mfano: 35000', 'number')}
                    {field('Bei ya Nakala (TZS)', 'printPrice', 'Mfano: 65000', 'number')}
                    {field('Idadi Ghalani (Stock Quantity)', 'stockQuantity', '0', 'number')}
                  </div>

                  <label className="block text-xs font-bold text-slate-700">
                    Maelezo ya Kitabu (Book Description)
                    <textarea
                      value={form.description}
                      onChange={(e) => change('description', e.target.value)}
                      rows={4}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm font-normal outline-none focus:border-[#f26522]"
                      placeholder="Eleza maudhui ya kitabu, hadhira inayolengwa, na stadi zitakazopatikana…"
                    />
                  </label>

                  <div className="rounded-lg bg-amber-50 p-4 text-xs text-amber-900 border border-amber-200/60 leading-relaxed">
                    <strong>Ilani ya Usimamizi:</strong> Fomu hii inarekodi taarifa za kitabu kwenye mfumo wa hifadhidata wa PostgreSQL. Faili za PDF/ePub zilizolindwa na uthibitisho wa malipo ya M-Pesa hupitiwa na kitengo cha usimamizi kabla ya kuwekwa hadharani.
                  </div>

                  {message && (
                    <div className="rounded-lg bg-slate-100 border border-slate-200 p-3.5 text-xs text-slate-700">
                      {message}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Ghairi
                    </button>
                    <button
                      type="submit"
                      disabled={busy}
                      className="rounded-lg bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#d9531e] disabled:opacity-50 transition-colors"
                    >
                      {busy ? 'Inahifadhi…' : 'Hifadhi Kitabu Kama Rasimu'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: DISPATCH & WAREHOUSE OPERATIONS */}
          {activeTab === 'dispatch' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Truck className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#07294d]">
                      Kitengo cha Usambazaji & Mawasiliano ya Ghala
                    </h2>
                    <p className="text-xs text-slate-500">
                      Taratibu za kutuma vitabu vilivyochapishwa mikoani na kuwezesha usomaji wa kidijitali.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
                      Kituo Kikuu cha Usambazaji
                    </span>
                    <h3 className="mt-1 text-base font-bold text-[#07294d]">
                      Altavox Tech Arusha Operations Desk
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Barabara ya Nduruma, Mtaa wa Unguuni, Jiji la Arusha, Tanzania.
                    </p>
                    <p className="mt-3 text-xs text-slate-600">
                      Simu / WhatsApp: <strong className="text-[#07294d]">+255 750 227 073</strong>
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Barua Pepe: <strong className="text-[#07294d]">admin@altavox.space</strong>
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      Mifumo ya Malipo Inayotumika
                    </span>
                    <h3 className="mt-1 text-base font-bold text-[#07294d]">
                      Lipa kwa Simu / Benki
                    </h3>
                    <ul className="mt-2 text-xs text-slate-600 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        Vodacom M-Pesa (Namba ya Huduma / Till)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        Tigo Pesa & Airtel Money
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        NMB & CRDB Bank Wire (Kwa Maagizo ya Taasisi na Vyuo)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Orodha ya Mabasi na Kampuni za Usafirishaji Mikoani:
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-slate-700">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-bold text-[#07294d]">Dar es Salaam & Pwani</p>
                      <p className="text-[11px] text-slate-500 mt-1">BM Coach, Shabiby, Tahmeed</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">Muda: Saa 12-24</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-bold text-[#07294d]">Kanda ya Ziwa (Mwanza, Shinyanga)</p>
                      <p className="text-[11px] text-slate-500 mt-1">Super Feo, Bright Star</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">Muda: Saa 24-36</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-bold text-[#07294d]">Kusini & Nyanda za Juu (Mbeya, Dodoma)</p>
                      <p className="text-[11px] text-slate-500 mt-1">Al Saedy, Tilisho Safari</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">Muda: Saa 24-48</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
