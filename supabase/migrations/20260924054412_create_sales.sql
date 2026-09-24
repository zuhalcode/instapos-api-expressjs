CREATE TABLE public.sales (
  id uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  invoice_number varchar UNIQUE NOT NULL,
  cashier_id uuid NOT NULL REFERENCES users(id),
  total numeric(15,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT (now()),
  updated_at timestamptz
);

CREATE TABLE public.sale_items (
  id uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  sale_id uuid NOT NULL REFERENCES sales(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price numeric(15,2) NOT NULL,
  subtotal numeric(15,2) NOT NULL
);