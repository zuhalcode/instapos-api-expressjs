create type public.user_role as enum (
  'superuser',
  'owner',
  'supervisor',
  'cashier',
  'customer',
  'user'
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);

CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (
        id,
        name,
        email,
        role
    )
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'name',
            split_part(COALESCE(NEW.email, ''), '@', 1)
        ),
        NEW.email,
        'user'::public.user_role
    );

    RETURN NEW;
END;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_user_profile();