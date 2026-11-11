import { NextResponse } from 'next/server'
import { capturePayPalOrder } from '@/lib/payments/paypal'
import { pool } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { internalOrderId, providerOrderId, itemType, itemSlug, customerEmail } = body

    if (!internalOrderId || !providerOrderId) {
      return NextResponse.json(
        { error: 'internalOrderId and providerOrderId are required.' },
        { status: 400 }
      )
    }

    const captureResult = await capturePayPalOrder({
      internalOrderId,
      providerOrderId
    })

    if (!captureResult.success) {
      return NextResponse.json(
        {
          error: captureResult.message || 'Payment capture was declined or failed.',
          capture: captureResult
        },
        { status: 400 }
      )
    }

    // Persist payment record if database pool is connected
    if (pool) {
      try {
        await pool.query(
          `INSERT INTO book_payments (order_id, provider, provider_reference, amount, currency, status)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING`,
          [
            // Fallback UUID if order_id requires uuid
            typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : '00000000-0000-0000-0000-000000000001',
            'paypal',
            captureResult.transactionId,
            captureResult.amount,
            captureResult.currency,
            'completed'
          ]
        )
      } catch (dbErr) {
        // Non-fatal if database is not active; mock fallback handles memory
        console.warn('[Payments DB] Could not record to book_payments:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and captured successfully.',
      capture: captureResult,
      enrollment: {
        itemType: itemType || 'course',
        itemSlug,
        enrolledAt: new Date().toISOString(),
        customerEmail: customerEmail || 'customer@altavox.space',
        status: 'active'
      }
    })
  } catch (error: any) {
    console.error('[API Capture PayPal Order Error]', error)
    return NextResponse.json(
      { error: error.message || 'Payment capture processing error.' },
      { status: 500 }
    )
  }
}
