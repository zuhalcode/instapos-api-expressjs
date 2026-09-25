CREATE TABLE public.settings (
    id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
    store_name varchar(100) NOT NULL,
    address text,
    phone varchar(20),
    logo_url text,
    tax_rate numeric(5, 2) NOT NULL DEFAULT 0 CHECK (
        tax_rate >= 0
        AND tax_rate <= 100
    ),
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
);