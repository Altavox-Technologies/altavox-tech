'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function BlogAdminPage() {
  const [form,setForm]=useState({title:'',slug:'',excerpt:'',content:'',authorName:'',category:'',coverImageUrl:'',status:'draft'})
  const [message,setMessage]=useState('')
  const [busy,setBusy]=useState(false)
  function change(key:keyof typeof form,value:string){setForm(current=>({...current,[key]:value}))}
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setBusy(true);setMessage('')
    try{
      const response=await fetch('/api/blog/manage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      const data=await response.json()
      if(!response.ok)throw new Error(data.error||'Unable to save article.')
      setMessage(`Article saved as ${data.post.status}: ${data.post.title}`)
      setForm({title:'',slug:'',excerpt:'',content:'',authorName:'',category:'',coverImageUrl:'',status:'draft'})
    }catch(error){setMessage(error instanceof Error?error.message:'Unable to save article.')}
    finally{setBusy(false)}
  }
  const input=(label:string,key:keyof typeof form,placeholder:string)=><label className="block text-sm font-semibold text-slate-700">{label}<input value={form[key]} onChange={e=>change(key,e.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal"/></label>
  return <div className="min-h-screen bg-slate-50"><AltavoxHeader/><main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"><Link href="/blog" className="text-sm font-semibold text-[#f26522]">← View blog</Link><p className="mt-7 text-xs font-bold uppercase tracking-widest text-[#f26522]">CONTENT MANAGEMENT</p><h1 className="mt-2 text-3xl font-extrabold text-[#07294d]">Publish an article</h1><p className="mt-2 text-sm text-slate-600">Create a draft or publish a reviewed article. Only configured administrators can save content.</p>
  <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2">{input('Article title','title','Title')}{input('URL slug','slug','article-url-slug')}{input('Author name','authorName','Author')}{input('Category','category','Company news, insights')}{input('Cover image URL','coverImageUrl','https://...')}</div>
  <label className="block text-sm font-semibold text-slate-700">Short excerpt<textarea rows={2} value={form.excerpt} onChange={e=>change('excerpt',e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm font-normal"/></label>
  <label className="block text-sm font-semibold text-slate-700">Article content<textarea required rows={14} value={form.content} onChange={e=>change('content',e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm font-normal" placeholder="Write the full article text here."/></label>
  <label className="block text-sm font-semibold text-slate-700">Publishing status<select value={form.status} onChange={e=>change('status',e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="draft">Save as draft</option><option value="published">Publish now</option></select></label>
  {message&&<p role="status" className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p>}<button disabled={busy} className="rounded-lg bg-[#f26522] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy?'Saving…':'Save article'}</button></form></main><AltavoxFooter/></div>
}
