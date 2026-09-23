create type public.product_location as enum ('warehouse', 'display');

create table public.products (
    id uuid primary key default gen_random_uuid (),
    name varchar(150) not null,
    price numeric(15, 2) not null,
    is_active boolean not null default true,
    created_at timestamptz not null default now (),
    updated_at timestamptz 
);

create table public.product_stocks (
    product_id uuid not null references public.products (id) on delete cascade,
    quantity integer not null default 0 check (quantity >= 0),
    location public.product_location not null,
    primary key (product_id, location)
);

-- Create product + initial stocks
create or replace function public.create_product (
    p_name varchar(150),
    p_price numeric(15, 2)
)

returns public.products
language plpgsql
security invoker
set search_path = public
as $$
declare
    v_product public.products;
begin
    insert into public.products (
        name,
        price
    )
    values (
        p_name,
        p_price
    )
    returning * into v_product;

    insert into public.product_stocks (
        product_id,
        location,
        quantity
    )
    values
        (v_product.id, 'warehouse', 0),
        (v_product.id, 'display', 0);

    return v_product;
end;
$$;