'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LibraryBig, BookOpen, ArrowLeft } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

type LibraryBook={id:string;granted_at:string;slug:string;title:string;author:string;cover_image_url:string|null}
export default function MyLibraryPage(){
 const [books,setBooks]=useState<LibraryBook[]>([])
 const [error,setError]=useState('')
 const [loading,setLoading]=useState(true)
 useEffect(()=>{const controller=new AbortController();fetch('/api/bookstore/library',{cache:'no-store',signal:controller.signal}).then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to load your library.');return data.books}).then(setBooks).catch(err=>{if(!controller.signal.aborted)setError(err.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});return()=>controller.abort()},[])
 return <div className="min-h-screen bg-white"><AltavoxHeader/><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"><Link href="/store" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft className="size-4"/> Bookstore</Link><div className="mt-8 flex items-center gap-3"><LibraryBig className="size-8 text-[#f26522]"/><div><p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">YOUR ACCOUNT</p><h1 className="text-3xl font-extrabold text-[#07294d]">My Library</h1></div></div><p className="mt-3 text-sm text-slate-600">Digital books assigned to your account after an order is paid and verified.</p>{loading?<p className="py-20 text-center text-sm text-slate-500">Loading your library…</p>:error?<div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">{error}</div>:books.length===0?<div className="mt-8 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center"><BookOpen className="mx-auto size-10 text-slate-300"/><h2 className="mt-4 text-lg font-bold">Your library is empty</h2><p className="mt-2 text-sm text-slate-500">Purchased digital books will appear here once payment has been verified.</p><Link href="/store" className="mt-5 inline-flex rounded-lg bg-[#f26522] px-5 py-3 text-sm font-bold text-white">Explore books</Link></div>:<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{books.map(book=><article key={book.id} className="overflow-hidden rounded-xl border border-slate-200"><div className="relative aspect-[4/3] bg-slate-100">{book.cover_image_url&&<Image src={book.cover_image_url} alt={book.title} fill className="object-cover"/>}</div><div className="p-5"><h2 className="font-bold">{book.title}</h2><p className="mt-1 text-xs text-slate-500">{book.author}</p><p className="mt-3 text-xs text-slate-500">Added {new Date(book.granted_at).toLocaleDateString()}</p><p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">Secure reading and download will be enabled after private file storage is connected.</p></div></article>)}</div>}</main><AltavoxFooter/></div>
}
