-- MALIPOPAY payment reconciliation: one provider reference may be recorded only once.
CREATE UNIQUE INDEX IF NOT EXISTS book_payments_provider_reference_uq
  ON book_payments(provider, provider_reference)
  WHERE provider_reference IS NOT NULL;
CREATE INDEX IF NOT EXISTS book_payments_order_status_idx
  ON book_payments(order_id, status);
