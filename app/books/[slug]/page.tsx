'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, BookOpen, ShoppingBag, LockKeyhole } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { addBookToCart } from '@/lib/bookstore-cart'

type Product = { id:string; slug:string; title:string; author:string; description:string; cover_image_url:string|null; format:'ebook'|'print'|'both'; category:string|null; language:string; digital_price:string|null; print_price:string|null; stock_quantity:number }
const money = (value:string|null) => value == null ? 'Price not set' : new Intl.NumberFormat('en-TZ',{style:'currency',currency:'TZS',maximumFractionDigits:0}).format(Number(value))

export default function BookDetailPage() {
  const params = useParams<{slug:string}>()
  const [book,setBook] = useState<Product|null>(null)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(true)
  const [cartMessage,setCartMessage] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/bookstore/products/${encodeURIComponent(params.slug)}`,{signal:controller.signal,cache:'no-store'})
      .then(async response => { const data=await response.json(); if(!response.ok) throw new Error(data.error || 'Book unavailable'); return data.product })
      .then(setBook).catch(err => { if(!controller.signal.aborted) setError(err.message) })
      .finally(() => { if(!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  },[params.slug])
  return <div className="min-h-screen bg-white text-slate-900"><AltavoxHeader/><main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <Link href="/store" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#f26522]"><ArrowLeft className="size-4"/> Back to bookstore</Link>
    {loading ? <p className="py-24 text-center text-sm text-slate-500">Loading book…</p> : error || !book ? <div className="py-24 text-center"><h1 className="text-2xl font-bold">Book unavailable</h1><p className="mt-2 text-sm text-slate-500">{error || 'This book may have been unpublished.'}</p></div> : <div className="mt-8 grid gap-10 md:grid-cols-[minmax(240px,360px)_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">{book.cover_image_url ? <Image src={book.cover_image_url} alt={book.title} fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover"/> : <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400"><BookOpen className="size-16"/><span className="text-sm">Cover not uploaded</span></div>}</div>
      <div className="py-2"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f26522]">ALTAVOX BOOKSTORE {book.category ? `/ ${book.category}` : ''}</p><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{book.title}</h1><p className="mt-3 text-sm text-slate-500">Written by <span className="font-semibold text-slate-800">{book.author}</span> · {book.language}</p><p className="mt-7 whitespace-pre-line text-sm leading-7 text-slate-700">{book.description || 'Book description will be provided by the author.'}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">{(book.format==='ebook'||book.format==='both')&&<div className="rounded-xl border border-slate-200 p-5"><BookOpen className="size-5 text-[#f26522]"/><p className="mt-3 text-xs text-slate-500">Digital edition</p><p className="mt-1 text-xl font-bold">{money(book.digital_price)}</p><p className="mt-2 text-xs text-slate-500">Added to your library after confirmed payment.</p></div>}{(book.format==='print'||book.format==='both')&&<div className="rounded-xl border border-slate-200 p-5"><ShoppingBag className="size-5 text-[#f26522]"/><p className="mt-3 text-xs text-slate-500">Printed edition</p><p className="mt-1 text-xl font-bold">{money(book.print_price)}</p><p className="mt-2 text-xs text-slate-500">{Number(book.stock_quantity)>0 ? `${book.stock_quantity} copies currently listed in stock` : 'Availability must be confirmed before ordering.'}</p></div>}</div>
        <div className="mt-6 flex flex-wrap gap-3">
          {(book.format==='ebook'||book.format==='both')&&<button onClick={()=>{if(book.digital_price==null){setCartMessage('Digital price is not available yet.');return}addBookToCart({productId:book.id,slug:book.slug,title:book.title,author:book.author,format:'ebook',quantity:1,unitPrice:Number(book.digital_price),coverImageUrl:book.cover_image_url});setCartMessage('Digital edition added to your cart.')}} className="rounded-lg bg-[#f26522] px-5 py-3 text-sm font-bold text-white">Add eBook to cart</button>}
          {(book.format==='print'||book.format==='both')&&<button disabled={Number(book.stock_quantity)<1||book.print_price==null} onClick={()=>{addBookToCart({productId:book.id,slug:book.slug,title:book.title,author:book.author,format:'print',quantity:1,unitPrice:Number(book.print_price),coverImageUrl:book.cover_image_url});setCartMessage('Printed edition added to your cart.')}} className="rounded-lg border border-[#07294d] px-5 py-3 text-sm font-bold text-[#07294d] disabled:cursor-not-allowed disabled:opacity-40">Add printed book to cart</button>}
          <Link href="/cart" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">View cart</Link>
        </div>
        {cartMessage&&<p role="status" className="mt-3 text-xs text-emerald-700">{cartMessage}</p>}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#f26522]"/>Secure checkout and digital delivery will be enabled when payment processing and file storage are configured.</div>
      </div>
    </div>}
  </main><AltavoxFooter/></div>
}
