import { NextResponse } from 'next/server'
import { verifyPayPalWebhookSignature } from '@/lib/payments/paypal'

// In-memory set for event deduplication
const processedEventIds = new Set<string>()

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const headers = request.headers

    const verification = await verifyPayPalWebhookSignature(headers, rawBody)
    if (!verification.verified) {
      console.warn('[PayPal Webhook] Signature verification failed:', verification.error)
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody)
    const eventId = event.id

    // Deduplication check
    if (eventId && processedEventIds.has(eventId)) {
      return NextResponse.json({ received: true, note: 'Duplicate event ignored' })
    }
    if (eventId) {
      processedEventIds.add(eventId)
      // Keep memory bound to last 1,000 events
      if (processedEventIds.size > 1000) {
        const first = processedEventIds.values().next().value
        if (first) processedEventIds.delete(first)
      }
    }

    console.log(`[PayPal Webhook] Processing event ${event.event_type} (${eventId})`)

    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const capture = event.resource
        console.log(`[PayPal] Capture completed: ID ${capture.id}, Amount: ${capture.amount?.value} ${capture.amount?.currency_code}`)
        break
      }
      case 'PAYMENT.CAPTURE.DENIED': {
        const capture = event.resource
        console.warn(`[PayPal] Capture denied: ID ${capture.id}`)
        break
      }
      case 'PAYMENT.CAPTURE.REFUNDED': {
        const refund = event.resource
        console.log(`[PayPal] Refund logged: ID ${refund.id}`)
        break
      }
      case 'CHECKOUT.ORDER.APPROVED': {
        const order = event.resource
        console.log(`[PayPal] Order approved: ID ${order.id}`)
        break
      }
      default:
        console.log(`[PayPal] Unhandled event type: ${event.event_type}`)
    }

    return NextResponse.json({ received: true, eventId })
  } catch (error: any) {
    console.error('[PayPal Webhook Exception]', error)
    return NextResponse.json({ error: error.message || 'Webhook internal failure' }, { status: 500 })
  }
}
