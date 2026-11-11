import { NextResponse } from 'next/server'
import { coursesData } from '@/lib/courses-data'
import { publishedBooks } from '@/lib/bookstore-data'
import { capturePayPalOrder } from '@/lib/payments/paypal'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return NextResponse.json({ error: 'PayPal capture is not configured. No enrollment was granted.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 16_384) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })

  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { internalOrderId, providerOrderId, itemType, itemSlug, customerEmail } = body
    if (typeof internalOrderId !== 'string' || !/^ATX-[0-9a-f]{32}$/i.test(internalOrderId) || typeof providerOrderId !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(providerOrderId) || !['course', 'book'].includes(itemType) || typeof itemSlug !== 'string' || itemSlug.length > 120 || typeof customerEmail !== 'string' || !emailPattern.test(customerEmail.trim())) {
      return NextResponse.json({ error: 'Invalid payment capture details.' }, { status: 400 })
    }

    let expectedAmount: number
    if (itemType === 'course') {
      const course = coursesData.find((item) => item.slug === itemSlug)
      if (!course) return NextResponse.json({ error: 'Selected course does not exist.' }, { status: 404 })
      expectedAmount = course.discountPrice
    } else {
      const book = publishedBooks.find((item) => item.slug === itemSlug)
      const priceTzs = Number(book?.digital_price)
      if (!book || !Number.isFinite(priceTzs) || priceTzs <= 0) return NextResponse.json({ error: 'Selected book is unavailable for digital checkout.' }, { status: 404 })
      expectedAmount = Math.max(10, Math.round(priceTzs / 2600))
    }

    const captureResult = await capturePayPalOrder({
      internalOrderId,
      providerOrderId,
      expectedAmount,
      expectedCurrency: 'USD'
    })

    if (!captureResult.success) {
      return NextResponse.json({ error: captureResult.message || 'Payment capture could not be verified.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and captured successfully.',
      capture: captureResult,
      enrollment: {
        itemType,
        itemSlug,
        enrolledAt: new Date().toISOString(),
        customerEmail: customerEmail.trim().toLowerCase(),
        status: 'active'
      }
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[API Capture PayPal Order Error]', error)
    return NextResponse.json({ error: 'Payment capture processing failed. Please contact support before retrying.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } })
  }
}
