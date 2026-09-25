CREATE TYPE sale_status AS ENUM ('completed', 'void');

CREATE TABLE public.sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  invoice_number varchar(50) UNIQUE NOT NULL,
  cashier_id uuid NOT NULL REFERENCES users (id),
  customer_id uuid REFERENCES customers (id),
  subtotal numeric(15, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  discount numeric(15, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total numeric(15, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  status sale_status NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now (),
  updated_at timestamptz
);

CREATE TABLE public.sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  sale_id uuid NOT NULL REFERENCES sales (id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products (id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(15, 2) NOT NULL CHECK (unit_price >= 0),
  subtotal numeric(15, 2) NOT NULL CHECK (subtotal >= 0),
  created_at timestamptz NOT NULL DEFAULT now ()
);