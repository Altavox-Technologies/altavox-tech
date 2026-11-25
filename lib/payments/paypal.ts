import { createHash, randomUUID } from 'node:crypto'
import {
  CreateOrderParams,
  CreateOrderResult,
  CaptureOrderParams,
  CaptureOrderResult,
  WebhookVerificationResult
} from './types'

const getPayPalBaseUrl = () => {
  return process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}

export interface ExtendedCreateOrderParams extends CreateOrderParams {
  internalOrderId?: string
}

/**
 * Obtain server-side OAuth2 access token from PayPal
 */
export async function getPayPalAccessToken(): Promise<string | null> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return null
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const res = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000)
    })

    if (!res.ok) {
      console.error('[PayPal API] Failed to fetch access token:', res.status)
      return null
    }

    const data = await res.json()
    return data.access_token || null
  } catch (err) {
    console.error('[PayPal API] Token request error:', err)
    return null
  }
}

/**
 * Server-side PayPal Order Creation
 */
export async function createPayPalOrder(
  params: ExtendedCreateOrderParams
): Promise<CreateOrderResult> {
  const internalOrderId = params.internalOrderId || `ATX-${randomUUID().replace(/-/g, '')}`
  const token = await getPayPalAccessToken()

  if (!token) {
    throw new Error('PayPal is not configured. No payment order was created.')
  }

  if (!Number.isFinite(params.amount) || params.amount <= 0) {
    throw new Error('Payment amount must be a positive number.')
  }

  const normalizedCurrency = params.currency === 'TZS' ? 'USD' : params.currency

  const returnUrlObj = new URL(params.returnUrl || `${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/academy/dashboard`)
  returnUrlObj.searchParams.set('order_status', 'success')
  returnUrlObj.searchParams.set('internalOrderId', internalOrderId)
  returnUrlObj.searchParams.set('itemType', params.itemType)
  returnUrlObj.searchParams.set('slug', params.itemSlug)

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: internalOrderId,
        description: `Altavox Tech: ${params.itemTitle}`.slice(0, 127),
        custom_id: params.itemId,
        amount: {
          currency_code: normalizedCurrency,
          value: params.amount.toFixed(2)
        }
      }
    ],
    application_context: {
      brand_name: 'Altavox Technologies',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: returnUrlObj.toString(),
      cancel_url: params.cancelUrl || `${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/academy?order_status=cancelled`
    }
  }

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': internalOrderId
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('[PayPal API] Create order failed:', errorData)
    throw new Error(errorData.message || 'PayPal order creation failed.')
  }

  const orderData = await response.json()
  const approvalLink = orderData.links?.find((l: any) => l.rel === 'approve')?.href

  return {
    internalOrderId,
    provider: 'paypal',
    providerOrderId: orderData.id,
    approvalUrl: approvalLink,
    amount: params.amount,
    currency: normalizedCurrency,
    status: 'created'
  }
}

/**
 * Server-side PayPal Order Capture
 */
export async function capturePayPalOrder(
  params: CaptureOrderParams
): Promise<CaptureOrderResult> {
  const token = await getPayPalAccessToken()

  if (!token || params.providerOrderId.startsWith('MOCK-PAYPAL-')) {
    return {
      success: false,
      internalOrderId: params.internalOrderId,
      providerOrderId: params.providerOrderId,
      transactionId: '',
      amount: 0,
      currency: 'USD',
      status: 'failed',
      message: 'PayPal capture could not be verified. No enrollment was granted.'
    }
  }

  const response = await fetch(
    `${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(params.providerOrderId)}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': createHash('sha256').update(`${params.internalOrderId}:capture`).digest('hex').slice(0, 36)
      },
      signal: AbortSignal.timeout(10_000)
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('[PayPal API] Capture failed:', errorData)
    return {
      success: false,
      internalOrderId: params.internalOrderId,
      providerOrderId: params.providerOrderId,
      transactionId: '',
      amount: 0,
      currency: 'USD',
      status: 'failed',
      message: errorData.message || 'Payment capture failed.'
    }
  }

  const captureData = await response.json()
  const purchaseUnit = captureData.purchase_units?.[0]
  const captureUnit = purchaseUnit?.payments?.captures?.[0]
  const amount = Number(captureUnit?.amount?.value)
  const currency = captureUnit?.amount?.currency_code || 'USD'
  const referenceMatches = purchaseUnit?.reference_id === params.internalOrderId
  const amountMatches =
    Number.isFinite(amount) &&
    Math.round(amount * 100) === Math.round(params.expectedAmount * 100) &&
    currency === params.expectedCurrency
  const isCompleted =
    (captureData.status === 'COMPLETED' || captureUnit?.status === 'COMPLETED') &&
    referenceMatches &&
    amountMatches

  return {
    success: isCompleted,
    internalOrderId: params.internalOrderId,
    providerOrderId: captureData.id,
    transactionId: captureUnit?.id || '',
    amount: Number.isFinite(amount) ? amount : 0,
    currency,
    status: isCompleted ? 'completed' : 'failed',
    ...(isCompleted ? {} : { message: 'PayPal capture did not match the server-quoted order.' })
  }
}

/**
 * PayPal Webhook Signature Verification
 */
export async function verifyPayPalWebhookSignature(
  headers: Headers,
  rawBody: string
): Promise<WebhookVerificationResult> {
  const token = await getPayPalAccessToken()
  const webhookId = process.env.PAYPAL_WEBHOOK_ID

  if (!token || !webhookId) {
    return { verified: false, error: 'PayPal webhook verification is not configured.' }
  }

  const authAlgo = headers.get('paypal-auth-algo')
  const certUrl = headers.get('paypal-cert-url')
  const transmissionId = headers.get('paypal-transmission-id')
  const transmissionSig = headers.get('paypal-transmission-sig')
  const transmissionTime = headers.get('paypal-transmission-time')

  if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    return { verified: false, error: 'Missing required PayPal transmission signature headers.' }
  }

  let webhookEvent: Record<string, any>
  try {
    webhookEvent = JSON.parse(rawBody)
  } catch {
    return { verified: false, error: 'Webhook body is invalid JSON.' }
  }

  const payload = {
    auth_algo: authAlgo,
    cert_url: certUrl,
    transmission_id: transmissionId,
    transmission_sig: transmissionSig,
    transmission_time: transmissionTime,
    webhook_id: webhookId,
    webhook_event: webhookEvent
  }

  try {
    const res = await fetch(
      `${getPayPalBaseUrl()}/v1/notifications/verify-webhook-signature`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000)
      }
    )

    if (!res.ok) {
      return { verified: false, error: 'PayPal verification endpoint returned error.' }
    }

    const data = await res.json()
    const verified = data.verification_status === 'SUCCESS'

    return {
      verified,
      eventType: webhookEvent.event_type,
      resourceId: webhookEvent.resource?.id
    }
  } catch (err: any) {
    return { verified: false, error: err.message || 'Webhook verification exception.' }
  }
}
