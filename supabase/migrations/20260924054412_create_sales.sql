CREATE TYPE sale_status AS ENUM ('completed', 'void');

create type public.payment_method as enum ('cash', 'qris', 'card', 'transfer');

CREATE TABLE public.sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  invoice_number varchar(50) UNIQUE NOT NULL,
  cashier_id uuid NOT NULL REFERENCES users (id),
  customer_id uuid REFERENCES customers (id),
  subtotal numeric(15, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  discount numeric(15, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total numeric(15, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  status sale_status NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now (),
  updated_at timestamptz
);

CREATE TABLE public.sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  sale_id uuid NOT NULL REFERENCES sales (id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products (id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(15, 2) NOT NULL CHECK (unit_price >= 0),
  subtotal numeric(15, 2) NOT NULL CHECK (subtotal >= 0),
  created_at timestamptz NOT NULL DEFAULT now ()
);

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT (gen_random_uuid ()),
  sale_id uuid NOT NULL REFERENCES sales (id) ON DELETE NO ACTION,
  method payment_method NOT NULL,
  amount numeric(15, 2) NOT NULL CHECK (amount > 0),
  created_at timestamptz NOT NULL DEFAULT (now ())
);

CREATE INDEX idx_payments_sale_id ON public.payments (sale_id);

CREATE SEQUENCE IF NOT EXISTS public.sales_invoice_seq
    AS bigint
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1;

CREATE OR REPLACE FUNCTION public.create_sale(
    p_cashier_id uuid,
    p_customer_id uuid DEFAULT NULL,
    p_discount numeric(15, 2) DEFAULT 0,
    p_items jsonb DEFAULT '[]'::jsonb,
    p_payments jsonb DEFAULT '[]'::jsonb
)
RETURNS public.sales
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_sale public.sales;

    v_invoice_number varchar(50);

    v_subtotal numeric(15, 2) := 0;
    v_discount numeric(15, 2);
    v_total numeric(15, 2);

    v_paid numeric(15, 2) := 0;
    v_change numeric(15, 2) := 0;

    v_item jsonb;
    v_payment jsonb;

    v_product_id uuid;
    v_quantity integer;
    v_unit_price numeric(15, 2);
    v_item_subtotal numeric(15, 2);

    v_product public.products;

    v_payment_method public.payment_method;
    v_payment_amount numeric(15, 2);

    v_non_cash_overpayment boolean := false;
BEGIN
    ----------------------------------------------------------------
    -- 1. Validate basic input
    ----------------------------------------------------------------

    IF p_cashier_id IS NULL THEN
        RAISE EXCEPTION 'Cashier is required';
    END IF;

    IF p_items IS NULL
       OR jsonb_typeof(p_items) <> 'array'
       OR jsonb_array_length(p_items) = 0
    THEN
        RAISE EXCEPTION 'Sale must contain at least one item';
    END IF;

    IF p_payments IS NULL
       OR jsonb_typeof(p_payments) <> 'array'
       OR jsonb_array_length(p_payments) = 0
    THEN
        RAISE EXCEPTION 'Sale must contain at least one payment';
    END IF;

    IF p_discount IS NULL OR p_discount < 0 THEN
        RAISE EXCEPTION 'Discount cannot be negative';
    END IF;

    v_discount := p_discount;


    ----------------------------------------------------------------
    -- 2. Validate cashier
    ----------------------------------------------------------------

    IF NOT EXISTS (
        SELECT 1
        FROM users
        WHERE id = p_cashier_id
    ) THEN
        RAISE EXCEPTION 'Cashier not found: %', p_cashier_id;
    END IF;


    ----------------------------------------------------------------
    -- 3. Aggregate duplicate products
    --
    -- Example:
    -- [
    --   {"product_id": "...", "quantity": 2},
    --   {"product_id": "...", "quantity": 3}
    -- ]
    --
    -- becomes quantity = 5
    ----------------------------------------------------------------

    FOR v_product_id, v_quantity IN
        SELECT
            (item->>'product_id')::uuid,
            SUM((item->>'quantity')::integer)::integer
        FROM jsonb_array_elements(p_items) AS item
        GROUP BY (item->>'product_id')::uuid
    LOOP

        IF v_quantity <= 0 THEN
            RAISE EXCEPTION
                'Quantity must be greater than zero for product %',
                v_product_id;
        END IF;


        ----------------------------------------------------------------
        -- 4. Lock product row
        --
        -- FOR UPDATE prevents concurrent sale from using
        -- the same stock simultaneously.
        ----------------------------------------------------------------

        SELECT *
        INTO v_product
        FROM products
        WHERE id = v_product_id
        FOR UPDATE;

        IF NOT FOUND THEN
            RAISE EXCEPTION
                'Product not found: %',
                v_product_id;
        END IF;

        IF NOT v_product.is_active THEN
            RAISE EXCEPTION
                'Product is inactive: %',
                v_product_id;
        END IF;

        IF v_product.stock < v_quantity THEN
            RAISE EXCEPTION
                'Insufficient stock for product %. Available: %, requested: %',
                v_product_id,
                v_product.stock,
                v_quantity;
        END IF;


        ----------------------------------------------------------------
        -- 5. Price comes from database
        ----------------------------------------------------------------

        v_unit_price := v_product.price;

        v_item_subtotal :=
            v_unit_price * v_quantity;

        v_subtotal :=
            v_subtotal + v_item_subtotal;

    END LOOP;


    ----------------------------------------------------------------
    -- 6. Calculate total
    ----------------------------------------------------------------

    v_total := v_subtotal - v_discount;

    IF v_total < 0 THEN
        RAISE EXCEPTION
            'Discount (%) cannot exceed subtotal (%)',
            v_discount,
            v_subtotal;
    END IF;


    ----------------------------------------------------------------
    -- 7. Validate payments
    ----------------------------------------------------------------

    FOR v_payment IN
        SELECT *
        FROM jsonb_array_elements(p_payments)
    LOOP

        v_payment_method :=
            (v_payment->>'method')::payment_method;

        v_payment_amount :=
            (v_payment->>'amount')::numeric;

        IF v_payment_amount IS NULL
           OR v_payment_amount <= 0
        THEN
            RAISE EXCEPTION
                'Payment amount must be greater than zero';
        END IF;

        v_paid :=
            v_paid + v_payment_amount;

        /*
         * Only cash is allowed to exceed total.
         * QRIS/card/transfer should be exact or underpaid.
         */
        IF v_payment_method <> 'cash'
           AND v_payment_amount > v_total
        THEN
            v_non_cash_overpayment := true;
        END IF;

    END LOOP;


    IF v_non_cash_overpayment THEN
        RAISE EXCEPTION
            'Non-cash payment cannot exceed sale total';
    END IF;


    IF v_paid < v_total THEN
        RAISE EXCEPTION
            'Insufficient payment. Required: %, paid: %',
            v_total,
            v_paid;
    END IF;


    /*
     * Change is calculated from total payment.
     *
     * Example:
     * total = 95,000
     * cash  = 100,000
     * change = 5,000
     */
    v_change := v_paid - v_total;


    ----------------------------------------------------------------
    -- 8. Generate invoice number
    ----------------------------------------------------------------

    v_invoice_number :=
        'INV' ||
        to_char(clock_timestamp(), 'YYMMDD') ||
        lpad(
            nextval('sales_invoice_seq')::text,
            6,
            '0'
        );


    ----------------------------------------------------------------
    -- 9. Insert sale
    ----------------------------------------------------------------

    INSERT INTO sales (
        invoice_number,
        cashier_id,
        customer_id,
        subtotal,
        discount,
        total,
        status
    )
    VALUES (
        v_invoice_number,
        p_cashier_id,
        p_customer_id,
        v_subtotal,
        v_discount,
        v_total,
        'completed'
    )
    RETURNING *
    INTO v_sale;


    ----------------------------------------------------------------
    -- 10. Insert sale items + decrease stock
    ----------------------------------------------------------------

    FOR v_product_id, v_quantity IN
        SELECT
            (item->>'product_id')::uuid,
            SUM((item->>'quantity')::integer)::integer
        FROM jsonb_array_elements(p_items) AS item
        GROUP BY (item->>'product_id')::uuid
    LOOP

        /*
         * Product was already locked above.
         * Read current price again.
         */
        SELECT *
        INTO v_product
        FROM products
        WHERE id = v_product_id
        FOR UPDATE;

        v_unit_price := v_product.price;

        v_item_subtotal :=
            v_unit_price * v_quantity;


        INSERT INTO sale_items (
            sale_id,
            product_id,
            quantity,
            unit_price,
            subtotal
        )
        VALUES (
            v_sale.id,
            v_product_id,
            v_quantity,
            v_unit_price,
            v_item_subtotal
        );


        /*
         * Decrease stock.
         *
         * The stock check here is intentional even though
         * we checked it earlier.
         *
         * This acts as the final invariant.
         */
        UPDATE products
        SET
            stock = stock - v_quantity,
            updated_at = now()
        WHERE id = v_product_id
          AND stock >= v_quantity;

        IF NOT FOUND THEN
            RAISE EXCEPTION
                'Insufficient stock for product %',
                v_product_id;
        END IF;


        ----------------------------------------------------------------
        -- Stock movement
        ----------------------------------------------------------------
        --
        -- Adjust this INSERT to your actual stock_movements schema.
        --
        ----------------------------------------------------------------

        INSERT INTO stock_movements (
            product_id,
            quantity,
            reference_id
        )
        VALUES (
            v_product_id,
            -v_quantity,
            v_sale.id
        );

    END LOOP;


    ----------------------------------------------------------------
    -- 11. Insert payments
    ----------------------------------------------------------------

    FOR v_payment IN
        SELECT *
        FROM jsonb_array_elements(p_payments)
    LOOP

        INSERT INTO payments (
            sale_id,
            method,
            amount
        )
        VALUES (
            v_sale.id,
            (v_payment->>'method')::payment_method,
            (v_payment->>'amount')::numeric
        );

    END LOOP;


    ----------------------------------------------------------------
    -- 12. Return created sale
    ----------------------------------------------------------------

    RETURN v_sale;

END;
$$;