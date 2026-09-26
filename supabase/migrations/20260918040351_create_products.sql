CREATE TYPE public.stock_movement_type AS ENUM ('in', 'out', 'adjustment');

CREATE TABLE public.categories (
    id uuid PRIMARY KEY DEFAULT (gen_random_uuid ()),
    name varchar UNIQUE NOT NULL
);

create table public.products (
    id uuid PRIMARY KEY DEFAULT (gen_random_uuid ()),
    category_id uuid NOT NULL REFERENCES public.categories(id),
    barcode varchar(50) UNIQUE,
    name varchar NOT NULL,
    purchase_price numeric(15, 2) NOT NULL DEFAULT 0 
        CHECK (purchase_price >= 0),
    price numeric(15, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
    min_stock integer NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT (now ()),
    updated_at timestamptz
);

CREATE TABLE public.stock_movements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    product_id uuid NOT NULL REFERENCES products (id),
    type stock_movement_type NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    reference_id uuid,
    note text,
    created_at timestamptz NOT NULL DEFAULT now ()
);
