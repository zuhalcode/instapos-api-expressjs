CREATE TABLE public.categories (
    id uuid PRIMARY KEY DEFAULT (gen_random_uuid ()),
    name varchar UNIQUE NOT NULL
);

create table public.products (
    id uuid PRIMARY KEY DEFAULT (gen_random_uuid ()),
    category_id uuid NOT NULL,
    name varchar NOT NULL,
    price numeric(15, 2) NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    stock integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT (now ()),
    updated_at timestamptz
);

