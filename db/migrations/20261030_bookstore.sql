CREATE TABLE IF NOT EXISTS book_products (
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
CREATE INDEX IF NOT EXISTS book_products_status_created_idx ON book_products(status, created_at DESC);

CREATE TABLE IF NOT EXISTS book_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_id text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
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
CREATE TABLE IF NOT EXISTS book_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES book_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES book_products(id) ON DELETE RESTRICT,
  title_snapshot text NOT NULL,
  format text NOT NULL CHECK (format IN ('ebook','print')),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0),
  line_total numeric(12,2) NOT NULL CHECK (line_total >= 0)
);
CREATE TABLE IF NOT EXISTS book_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES book_orders(id) ON DELETE RESTRICT,
  provider text NOT NULL,
  provider_reference text,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency text NOT NULL DEFAULT 'TZS',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','failed','refunded')),
  raw_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS book_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES book_products(id) ON DELETE RESTRICT,
  order_item_id uuid NOT NULL UNIQUE REFERENCES book_order_items(id) ON DELETE RESTRICT,
  granted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(customer_id, product_id, order_item_id)
);
CREATE TABLE IF NOT EXISTS book_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  library_item_id uuid NOT NULL REFERENCES book_library(id) ON DELETE CASCADE,
  downloaded_at timestamptz NOT NULL DEFAULT now(),
  ip_address inet
);
