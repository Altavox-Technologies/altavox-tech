import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id || !session.user.email) return NextResponse.json({ error: 'Sign in before placing an order.' }, { status: 401 })
  if (!pool) return NextResponse.json({ error: 'Bookstore database is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  let client
  try {
    const body = await request.json()
    if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 20) return NextResponse.json({ error: 'Add between 1 and 20 items.' }, { status: 400 })
    client = await pool.connect()
    await client.query('BEGIN')
    let subtotal = 0
    const orderItems: Array<{id:string;title:string;format:string;quantity:number;price:number}> = []
    for (const item of body.items) {
      const quantity = Number(item.quantity)
      const format = String(item.format)
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10 || !['ebook','print'].includes(format)) throw new Error('Invalid item quantity or format.')
      const found = await client.query("SELECT id,title,format,digital_price,print_price,stock_quantity FROM book_products WHERE id = $1 AND status = 'published' FOR UPDATE", [item.productId])
      const product = found.rows[0]
      if (!product) throw new Error('A selected book is no longer available.')
      if (product.format !== 'both' && product.format !== format) throw new Error('The selected format is not available.')
      if (format === 'print' && Number(product.stock_quantity) < quantity) throw new Error('There is not enough printed stock for this book.')
      const rawPrice = format === 'ebook' ? product.digital_price : product.print_price
      const price = Number(rawPrice)
      if (rawPrice == null || !Number.isFinite(price) || price < 0) throw new Error('The price for a selected book has not been configured.')
      subtotal += price * quantity
      orderItems.push({id:product.id,title:product.title,format,quantity,price})
    }
    const orderNumber = `ATB-${randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`
    const deliveryAddress = typeof body.deliveryAddress === 'string' ? body.deliveryAddress.slice(0,1000) : null
    const deliveryRegion = typeof body.deliveryRegion === 'string' ? body.deliveryRegion.slice(0,100) : null
    const phone = typeof body.phone === 'string' ? body.phone.slice(0,40) : null
    const hasPrintedItems = orderItems.some(item => item.format === 'print')
    const configuredDeliveryFee = process.env.BOOKSTORE_FLAT_DELIVERY_FEE_TZS
    const deliveryFee = hasPrintedItems ? Number(configuredDeliveryFee) : 0
    if (hasPrintedItems && !deliveryAddress) throw new Error('A delivery address is required for printed books.')
    if (hasPrintedItems && (!configuredDeliveryFee || !Number.isFinite(deliveryFee) || deliveryFee < 0)) throw new Error('Printed-book delivery is not configured yet.')
    const created = await client.query("INSERT INTO book_orders (order_number,customer_id,customer_name,customer_email,customer_phone,delivery_address,delivery_region,subtotal,delivery_fee,total,currency) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'TZS') RETURNING id,order_number,total,payment_status,order_status", [orderNumber,session.user.id,session.user.name || session.user.email,session.user.email,phone,deliveryAddress,deliveryRegion,subtotal,deliveryFee,subtotal+deliveryFee])
    const order = created.rows[0]
    if (!order) throw new Error('The database did not confirm the order.')
    for (const item of orderItems) {
      await client.query('INSERT INTO book_order_items (order_id,product_id,title_snapshot,format,quantity,unit_price,line_total) VALUES ($1,$2,$3,$4,$5,$6,$7)', [order.id,item.id,item.title,item.format,item.quantity,item.price,item.price*item.quantity])
    }
    await client.query('COMMIT')
    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    if (client) await client.query('ROLLBACK')
    console.error('[bookstore] order creation failed', error)
    return NextResponse.json({ error: 'Could not create the order. Check your selections and try again.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
  } finally {
    client?.release()
  }
}
