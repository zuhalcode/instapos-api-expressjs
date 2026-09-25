CREATE TABLE public.customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    code_member varchar(20) UNIQUE,
    name varchar(100),
    phone_number varchar(20),
    point integer NOT NULL DEFAULT 0 CHECK (point >= 0),
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
);