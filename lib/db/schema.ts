import { boolean, integer, jsonb, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow()
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull()
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow()
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow()
})

export const inquiries = pgTable('inquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  organization: text('organization'),
  service: text('service'),
  projectType: text('project_type'),
  timeline: text('timeline'),
  description: text('description').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  provider: text('provider'),
  externalId: text('external_id'),
  status: text('status').notNull().default('unknown'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const telemetry = pgTable('telemetry', {
  id: uuid('id').defaultRandom().primaryKey(),
  deviceId: uuid('device_id').notNull(),
  metric: text('metric').notNull(),
  value: numeric('value'),
  unit: text('unit'),
  observedAt: timestamp('observed_at', { withTimezone: true }).notNull().defaultNow()
})

export const networkCommands = pgTable('network_commands', {
  id: uuid('id').defaultRandom().primaryKey(),
  deviceId: uuid('device_id'),
  command: text('command').notNull(),
  status: text('status').notNull().default('queued'),
  requestedAt: timestamp('requested_at', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true })
})

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  action: text('action').notNull(),
  actor: text('actor'),
  resourceType: text('resource_type'),
  resourceId: uuid('resource_id'),
  outcome: text('outcome').notNull(),
  metadata: jsonb('metadata').notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const bookProducts = pgTable('book_products', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  description: text('description').notNull().default(''),
  coverImageUrl: text('cover_image_url'),
  format: text('format').notNull(),
  category: text('category'),
  language: text('language').notNull().default('English'),
  digitalPrice: numeric('digital_price', { precision: 12, scale: 2 }),
  printPrice: numeric('print_price', { precision: 12, scale: 2 }),
  stockQuantity: integer('stock_quantity').notNull().default(0),
  digitalFileKey: text('digital_file_key'),
  status: text('status').notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})

export const bookOrders = pgTable('book_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerId: text('customer_id').notNull(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  deliveryAddress: text('delivery_address'),
  deliveryRegion: text('delivery_region'),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
  deliveryFee: numeric('delivery_fee', { precision: 12, scale: 2 }).notNull().default('0'),
  total: numeric('total', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('TZS'),
  paymentStatus: text('payment_status').notNull().default('pending'),
  orderStatus: text('order_status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})

export const bookOrderItems = pgTable('book_order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull(),
  productId: uuid('product_id').notNull(),
  titleSnapshot: text('title_snapshot').notNull(),
  format: text('format').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
  lineTotal: numeric('line_total', { precision: 12, scale: 2 }).notNull()
})

export const bookPayments = pgTable('book_payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull(),
  provider: text('provider').notNull(),
  providerReference: text('provider_reference'),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('TZS'),
  status: text('status').notNull().default('pending'),
  rawResponse: jsonb('raw_response'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const bookLibrary = pgTable('book_library', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: text('customer_id').notNull(),
  productId: uuid('product_id').notNull(),
  orderItemId: uuid('order_item_id').notNull().unique(),
  grantedAt: timestamp('granted_at', { withTimezone: true }).notNull().defaultNow()
})

export const bookDownloads = pgTable('book_downloads', {
  id: uuid('id').defaultRandom().primaryKey(),
  libraryItemId: uuid('library_item_id').notNull(),
  downloadedAt: timestamp('downloaded_at', { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text('ip_address')
})

export const computerServiceRequests = pgTable('computer_service_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  trackingCode: text('tracking_code').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  serviceType: text('service_type').notNull(),
  deviceDetails: text('device_details').notNull(),
  issueDescription: text('issue_description').notNull(),
  preferredDate: text('preferred_date'),
  status: text('status').notNull().default('received'),
  quoteAmount: numeric('quote_amount', { precision: 12, scale: 2 }),
  quoteCurrency: text('quote_currency').notNull().default('TZS'),
  staffNote: text('staff_note'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})
