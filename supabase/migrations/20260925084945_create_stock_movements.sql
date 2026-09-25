CREATE TYPE public.stock_movement_type AS ENUM ('in', 'out', 'adjustment');

CREATE TABLE public.stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  product_id uuid NOT NULL REFERENCES products (id),
  type stock_movement_type NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  reference_id uuid,
  note text,
  created_at timestamptz NOT NULL DEFAULT now ()
);
