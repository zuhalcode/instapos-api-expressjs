-- =========================================================
-- PURCHASE ORDER STATUS
-- =========================================================

CREATE TYPE public.purchase_order_status AS ENUM (
    'draft',
    'completed',
    'cancelled'
);

-- =========================================================
-- PURCHASE ORDER NUMBER SEQUENCE
-- =========================================================

CREATE SEQUENCE IF NOT EXISTS public.purchase_order_number_seq;

-- =========================================================
-- PURCHASE ORDERS
-- =========================================================

CREATE TABLE public.purchase_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    po_number varchar(50) NOT NULL UNIQUE DEFAULT (
        'PO' || LPAD(
            nextval('public.purchase_order_number_seq')::text,
            6,
            '0'
        )
    ),

    supplier_id uuid NOT NULL
        REFERENCES public.suppliers(id),

    status public.purchase_order_status NOT NULL DEFAULT 'draft',

    total numeric(15, 2) NOT NULL DEFAULT 0
        CHECK (total >= 0),

    ordered_at timestamptz,

    created_at timestamptz NOT NULL DEFAULT now(),

    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =========================================================
-- PURCHASE ORDER ITEMS
-- =========================================================

CREATE TABLE public.purchase_order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    purchase_order_id uuid NOT NULL
        REFERENCES public.purchase_orders(id)
        ON DELETE CASCADE,

    product_id uuid NOT NULL
        REFERENCES public.products(id),

    quantity integer NOT NULL
        CHECK (quantity > 0),

    unit_price numeric(15, 2) NOT NULL
        CHECK (unit_price >= 0),

    subtotal numeric(15, 2)
        GENERATED ALWAYS AS (
            quantity * unit_price
        ) STORED,

    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT purchase_order_items_unique_product
        UNIQUE (purchase_order_id, product_id)
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX purchase_orders_supplier_id_idx
    ON public.purchase_orders(supplier_id);

CREATE INDEX purchase_orders_status_idx
    ON public.purchase_orders(status);

CREATE INDEX purchase_order_items_product_id_idx
    ON public.purchase_order_items(product_id);


-- =========================================================
-- COMPLETE PURCHASE ORDER
-- =========================================================

CREATE OR REPLACE FUNCTION public.complete_purchase_order(
    p_purchase_order_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
    v_status public.purchase_order_status;
BEGIN

    -- =====================================================
    -- 1. Lock purchase order
    -- =====================================================

    SELECT po.status
    INTO v_status
    FROM public.purchase_orders AS po
    WHERE po.id = p_purchase_order_id
    FOR UPDATE;


    -- =====================================================
    -- 2. Validate purchase order exists
    -- =====================================================

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Purchase order not found';
    END IF;


    -- =====================================================
    -- 3. Validate purchase order status
    -- =====================================================

    IF v_status <> 'draft' THEN
        RAISE EXCEPTION
            'Purchase order cannot be completed from status %',
            v_status;
    END IF;


    -- =====================================================
    -- 4. Validate purchase order has items
    -- =====================================================

    IF NOT EXISTS (
        SELECT 1
        FROM public.purchase_order_items AS poi
        WHERE poi.purchase_order_id = p_purchase_order_id
    ) THEN
        RAISE EXCEPTION
            'Purchase order must have at least one item';
    END IF;


    -- =====================================================
    -- 5. Calculate purchase order total
    -- =====================================================

    UPDATE public.purchase_orders AS po
    SET
        total = (
            SELECT COALESCE(SUM(poi.subtotal), 0)
            FROM public.purchase_order_items AS poi
            WHERE poi.purchase_order_id = p_purchase_order_id
        ),
        ordered_at = COALESCE(po.ordered_at, now()),
        updated_at = now()
    WHERE po.id = p_purchase_order_id;


    -- =====================================================
    -- 6. Update inventory
    -- =====================================================

    UPDATE public.products AS p
    SET
        stock = p.stock + poi.quantity,
        purchase_price = poi.unit_price
    FROM public.purchase_order_items AS poi
    WHERE poi.purchase_order_id = p_purchase_order_id
      AND poi.product_id = p.id;


    -- =====================================================
    -- 7. Complete purchase order
    -- =====================================================

    UPDATE public.purchase_orders AS po
    SET
        status = 'completed',
        updated_at = now()
    WHERE po.id = p_purchase_order_id;

END;
$$;