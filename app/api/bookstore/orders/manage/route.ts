import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { isAltavoxAdmin } from '@/lib/admin'
import { pool } from '@/lib/db'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  return isAltavoxAdmin(session?.user?.email)
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 })
  try {
    const result = await pool.query("SELECT o.id,o.order_number,o.customer_name,o.customer_email,o.customer_phone,o.delivery_address,o.delivery_region,o.subtotal,o.delivery_fee,o.total,o.currency,o.payment_status,o.order_status,o.created_at, COALESCE(json_agg(json_build_object('title',i.title_snapshot,'format',i.format,'quantity',i.quantity,'unit_price',i.unit_price)) FILTER (WHERE i.id IS NOT NULL), '[]') AS items FROM book_orders o LEFT JOIN book_order_items i ON i.order_id=o.id GROUP BY o.id ORDER BY o.created_at DESC LIMIT 200")
    return NextResponse.json({ orders: result.rows })
  } catch {
    return NextResponse.json({ error: 'Order management is unavailable.' }, { status: 503 })
  }
}

export async function PATCH(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 })
  const client = await pool.connect()
  try {
    const body = await request.json()
    const id = String(body.id ?? '')
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return NextResponse.json({ error: 'Valid order ID required.' }, { status: 400 })
    await client.query('BEGIN')
    const found = await client.query('SELECT id,payment_status,order_status FROM book_orders WHERE id=$1 FOR UPDATE', [id])
    const order = found.rows[0]
    if (!order) { await client.query('ROLLBACK'); return NextResponse.json({ error: 'Order not found.' }, { status: 404 }) }
    if (body.action !== 'cancel' || !['pending','failed'].includes(order.payment_status) || order.order_status !== 'pending') {
      await client.query('ROLLBACK')
      return NextResponse.json({ error: 'Only unpaid pending orders can be cancelled through this action.' }, { status: 409 })
    }
    const items = await client.query("SELECT product_id,quantity FROM book_order_items WHERE order_id=$1 AND format='print'", [id])
    for (const item of items.rows) await client.query('UPDATE book_products SET stock_quantity=stock_quantity+$1, updated_at=now() WHERE id=$2', [item.quantity,item.product_id])
    await client.query("UPDATE book_orders SET order_status='cancelled',updated_at=now() WHERE id=$1", [id])
    await client.query('COMMIT')
    return NextResponse.json({ success: true })
  } catch {
    await client.query('ROLLBACK')
    return NextResponse.json({ error: 'Could not update the order.' }, { status: 503 })
  } finally {
    client.release()
  }
}