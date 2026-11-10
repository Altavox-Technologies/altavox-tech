import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { isAdminEmail } from '@/lib/admin'
import { pool } from '@/lib/db'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdminEmail(session.user.email, session.user.emailVerified)) {
    return NextResponse.json({ error: 'Administrator access required.' }, { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }
  if (!pool) return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    const slug = String(body.slug ?? '').trim().toLowerCase()
    const title = String(body.title ?? '').trim()
    const author = String(body.author ?? '').trim()
    const format = String(body.format ?? '')
    if (!title || title.length > 200 || !author || author.length > 160 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 180 || !['ebook', 'print', 'both'].includes(format)) {
      return NextResponse.json({ error: 'Valid title, author, slug and format are required.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
    }
    const digitalPrice = body.digitalPrice === '' || body.digitalPrice == null ? null : Number(body.digitalPrice)
    const printPrice = body.printPrice === '' || body.printPrice == null ? null : Number(body.printPrice)
    const stock = Number(body.stockQuantity ?? 0)
    if ((digitalPrice !== null && (!Number.isFinite(digitalPrice) || digitalPrice < 0 || digitalPrice > 1000000000)) || (printPrice !== null && (!Number.isFinite(printPrice) || printPrice < 0 || printPrice > 1000000000)) || !Number.isInteger(stock) || stock < 0 || stock > 1000000) {
      return NextResponse.json({ error: 'Prices and stock must be valid non-negative numbers.' }, { status: 400 })
    }
    const result = await pool.query(
      "INSERT INTO book_products (slug,title,author,description,cover_image_url,format,category,language,digital_price,print_price,stock_quantity,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'draft') RETURNING id,slug,title,status",
      [slug,title,author,String(body.description ?? '').slice(0,5000),typeof body.coverImageUrl === 'string' && /^https:\/\//i.test(body.coverImageUrl) ? body.coverImageUrl.slice(0,1000) : null,format,typeof body.category === 'string' ? body.category.slice(0,80) : null,typeof body.language === 'string' ? body.language.slice(0,40) : 'English',digitalPrice,printPrice,stock],
    )
    if (!result.rows[0]) return NextResponse.json({ error: 'Database did not confirm the save.' }, { status: 503 })
    return NextResponse.json({ product: result.rows[0] }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Could not save the book. Check the database migration and make sure its slug is unique.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdminEmail(session.user.email, session.user.emailVerified)) return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 })
  try {
    const body = await request.json()
    const id = String(body.id ?? '')
    const status = String(body.status ?? '')
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) || !['draft','published','archived'].includes(status)) {
      return NextResponse.json({ error: 'A valid book ID and publishing status are required.' }, { status: 400 })
    }
    if (status === 'published') {
      const found = await pool.query('SELECT id,format,digital_price,print_price,stock_quantity,digital_file_key FROM book_products WHERE id=$1 LIMIT 1',[id])
      const book = found.rows[0]
      if (!book) return NextResponse.json({ error: 'Book not found.' }, { status: 404 })
      if ((book.format === 'ebook' || book.format === 'both') && (!book.digital_file_key || Number(book.digital_price) <= 0)) {
        return NextResponse.json({ error: 'Digital books need a configured price and private uploaded file before publication.' }, { status: 409 })
      }
      if ((book.format === 'print' || book.format === 'both') && (Number(book.print_price) <= 0 || Number(book.stock_quantity) < 1)) {
        return NextResponse.json({ error: 'Printed books need a configured price and at least one copy in stock before publication.' }, { status: 409 })
      }
    }
    const result = await pool.query(
      'UPDATE book_products SET status=$1, updated_at=now() WHERE id=$2 RETURNING id,slug,title,status',
      [status,id],
    )
    if (!result.rows[0]) return NextResponse.json({ error: 'Book not found.' }, { status: 404 })
    return NextResponse.json({ product: result.rows[0] })
  } catch {
    return NextResponse.json({ error: 'Could not update the book status.' }, { status: 503 })
  }
}
