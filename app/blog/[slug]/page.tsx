'use client'

import { useEffect,useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

type Post={title:string;content:string;author_name:string;category:string|null;published_at:string|null}
export default function BlogArticlePage(){
 const params=useParams<{slug:string}>()
 const [post,setPost]=useState<Post|null>(null)
 const [error,setError]=useState('')
 useEffect(()=>{const controller=new AbortController();fetch(`/api/blog?slug=${encodeURIComponent(params.slug)}`,{signal:controller.signal}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error);setPost(d.post)}).catch(e=>{if(!controller.signal.aborted)setError(e.message||'Article unavailable')});return()=>controller.abort()},[params.slug])
 return <div className="min-h-screen bg-white"><AltavoxHeader/><main className="mx-auto max-w-3xl px-4 py-14 sm:px-6"><Link href="/blog" className="text-sm font-semibold text-[#f26522]">← All articles</Link>{error?<p className="mt-10 text-sm text-red-700">{error}</p>:!post?<p className="mt-10 text-sm text-slate-500">Loading article…</p>:<article className="mt-8"><p className="text-xs font-bold uppercase tracking-widest text-[#f26522]">{post.category||'Insights'}</p><h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#07294d]">{post.title}</h1><p className="mt-4 text-xs text-slate-500">By {post.author_name}</p><div className="mt-10 whitespace-pre-wrap text-base leading-8 text-slate-700">{post.content}</div></article>}</main><AltavoxFooter/></div>
}
