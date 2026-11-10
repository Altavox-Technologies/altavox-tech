export type PaymentIntegrationState =
  | 'NOT_CONFIGURED'
  | 'CATALOG_ONLY'
  | 'SANDBOX'
  | 'OPERATIONAL'
  | 'DEGRADED'
  | 'DISABLED'

export interface PaymentProviderStatus {
  id: string
  name: string
  state: PaymentIntegrationState
  currency: string
  description: string
  supportedTypes: ('course' | 'book' | 'service')[]
}

export interface CreateOrderParams {
  itemType: 'course' | 'book'
  itemId: string
  itemSlug: string
  itemTitle: string
  amount: number
  currency: 'USD' | 'TZS'
  customerEmail: string
  customerName?: string
  customerPhone?: string
  returnUrl?: string
  cancelUrl?: string
}

export interface CreateOrderResult {
  internalOrderId: string
  provider: string
  providerOrderId: string
  approvalUrl?: string
  amount: number
  currency: string
  status: 'pending' | 'created' | 'mock_approved'
}

export interface CaptureOrderParams {
  internalOrderId: string
  providerOrderId: string
}

export interface CaptureOrderResult {
  success: boolean
  internalOrderId: string
  providerOrderId: string
  transactionId: string
  amount: number
  currency: string
  status: 'completed' | 'denied' | 'pending' | 'failed'
  message?: string
}

export interface WebhookVerificationResult {
  verified: boolean
  eventType?: string
  resourceId?: string
  error?: string
}

export const registeredPaymentProviders: PaymentProviderStatus[] = [
  {
    id: 'paypal',
    name: 'PayPal Business (Altavox Technologies)',
    state: process.env.PAYPAL_CLIENT_ID ? (process.env.PAYPAL_MODE === 'live' ? 'OPERATIONAL' : 'SANDBOX') : 'NOT_CONFIGURED',
    currency: 'USD',
    description: 'International card and PayPal checkout with automated server capture and webhook reconciliation.',
    supportedTypes: ['course', 'book']
  },
  {
    id: 'mpesa',
    name: 'Vodacom M-Pesa Daraja',
    state: 'CATALOG_ONLY',
    currency: 'TZS',
    description: 'East African mobile-money payment rail. Configured for manual till dispatch and direct merchant verification.',
    supportedTypes: ['course', 'book', 'service']
  },
  {
    id: 'airtel_money',
    name: 'Airtel Money',
    state: 'CATALOG_ONLY',
    currency: 'TZS',
    description: 'Regional mobile-money push collection rail.',
    supportedTypes: ['course', 'book', 'service']
  },
  {
    id: 'mixx_yas',
    name: 'Mixx by Yas (Tigo Pesa)',
    state: 'CATALOG_ONLY',
    currency: 'TZS',
    description: 'Automated QR and push-USSD mobile billing gateway.',
    supportedTypes: ['course', 'book', 'service']
  },
  {
    id: 'azampesa',
    name: 'AzamPesa',
    state: 'CATALOG_ONLY',
    currency: 'TZS',
    description: 'Merchant collection integration for regional digital orders.',
    supportedTypes: ['book', 'service']
  }
]
