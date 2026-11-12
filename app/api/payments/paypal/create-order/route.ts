import { NextResponse } from 'next/server'
import { coursesData } from '@/lib/courses-data'
import { publishedBooks } from '@/lib/bookstore-data'
import { createPayPalOrder } from '@/lib/payments/paypal'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getPublicBaseUrl() {
  const configuredUrl = process.env.BETTER_AUTH_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
    ?? process.env.V0_RUNTIME_URL
    ?? 'http://localhost:3000'
  return configuredUrl
}

export async function POST(request: Request) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return NextResponse.json({ error: 'PayPal checkout is not configured. No payment was created.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 16_384) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })

  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { itemType, itemSlug, customerEmail, customerName } = body
    if (!['course', 'book'].includes(itemType) || typeof itemSlug !== 'string' || itemSlug.length < 1 || itemSlug.length > 120 || typeof customerEmail !== 'string' || !emailPattern.test(customerEmail.trim())) {
      return NextResponse.json({ error: 'Provide a valid item and customer email.' }, { status: 400 })
    }

    if (!itemType || !itemSlug) {
      return NextResponse.json(
        { error: 'itemType and itemSlug are required parameters.' },
        { status: 400 }
      )
    }

    let verifiedTitle = ''
    let verifiedPriceUSD = 0
    let itemId = ''

    if (itemType === 'course') {
      const course = coursesData.find((c) => c.slug === itemSlug)
      if (!course) {
        return NextResponse.json({ error: 'Selected course does not exist.' }, { status: 404 })
      }
      verifiedTitle = course.title
      verifiedPriceUSD = course.discountPrice > 0 ? course.discountPrice : 149
      itemId = course.id
    } else if (itemType === 'book') {
      const book = publishedBooks.find((b) => b.slug === itemSlug)
      if (!book) {
        return NextResponse.json({ error: 'Selected book does not exist.' }, { status: 404 })
      }
      verifiedTitle = book.title
      // Approximate USD conversion for digital book (e.g. 35,000 TZS ~ $14)
      verifiedPriceUSD = Math.max(10, Math.round(Number(book.digital_price || 35000) / 2600))
      itemId = book.id
    } else {
      return NextResponse.json({ error: 'Invalid itemType. Must be course or book.' }, { status: 400 })
    }

    const result = await createPayPalOrder({
      itemType,
      itemId,
      itemSlug,
      itemTitle: verifiedTitle,
      amount: verifiedPriceUSD,
      currency: 'USD',
      customerEmail: customerEmail.trim().toLowerCase(),
      customerName: typeof customerName === 'string' ? customerName.trim().slice(0, 120) : 'Valued Customer',
      returnUrl: new URL('/academy/dashboard?order_status=success', getPublicBaseUrl()).toString(),
      cancelUrl: new URL('/academy?order_status=cancelled', getPublicBaseUrl()).toString()
    })

    return NextResponse.json({
      success: true,
      order: result
    })
  } catch (error: any) {
    console.error('[API Create PayPal Order Error]', error)
    return NextResponse.json(
      { error: 'Unable to initiate PayPal checkout. Please try again later.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
