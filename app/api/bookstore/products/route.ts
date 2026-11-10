import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { publishedBooks } from '@/lib/bookstore-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim().toLowerCase()
  const category = request.nextUrl.searchParams.get('category')?.trim()
  const format = request.nextUrl.searchParams.get('format')?.trim()

  try {
    const values: string[] = []
    let where = "status = 'published'"
    if (query) {
      values.push(`%${query.slice(0, 100)}%`)
      where += ` AND (title ILIKE $1 OR author ILIKE $1 OR description ILIKE $1 OR category ILIKE $1)`
    }
    const result = await pool.query(
      `SELECT id, slug, title, author, description, cover_image_url, format, category, language, digital_price, print_price, stock_quantity FROM book_products WHERE ${where} ORDER BY created_at DESC LIMIT 60`,
      values,
    )

    if (result && Array.isArray(result.rows) && result.rows.length > 0) {
      let products = result.rows
      if (category && category !== 'All Titles') {
        products = products.filter((p: any) => p.category?.toLowerCase() === category.toLowerCase())
      }
      if (format && format !== 'all') {
        products = products.filter((p: any) => p.format === format || p.format === 'both')
      }
      return NextResponse.json({ products })
    }
  } catch (error) {
    // Database read fallback to curated technical catalog
  }

  // Fallback to official curated Altavox Tech technical book catalogue
  let filtered = [...publishedBooks]
  if (query) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.language.toLowerCase().includes(query),
    )
  }
  if (category && category !== 'All Titles') {
    filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase())
  }
  if (format && format !== 'all') {
    filtered = filtered.filter((b) => b.format === format || b.format === 'both')
  }

  return NextResponse.json({
    products: filtered.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      author: b.author,
      description: b.description,
      cover_image_url: b.cover_image_url,
      format: b.format,
      category: b.category,
      language: b.language,
      digital_price: b.digital_price,
      print_price: b.print_price,
      stock_quantity: b.stock_quantity,
      isbn: b.isbn,
      pages: b.pages,
      publicationDate: b.publicationDate,
      chapters: b.chapters,
      sampleExcerpt: b.sampleExcerpt,
      targetAudience: b.targetAudience,
      keyTakeaways: b.keyTakeaways
    })),
  })
}
