import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'

export const runtime = 'nodejs'

const mobileProviders = new Set(['VODACOM','AIRTEL','TIGO'])
const bankProviders = new Set(['CRDB','NMB'])
function normalizeTzPhone(value: unknown) {
  let phone = String(value ?? '').replace(/[\s()+-]/g, '')
  if (/^0[0-9]{9}$/.test(phone)) phone = '255' + phone.slice(1)
  if (/^[67][0-9]{8}$/.test(phone)) phone = '255' + phone
  return /^255[0-9]{9}$/.test(phone) ? phone : null
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return NextResponse.json({ error: 'Sign in before paying for an order.' }, { status: 401 })
  const token = process.env.MALIPOPAY_API_TOKEN
  if (!token) return NextResponse.json({ error: 'Online payments are not configured yet. Please contact the bookstore.' }, { status: 503 })
  let body: Record<string, unknown>
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }) }
  const orderId = String(body.orderId ?? '')
  const provider = String(body.provider ?? '').toUpperCase()
  const isMobile = mobileProviders.has(provider)
  const isBank = bankProviders.has(provider)
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(orderId) || (!isMobile && !isBank)) return NextResponse.json({ error: 'Select a supported payment channel.' }, { status: 400 })
  const account = isMobile ? normalizeTzPhone(body.phone) : String(body.bankAccount ?? '').replace(/\s/g, '')
  if (!account || (isBank && !/^[A-Za-z0-9-]{5,32}$/.test(account))) return NextResponse.json({ error: isMobile ? 'Enter a valid Tanzania mobile number.' : 'Enter the bank payment account or bill reference provided by your bank.' }, { status: 400 })
  try {
    const found = await pool.query("SELECT id,order_number,total,currency,payment_status,customer_id FROM book_orders WHERE id=$1 AND customer_id=$2 LIMIT 1", [orderId,session.user.id])
    const order = found.rows[0]
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    if (order.payment_status !== 'pending') return NextResponse.json({ error: 'This order is no longer awaiting payment.' }, { status: 409 })
    const amount = Number(order.total)
    if (!Number.isSafeInteger(amount) || amount < 100) return NextResponse.json({ error: 'Order total must be a whole TZS amount of at least TZS 100.' }, { status: 400 })
    const gatewayResponse = await fetch('https://core-prod.malipopay.co.tz/api/v2/payment/collection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', apiToken: token },
      body: JSON.stringify({ reference: order.order_number, description: 'Altavox Book Hub order ' + order.order_number, amount, provider, service: isMobile ? 'mobile' : 'account', account, amountType: 'FULL', push: isMobile }),
      cache: 'no-store',
    })
    const result = await gatewayResponse.json().catch(() => ({})) as { success?: boolean; message?: string; data?: { reference?: string; status?: string; id?: string; link?: string } }
    if (!gatewayResponse.ok || !result.success || !result.data?.reference) return NextResponse.json({ error: result.message || 'The payment provider did not accept this request. You can retry safely using the same order.' }, { status: 502 })
    await pool.query("INSERT INTO book_payments (order_id,provider,provider_reference,amount,currency,status,raw_response) VALUES ($1,$2,$3,$4,'TZS','pending',$5::jsonb) ON CONFLICT (provider,provider_reference) WHERE provider_reference IS NOT NULL DO NOTHING", [order.id,'MALIPOPAY_' + provider,result.data.reference,amount,JSON.stringify(result)])
    return NextResponse.json({ success: true, orderNumber: order.order_number, paymentReference: result.data.reference, status: result.data.status || 'PROCESSING', checkoutUrl: result.data.link || null, message: isMobile ? 'Payment prompt sent. Approve it on your phone, then wait for confirmation.' : 'Payment request created. Follow your bank payment instructions; access is granted only after verified confirmation.' })
  } catch {
    return NextResponse.json({ error: 'Payment service is temporarily unavailable. Your order remains unpaid; retrying with the same order will not create a duplicate gateway charge.' }, { status: 503 })
  }
}