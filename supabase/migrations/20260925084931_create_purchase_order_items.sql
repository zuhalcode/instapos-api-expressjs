CREATE TABLE public.purchase_order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    purchase_order_id uuid NOT NULL REFERENCES purchase_orders (id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products (id),
    quantity integer NOT NULL CHECK (quantity > 0),
    unit_price numeric(15, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal numeric(15, 2) NOT NULL CHECK (subtotal >= 0),
    created_at timestamptz NOT NULL DEFAULT now ()
);