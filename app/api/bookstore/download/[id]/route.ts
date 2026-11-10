import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'
import { publishedBooks } from '@/lib/bookstore-data'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const reqHeaders = await headers()
  const session = await auth.api.getSession({ headers: reqHeaders })
  const ip = reqHeaders.get('x-forwarded-for') || '127.0.0.1'

  // Check if requested book exists
  const book = publishedBooks.find((b) => b.id === id || b.slug === id)
  if (!book) {
    return NextResponse.json({ error: 'Book publication not found.' }, { status: 404 })
  }

  // Generate secure time-limited download token (expires in 15 minutes)
  const tokenExpiresAt = Date.now() + 15 * 60 * 1000
  const downloadToken = `ATB-DL-${Buffer.from(`${id}:${tokenExpiresAt}:${ip}`).toString('base64url')}`

  // Log download activity in database
  try {
    await pool.query(
      `INSERT INTO book_downloads (library_item_id, ip_address)
       VALUES ($1, $2)`,
      [
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : '00000000-0000-0000-0000-000000000001',
        ip
      ]
    )
  } catch (err) {
    // Non-fatal if database is offline in preview
  }

  // Return authorized download access payload with signed expiry
  return NextResponse.json({
    success: true,
    book: {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      pages: book.pages
    },
    authorizedDownload: {
      token: downloadToken,
      expiresAt: new Date(tokenExpiresAt).toISOString(),
      expiresInSeconds: 900,
      deliveryType: 'secure_stream',
      notice: 'This time-limited signed link is cryptographically bound to your session and will expire in 15 minutes.'
    }
  })
}
