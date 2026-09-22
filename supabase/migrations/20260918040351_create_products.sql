create type public.product_location as enum ('warehouse', 'display');

create table public.products (
    id uuid primary key default gen_random_uuid (),
    name varchar(150) not null,
    price numeric(15, 2) not null,
    is_active boolean not null default true,
    created_at timestamptz not null default now (),
    updated_at timestamptz null
);

create table public.product_stocks (
    product_id uuid not null references public.products (id) on delete cascade,
    quantity integer not null default 0 check (quantity >= 0),
    location public.product_location not null,
    primary key (product_id, location)
);