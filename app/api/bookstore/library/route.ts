import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return NextResponse.json({ error: 'Sign in to view your library.' }, { status: 401 })
  if (!pool) return NextResponse.json({ error: 'Your library is temporarily unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const result = await pool.query(
      'SELECT l.id, l.granted_at, p.slug, p.title, p.author, p.cover_image_url FROM book_library l JOIN book_products p ON p.id = l.product_id WHERE l.customer_id = $1 ORDER BY l.granted_at DESC',
      [session.user.id],
    )
    return NextResponse.json({ books: result.rows })
  } catch {
    return NextResponse.json({ error: 'Your library is temporarily unavailable.' }, { status: 503 })
  }
}
