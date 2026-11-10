import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { isAltavoxAdmin } from '@/lib/admin'
import { pool } from '@/lib/db'

export async function POST(request: Request) {
  const session = await auth.api.getSession({headers:await headers()})
  if (!isAltavoxAdmin(session?.user?.email)) return NextResponse.json({error:'Administrator access required.'},{status:403})
  try {
    const body = await request.json()
    const title = typeof body.title==='string' ? body.title.trim().slice(0,180) : ''
    const slug = typeof body.slug==='string' ? body.slug.trim().toLowerCase() : ''
    const content = typeof body.content==='string' ? body.content.trim() : ''
    const author = typeof body.authorName==='string' ? body.authorName.trim().slice(0,100) : ''
    if (!title || !content || !author || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return NextResponse.json({error:'A title, valid URL slug, author and article content are required.'},{status:400})
    if (content.length>100000) return NextResponse.json({error:'Article content must be 100,000 characters or less.'},{status:400})
    const status = body.status==='published' ? 'published' : 'draft'
    const result = await pool.query(
      "INSERT INTO blog_posts (slug,title,excerpt,content,cover_image_url,author_name,category,status,published_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,CASE WHEN $8='published' THEN now() ELSE NULL END) RETURNING id,slug,title,status",
      [slug,title,typeof body.excerpt==='string'?body.excerpt.trim().slice(0,500):'',content,typeof body.coverImageUrl==='string'?body.coverImageUrl.trim().slice(0,1000):null,author,typeof body.category==='string'?body.category.trim().slice(0,80):null,status]
    )
    return NextResponse.json({post:result.rows[0]},{status:201})
  } catch {
    return NextResponse.json({error:'Could not save article. Check the migration and ensure its URL slug is unique.'},{status:503})
  }
}
