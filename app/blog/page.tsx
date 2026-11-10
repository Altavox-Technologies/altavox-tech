'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

type Post={slug:string;title:string;excerpt:string;author_name:string;category:string|null;published_at:string|null;cover_image_url:string|null}
export default function BlogPage(){
 const [posts,setPosts]=useState<Post[]>([])
 const [error,setError]=useState('')
 const [loading,setLoading]=useState(true)
 useEffect(()=>{fetch('/api/blog').then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error);setPosts(d.posts||[])}).catch(e=>setError(e.message||'Unable to load articles.')).finally(()=>setLoading(false))},[])
 return <div className="min-h-screen bg-white"><AltavoxHeader/><main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">ALTAVOX INSIGHTS</p><h1 className="mt-2 text-4xl font-extrabold text-[#07294d]">Ideas for what comes next.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Perspectives on technology, intelligent systems and digital transformation.</p>
 {loading?<p className="py-20 text-sm text-slate-500">Loading articles…</p>:error?<p role="alert" className="mt-8 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>:posts.length===0?<div className="mt-10 rounded-xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500">No articles have been published yet.</div>:<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post=><article key={post.slug} className="rounded-xl border border-slate-200 p-6"><p className="text-[10px] font-bold uppercase tracking-widest text-[#f26522]">{post.category||'Insights'}</p><h2 className="mt-3 text-xl font-bold text-[#07294d]">{post.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p><p className="mt-4 text-xs text-slate-500">By {post.author_name}</p><Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-bold text-[#f26522]">Read article →</Link></article>)}</div>}
 </main><AltavoxFooter/></div>
}
