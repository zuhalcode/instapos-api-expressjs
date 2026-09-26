CREATE TABLE public.suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    code varchar(20) UNIQUE,
    name varchar(100),
    phone_number varchar(20),
    address text,
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz
);

CREATE SEQUENCE IF NOT EXISTS public.supplier_code_seq
    START WITH 1
    INCREMENT BY 1;

CREATE OR REPLACE FUNCTION public.set_supplier_code()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.code IS NULL OR NEW.code = '' THEN
        NEW.code := 'SUP' || LPAD(
            nextval('supplier_code_seq')::text,
            4,
            '0'
        );
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER set_supplier_code
BEFORE INSERT ON public.suppliers
FOR EACH ROW
EXECUTE FUNCTION public.set_supplier_code();