import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!pool) return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const query = request.nextUrl.searchParams.get('q')?.trim()
    const values: string[] = []
    let where = "status = 'published'"
    if (query) {
      values.push(`%${query.slice(0, 100)}%`)
      where += ` AND (title ILIKE $1 OR author ILIKE $1 OR description ILIKE $1)`
    }
    const result = await pool.query(
      `SELECT id, slug, title, author, description, cover_image_url, format, category, language, digital_price, print_price, stock_quantity FROM book_products WHERE ${where} ORDER BY created_at DESC LIMIT 60`,
      values,
    )
    return NextResponse.json({ products: result.rows })
  } catch {
    return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503 })
  }
}
