import { NextResponse } from 'next/server'
import { registeredPaymentProviders } from '@/lib/payments/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    providers: registeredPaymentProviders,
    primaryCurrency: 'USD',
    regionalCurrency: 'TZS',
    businessName: 'Altavox Technologies',
    paypalMode: process.env.PAYPAL_MODE || 'sandbox'
  })
}
