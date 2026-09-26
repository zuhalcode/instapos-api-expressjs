CREATE TYPE public.purchase_order_status AS ENUM (
  'draft',
  'completed',
  'cancelled'
);

CREATE TABLE public.suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    code varchar(20) UNIQUE,
    name varchar(100),
    phone_number varchar(20),
    address text,
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
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

CREATE TABLE public.purchase_order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    purchase_order_id uuid NOT NULL REFERENCES purchase_orders (id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products (id),
    quantity integer NOT NULL CHECK (quantity > 0),
    unit_price numeric(15, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal numeric(15, 2) NOT NULL CHECK (subtotal >= 0),
    created_at timestamptz NOT NULL DEFAULT now ()
);