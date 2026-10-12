CREATE OR REPLACE FUNCTION public.get_sales_report(
    p_from timestamptz,
    p_to timestamptz,
    p_cashier_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
    WITH
    filtered_sales AS (
        SELECT
            s.id,
            s.subtotal,
            s.discount,
            s.total,
            s.cashier_id,
            s.invoice_number,
            s.created_at
        FROM public.sales s
        WHERE s.status = 'completed'
          AND s.created_at >= p_from
          AND s.created_at < p_to
          AND (p_cashier_id IS NULL OR s.cashier_id = p_cashier_id)
    ),

    summary AS (
        SELECT
            COALESCE(SUM(fs.subtotal), 0) AS gross_sales,
            COALESCE(SUM(fs.discount), 0) AS total_discounts,
            COALESCE(SUM(fs.total), 0) AS net_sales,
            COUNT(fs.id) AS transaction_count,
            COALESCE(AVG(fs.total), 0) AS average_transaction_value
        FROM filtered_sales fs
    ),

    items_summary AS (
        SELECT
            COALESCE(SUM(si.quantity), 0) AS items_sold
        FROM public.sale_items si
        INNER JOIN filtered_sales fs
            ON fs.id = si.sale_id
    ),

    payment_totals AS (
        SELECT
            COALESCE(SUM(p.amount), 0) AS total_payment
        FROM public.payments p
        INNER JOIN filtered_sales fs
            ON fs.id = p.sale_id
    ),

    payment_methods AS (
        SELECT
            p.method,
            COUNT(*) AS transactions,
            COALESCE(SUM(p.amount), 0) AS amount
        FROM public.payments p
        INNER JOIN filtered_sales fs
            ON fs.id = p.sale_id
        GROUP BY p.method
        ORDER BY amount DESC
    ),

    cashier_stats AS (
        SELECT
            u.id AS cashier_id,
            u.name AS cashier_name,
            COUNT(fs.id) AS transactions,
            COALESCE(SUM(fs.total), 0) AS net_sales
        FROM filtered_sales fs
        INNER JOIN public.users u
            ON u.id = fs.cashier_id
        GROUP BY u.id, u.name
        ORDER BY net_sales DESC
    ),

    sales_trend AS (
        SELECT
            (fs.created_at AT TIME ZONE 'Asia/Jakarta')::date AS date,
            COUNT(*) AS transactions,
            COALESCE(SUM(fs.subtotal), 0) AS gross_sales,
            COALESCE(SUM(fs.total), 0) AS net_sales
        FROM filtered_sales fs
        GROUP BY (fs.created_at AT TIME ZONE 'Asia/Jakarta')::date
        ORDER BY date ASC
    )

    SELECT jsonb_build_object(
        'period',
        jsonb_build_object(
            'from', p_from,
            'to', p_to
        ),

        'summary',
        (
            SELECT jsonb_build_object(
                'gross_sales', gross_sales,
                'total_discounts', total_discounts,
                'net_sales', net_sales,
                'transaction_count', transaction_count,
                'average_transaction_value', average_transaction_value,
                'items_sold', (SELECT items_sold FROM items_summary)
            )
            FROM summary
        ),

        'payment_breakdown',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'method', pm.method,
                        'transactions', pm.transactions,
                        'amount', pm.amount,
                        'percentage',
                        CASE
                            WHEN pt.total_payment = 0 THEN 0
                            ELSE ROUND((pm.amount / pt.total_payment) * 100, 2)
                        END
                    )
                    ORDER BY pm.amount DESC
                )
                FROM payment_methods pm
                CROSS JOIN payment_totals pt
            ),
            '[]'::jsonb
        ),

        'cashiers',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'cashier_id', cs.cashier_id,
                        'cashier_name', cs.cashier_name,
                        'transactions', cs.transactions,
                        'net_sales', cs.net_sales
                    )
                    ORDER BY cs.net_sales DESC
                )
                FROM cashier_stats cs
            ),
            '[]'::jsonb
        ),

        'daily_trend',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'date', st.date,
                        'transactions', st.transactions,
                        'gross_sales', st.gross_sales,
                        'net_sales', st.net_sales
                    )
                    ORDER BY st.date ASC
                )
                FROM sales_trend st
            ),
            '[]'::jsonb
        )
    );
$$;
