CREATE TABLE IF NOT EXISTS computer_service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_type text NOT NULL,
  device_details text NOT NULL,
  issue_description text NOT NULL,
  preferred_date date,
  status text NOT NULL DEFAULT 'received'
    CHECK (status IN ('received','reviewing','quoted','approved','in_progress','ready','completed','cancelled')),
  quote_amount numeric(12,2),
  quote_currency text NOT NULL DEFAULT 'TZS',
  staff_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS computer_requests_tracking_lookup_idx
  ON computer_service_requests (tracking_code, lower(customer_email));
CREATE INDEX IF NOT EXISTS computer_requests_created_idx
  ON computer_service_requests (created_at DESC);
