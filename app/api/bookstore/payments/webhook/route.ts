import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { pool } from '@/lib/db'

export const runtime = 'nodejs'

function validSignature(rawBody: string, signature: string, secret: string) {
  const provided = signature.replace(/^sha256=/i, '').trim()
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(provided, 'hex')
  const b = Buffer.from(expected, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const secret = process.env.MALIPOPAY_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 })
  const rawBody = await request.text()
  const signature = request.headers.get('x-malipopay-signature') || ''
  if (!validSignature(rawBody, signature, secret)) return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 })
  let event: { event?: string; service?: string; type?: string; status?: string; reference?: string; customerReference?: string; amount?: number; transactionId?: string }
  try { event = JSON.parse(rawBody) } catch { return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 }) }
  if (event.service !== 'Collection' || event.type !== 'CHARGE' || !event.reference || !event.customerReference) return NextResponse.json({ received: true, ignored: true })
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const orderResult = await client.query('SELECT id,order_number,customer_id,total,payment_status,order_status FROM book_orders WHERE order_number=$1 FOR UPDATE', [event.customerReference])
    const order = orderResult.rows[0]
    if (!order) { await client.query('ROLLBACK'); return NextResponse.json({ received: true, matched: false }) }
    const paymentResult = await client.query('SELECT id,amount,status FROM book_payments WHERE order_id=$1 AND provider_reference=$2 FOR UPDATE', [order.id,event.reference])
    const payment = paymentResult.rows[0]
    if (!payment) { await client.query('ROLLBACK'); return NextResponse.json({ received: true, matched: false }) }
    if (payment.status === 'refunded' || (payment.status === 'confirmed' && event.event !== 'payment.refunded')) { await client.query('COMMIT'); return NextResponse.json({ received: true, duplicate: true }) }
    if (event.event === 'payment.confirmed' && ['SUCCESSFUL','PAID'].includes(String(event.status).toUpperCase())) {
      const paidAmount = Number(event.amount)
      if (!Number.isSafeInteger(paidAmount) || paidAmount !== Number(order.total) || paidAmount !== Number(payment.amount)) {
        await client.query('UPDATE book_payments SET raw_response=$1::jsonb WHERE id=$2', [JSON.stringify(event),payment.id])
        await client.query('COMMIT')
        return NextResponse.json({ received: true, needsReconciliation: true })
      }
      await client.query("UPDATE book_payments SET status='confirmed',raw_response=$1::jsonb WHERE id=$2", [JSON.stringify(event),payment.id])
      await client.query("UPDATE book_orders SET payment_status='paid',order_status='processing',updated_at=now() WHERE id=$1", [order.id])
      await client.query("INSERT INTO book_library (customer_id,product_id,order_item_id) SELECT $1,product_id,id FROM book_order_items WHERE order_id=$2 AND format='ebook' ON CONFLICT DO NOTHING", [order.customer_id,order.id])
    } else if (event.event === 'payment.failed') {
      await client.query("UPDATE book_payments SET status='failed',raw_response=$1::jsonb WHERE id=$2", [JSON.stringify(event),payment.id])
      await client.query("UPDATE book_orders SET payment_status='failed',updated_at=now() WHERE id=$1 AND payment_status='pending'", [order.id])
    } else if (event.event === 'payment.refunded') {
      await client.query("UPDATE book_payments SET status='refunded',raw_response=$1::jsonb WHERE id=$2", [JSON.stringify(event),payment.id])
      await client.query("UPDATE book_orders SET payment_status='refunded',updated_at=now() WHERE id=$1", [order.id])
      await client.query('DELETE FROM book_library WHERE order_item_id IN (SELECT id FROM book_order_items WHERE order_id=$1)', [order.id])
    }
    await client.query('COMMIT')
    return NextResponse.json({ received: true })
  } catch {
    await client.query('ROLLBACK')
    return NextResponse.json({ error: 'Could not process payment notification.' }, { status: 500 })
  } finally {
    client.release()
  }
}