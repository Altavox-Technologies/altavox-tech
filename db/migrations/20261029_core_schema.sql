CREATE TABLE IF NOT EXISTS public."user" (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  image text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.session (
  id text PRIMARY KEY,
  "expiresAt" timestamptz NOT NULL,
  token text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.account (
  id text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.verification (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  service text,
  project_type text,
  timeline text,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  phone text
);

CREATE TABLE IF NOT EXISTS public.devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text,
  external_id text,
  status text NOT NULL DEFAULT 'unknown',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid NOT NULL,
  metric text NOT NULL,
  value numeric,
  unit text,
  observed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.network_commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid,
  command text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  requested_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  actor text,
  resource_type text,
  resource_id uuid,
  outcome text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL,
  cover_image_url text,
  author_name text NOT NULL,
  category text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.computer_service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_type text NOT NULL,
  device_details text NOT NULL,
  issue_description text NOT NULL,
  preferred_date date,
  status text NOT NULL DEFAULT 'received' CHECK (status IN ('received','reviewing','quoted','approved','in_progress','ready','completed','cancelled')),
  quote_amount numeric(12,2),
  quote_currency text NOT NULL DEFAULT 'TZS',
  staff_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.book_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  author text NOT NULL,
  description text NOT NULL DEFAULT '',
  cover_image_url text,
  format text NOT NULL CHECK (format IN ('ebook','print','both')),
  category text,
  language text NOT NULL DEFAULT 'English',
  digital_price numeric(12,2) CHECK (digital_price IS NULL OR digital_price >= 0),
  print_price numeric(12,2) CHECK (print_price IS NULL OR print_price >= 0),
  stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  digital_file_key text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.book_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_id text NOT NULL REFERENCES public."user"(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  delivery_address text,
  delivery_region text,
  subtotal numeric(12,2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee numeric(12,2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  total numeric(12,2) NOT NULL CHECK (total >= 0),
  currency text NOT NULL DEFAULT 'TZS',
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  order_status text NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending','processing','shipped','delivered','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.book_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.book_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.book_products(id) ON DELETE RESTRICT,
  title_snapshot text NOT NULL,
  format text NOT NULL CHECK (format IN ('ebook','print')),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0),
  line_total numeric(12,2) NOT NULL CHECK (line_total >= 0)
);

CREATE TABLE IF NOT EXISTS public.book_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.book_orders(id) ON DELETE RESTRICT,
  provider text NOT NULL,
  provider_reference text,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency text NOT NULL DEFAULT 'TZS',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','failed','refunded')),
  raw_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.book_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.book_products(id) ON DELETE RESTRICT,
  order_item_id uuid NOT NULL UNIQUE REFERENCES public.book_order_items(id) ON DELETE RESTRICT,
  granted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(customer_id, product_id, order_item_id)
);

CREATE TABLE IF NOT EXISTS public.book_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  library_item_id uuid NOT NULL REFERENCES public.book_library(id) ON DELETE CASCADE,
  downloaded_at timestamptz NOT NULL DEFAULT now(),
  ip_address inet
);

CREATE INDEX IF NOT EXISTS blog_posts_status_published_idx ON public.blog_posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS computer_requests_tracking_lookup_idx ON public.computer_service_requests(tracking_code, lower(customer_email));
CREATE INDEX IF NOT EXISTS computer_requests_created_idx ON public.computer_service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS book_products_status_created_idx ON public.book_products(status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS book_payments_provider_reference_uq ON public.book_payments(provider, provider_reference) WHERE provider_reference IS NOT NULL;
CREATE INDEX IF NOT EXISTS book_payments_order_status_idx ON public.book_payments(order_id, status);
