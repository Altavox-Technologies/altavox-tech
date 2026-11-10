import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  if (!pool) return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const { slug } = await context.params
    const result = await pool.query("SELECT id,slug,title,author,description,cover_image_url,format,category,language,digital_price,print_price,stock_quantity FROM book_products WHERE slug = $1 AND status = 'published' LIMIT 1", [slug])
    if (!result.rows[0]) return NextResponse.json({ error: 'Book not found.' }, { status: 404 })
    return NextResponse.json({ product: result.rows[0] })
  } catch {
    return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503 })
  }
}
