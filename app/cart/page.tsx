'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { BookCartItem, cartUpdatedEventName, readBookCart, writeBookCart } from '@/lib/bookstore-cart'

const money = (value:number) => new Intl.NumberFormat('en-TZ',{style:'currency',currency:'TZS',maximumFractionDigits:0}).format(value)

export default function BookCartPage() {
  const [items,setItems] = useState<BookCartItem[]>([])
  const [ready,setReady] = useState(false)
  useEffect(() => {
    const refresh = () => setItems(readBookCart())
    refresh()
    setReady(true)
    window.addEventListener('storage',refresh)
    window.addEventListener(cartUpdatedEventName(),refresh)
    return () => { window.removeEventListener('storage',refresh); window.removeEventListener(cartUpdatedEventName(),refresh) }
  },[])
  const subtotal = useMemo(() => items.reduce((sum,item) => sum + item.unitPrice * item.quantity,0),[items])
  function update(item:BookCartItem,quantity:number) {
    const next = items.map(entry => entry.productId===item.productId && entry.format===item.format ? {...entry,quantity} : entry).filter(entry=>entry.quantity>0)
    writeBookCart(next); setItems(next)
  }
  return <div className="min-h-screen bg-slate-50 text-slate-900"><AltavoxHeader/><main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">ALTAVOX BOOKSTORE</p><h1 className="mt-2 text-3xl font-extrabold text-[#07294d]">Your shopping cart</h1>
    {!ready ? <p className="py-20 text-center text-sm text-slate-500">Loading cart…</p> : items.length===0 ? <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><ShoppingBag className="mx-auto size-10 text-slate-300"/><h2 className="mt-4 text-xl font-bold">Your cart is empty</h2><p className="mt-2 text-sm text-slate-500">Browse the bookstore and add a title to get started.</p><Link href="/store" className="mt-6 inline-flex rounded-lg bg-[#f26522] px-5 py-3 text-sm font-bold text-white">Browse books</Link></div> :
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]"><section className="space-y-4">{items.map(item=><article key={item.productId+item.format} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">{item.coverImageUrl&&<Image src={item.coverImageUrl} alt="" fill sizes="96px" className="object-cover"/>}</div>
      <div className="min-w-0 flex-1"><Link href={`/books/${item.slug}`} className="font-bold text-[#07294d] hover:text-[#f26522]">{item.title}</Link><p className="mt-1 text-xs text-slate-500">{item.author} · {item.format==='ebook'?'Digital edition':'Printed edition'}</p><p className="mt-3 text-sm font-bold">{money(item.unitPrice)}</p>
      <div className="mt-3 flex items-center gap-3"><button aria-label="Decrease quantity" onClick={()=>update(item,item.quantity-1)} className="rounded border p-1"><Minus className="size-3"/></button><span className="min-w-5 text-center text-sm">{item.quantity}</span><button aria-label="Increase quantity" disabled={item.quantity>=10} onClick={()=>update(item,item.quantity+1)} className="rounded border p-1 disabled:opacity-40"><Plus className="size-3"/></button><button onClick={()=>update(item,0)} className="ml-auto inline-flex items-center gap-1 text-xs text-red-600"><Trash2 className="size-3"/>Remove</button></div></div>
      <p className="hidden text-sm font-bold sm:block">{money(item.unitPrice*item.quantity)}</p></article>)}</section>
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Order summary</h2><div className="mt-5 flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><strong>{money(subtotal)}</strong></div><p className="mt-3 text-xs leading-5 text-slate-500">Delivery charges for printed books are calculated by the bookstore. Payment checkout will be activated after merchant payment credentials are configured.</p><Link href="/checkout" className="mt-6 block w-full rounded-lg bg-[#f26522] px-4 py-3 text-center text-sm font-bold text-white hover:bg-orange-600">Continue to checkout</Link><Link href="/store" className="mt-4 block text-center text-xs font-semibold text-[#f26522]">Continue shopping</Link></aside>
    </div>}
  </main><AltavoxFooter/></div>
}
