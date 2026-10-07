CREATE OR REPLACE FUNCTION public.get_dashboard_stats(
    p_from timestamptz,
    p_to timestamptz
)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
    WITH
    filtered_sales AS (
        SELECT
            s.id,
            s.total,
            s.cashier_id,
            s.invoice_number,
            s.created_at
        FROM public.sales s
        WHERE s.status = 'completed'
          AND s.created_at >= p_from
          AND s.created_at < p_to
    ),

    summary AS (
        SELECT
            COALESCE(SUM(fs.total), 0) AS revenue,
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
            COALESCE(SUM(p.amount), 0) AS revenue
        FROM public.payments p
        INNER JOIN filtered_sales fs
            ON fs.id = p.sale_id
        GROUP BY p.method
        ORDER BY revenue DESC
    ),

    top_products AS (
        SELECT
            p.id AS product_id,
            p.name AS product_name,
            SUM(si.quantity) AS quantity,
            COALESCE(SUM(si.subtotal), 0) AS revenue
        FROM public.sale_items si
        INNER JOIN filtered_sales fs
            ON fs.id = si.sale_id
        INNER JOIN public.products p
            ON p.id = si.product_id
        GROUP BY
            p.id,
            p.name
        ORDER BY quantity DESC
        LIMIT 5
    ),

    sales_trend AS (
        SELECT
            (fs.created_at AT TIME ZONE 'Asia/Jakarta')::date AS date,
            COUNT(*) AS transactions,
            COALESCE(SUM(fs.total), 0) AS revenue
        FROM filtered_sales fs
        GROUP BY
            (fs.created_at AT TIME ZONE 'Asia/Jakarta')::date
        ORDER BY date ASC
    ),

    recent_sales AS (
        SELECT
            fs.id,
            fs.invoice_number,
            u.name AS cashier_name,
            fs.total,
            fs.created_at,
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'method', p.method,
                            'amount', p.amount
                        )
                        ORDER BY p.created_at ASC
                    )
                    FROM public.payments p
                    WHERE p.sale_id = fs.id
                ),
                '[]'::jsonb
            ) AS payments
        FROM filtered_sales fs
        INNER JOIN public.users u
            ON u.id = fs.cashier_id
        ORDER BY fs.created_at DESC
        LIMIT 5
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
                'revenue', revenue,
                'transaction_count', transaction_count,
                'average_transaction_value', average_transaction_value,
                'items_sold',
                (
                    SELECT items_sold
                    FROM items_summary
                )
            )
            FROM summary
        ),

        'payment_methods',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'method', pm.method,
                        'transactions', pm.transactions,
                        'revenue', pm.revenue,
                        'percentage',
                        CASE
                            WHEN pt.total_payment = 0 THEN 0
                            ELSE ROUND(
                                (pm.revenue / pt.total_payment) * 100,
                                2
                            )
                        END
                    )
                    ORDER BY pm.revenue DESC
                )
                FROM payment_methods pm
                CROSS JOIN payment_totals pt
            ),
            '[]'::jsonb
        ),

        'top_products',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'product_id', tp.product_id,
                        'product_name', tp.product_name,
                        'quantity', tp.quantity,
                        'revenue', tp.revenue
                    )
                    ORDER BY tp.quantity DESC
                )
                FROM top_products tp
            ),
            '[]'::jsonb
        ),

        'sales_trend',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'date', st.date,
                        'transactions', st.transactions,
                        'revenue', st.revenue
                    )
                    ORDER BY st.date ASC
                )
                FROM sales_trend st
            ),
            '[]'::jsonb
        ),

        'recent_sales',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', rs.id,
                        'invoice_number', rs.invoice_number,
                        'cashier_name', rs.cashier_name,
                        'total', rs.total,
                        'payments', rs.payments,
                        'created_at', rs.created_at
                    )
                    ORDER BY rs.created_at DESC
                )
                FROM recent_sales rs
            ),
            '[]'::jsonb
        )
    );
$$;