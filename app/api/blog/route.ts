import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')
    if (slug) {
      const result = await pool.query("SELECT slug,title,excerpt,content,cover_image_url,author_name,category,published_at FROM blog_posts WHERE slug=$1 AND status='published' LIMIT 1",[slug])
      if (!result.rows[0]) return NextResponse.json({error:'Article not found.'},{status:404})
      return NextResponse.json({post:result.rows[0]})
    }
    const result = await pool.query("SELECT slug,title,excerpt,cover_image_url,author_name,category,published_at FROM blog_posts WHERE status='published' ORDER BY published_at DESC LIMIT 50")
    return NextResponse.json({posts:result.rows})
  } catch {
    return NextResponse.json({error:'Blog database is unavailable. Apply the blog posts migration first.'},{status:503})
  }
}
