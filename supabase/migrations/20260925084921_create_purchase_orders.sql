CREATE TYPE public.purchase_order_status AS ENUM (
  'draft',
  'completed',
  'cancelled'
);

CREATE TABLE public.purchase_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    po_number varchar(50) UNIQUE NOT NULL,
    supplier_id uuid NOT NULL REFERENCES suppliers (id),
    status purchase_order_status NOT NULL DEFAULT 'draft',
    total numeric(15, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    ordered_at timestamptz NOT NULL DEFAULT now (),
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
);