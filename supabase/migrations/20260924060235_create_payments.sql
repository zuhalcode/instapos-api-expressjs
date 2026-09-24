create type public.payment_method as enum (
  'cash',
  'qris',
  'card',
  'transfer'
);

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  sale_id uuid NOT NULL REFERENCES sales(id),
  method payment_method NOT NULL,
  amount numeric(15,2) NOT NULL,
  paid_amount numeric(15,2) NOT NULL,
  change_amount numeric(15,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT (now())
);