import { NextResponse } from 'next/server'
import { coursesData } from '@/lib/courses-data'
import { publishedBooks } from '@/lib/bookstore-data'
import { createPayPalOrder } from '@/lib/payments/paypal'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { itemType, itemSlug, customerEmail, customerName } = body

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
      customerEmail: customerEmail || 'guest@altavox.space',
      customerName: customerName || 'Valued Customer',
      returnUrl: `${process.env.BETTER_AUTH_URL || ''}/academy/dashboard?order_status=success`,
      cancelUrl: `${process.env.BETTER_AUTH_URL || ''}/academy?order_status=cancelled`
    })

    return NextResponse.json({
      success: true,
      order: result
    })
  } catch (error: any) {
    console.error('[API Create PayPal Order Error]', error)
    return NextResponse.json(
      { error: error.message || 'Unable to initiate PayPal transaction.' },
      { status: 500 }
    )
  }
}
