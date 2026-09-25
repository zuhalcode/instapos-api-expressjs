CREATE TABLE public.suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    code varchar(20) UNIQUE,
    name varchar(100),
    phone_number varchar(20),
    address text,
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
);