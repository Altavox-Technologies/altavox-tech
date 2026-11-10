'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function BookstoreAdminPage() {
  const [form,setForm] = useState({title:'',author:'',slug:'',description:'',coverImageUrl:'',format:'both',category:'',language:'English',digitalPrice:'',printPrice:'',stockQuantity:'0'})
  const [message,setMessage] = useState('')
  const [busy,setBusy] = useState(false)
  const [savedProduct,setSavedProduct] = useState<{id:string;title:string;status:string}|null>(null)
  function change(key:string,value:string) { setForm(current=>({...current,[key]:value})) }
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true); setMessage('')
    try {
      const response=await fetch('/api/bookstore/manage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      const data=await response.json()
      if(!response.ok) throw new Error(data.error || 'Unable to save book.')
      setSavedProduct(data.product)
      setMessage(`Saved as draft: ${data.product.title}. Review it, then publish it below.`)
      setForm({title:'',author:'',slug:'',description:'',coverImageUrl:'',format:'both',category:'',language:'English',digitalPrice:'',printPrice:'',stockQuantity:'0'})
    } catch(error) { setMessage(error instanceof Error ? error.message : 'Unable to save book.') }
    finally { setBusy(false) }
  }
  async function publishSavedBook() {
    if (!savedProduct) return
    setBusy(true)
    try {
      const response = await fetch('/api/bookstore/manage', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id:savedProduct.id, status:'published' }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to publish book.')
      setSavedProduct(data.product)
      setMessage(`Published: ${data.product.title}. It is now visible in the public bookstore.`)
    } catch(error) { setMessage(error instanceof Error ? error.message : 'Unable to publish book.') }
    finally { setBusy(false) }
  }
  const field=(label:string,key:keyof typeof form,placeholder:string,type='text')=><label className="block text-sm font-semibold text-slate-700">{label}<input type={type} value={form[key]} onChange={e=>change(key,e.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-[#f26522]" /></label>
  return <div className="min-h-screen bg-slate-50"><AltavoxHeader/><main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"><div className="flex flex-wrap gap-4"><Link href="/store" className="text-sm font-semibold text-[#f26522]">← View bookstore</Link><Link href="/admin/bookstore/orders" className="text-sm font-semibold text-[#07294d]">Manage orders →</Link><Link href="/admin/blog" className="text-sm font-semibold text-[#07294d]">Manage blog →</Link></div><p className="mt-7 text-xs font-bold uppercase tracking-widest text-[#f26522]">BOOKSTORE MANAGEMENT</p><h1 className="mt-2 text-3xl font-extrabold text-[#07294d]">Add a book</h1><p className="mt-2 text-sm text-slate-600">New books are saved as drafts. Review the content and set the status to published before customers can see them.</p>
    <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">{field('Book title','title','Title')}{field('Author','author','Author name')}{field('URL slug','slug','example-book-title')}{field('Category','category','Technology, Fiction, Education')}{field('Language','language','English')}{field('Cover image URL','coverImageUrl','https://...') }
      <label className="block text-sm font-semibold text-slate-700">Available format<select value={form.format} onChange={e=>change('format',e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="both">Digital and printed</option><option value="ebook">Digital only</option><option value="print">Printed only</option></select></label>
      {field('eBook price (TZS)','digitalPrice','Leave blank if unavailable','number')}{field('Printed price (TZS)','printPrice','Leave blank if unavailable','number')}{field('Printed stock quantity','stockQuantity','0','number')}</div>
      <label className="block text-sm font-semibold text-slate-700">Description<textarea value={form.description} onChange={e=>change('description',e.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none focus:border-[#f26522]" placeholder="Describe the book, its audience and what readers will learn."/></label>
      <div className="rounded-lg bg-amber-50 p-4 text-xs leading-5 text-amber-900">This form creates catalogue metadata only. Uploading protected eBook files, confirming payments and dispatching printed orders are separate steps and are not yet activated.</div>
      {message && <p role="status" className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p>}
      {savedProduct?.status === 'draft' && <button type="button" onClick={publishSavedBook} disabled={busy} className="mr-3 rounded-lg border border-emerald-600 px-6 py-3 text-sm font-bold text-emerald-700 disabled:opacity-50">{busy?'Publishing…':'Publish saved book'}</button>}
      <button disabled={busy} className="rounded-lg bg-[#f26522] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy?'Saving…':'Save book as draft'}</button>
    </form>
  </main><AltavoxFooter/></div>
}
