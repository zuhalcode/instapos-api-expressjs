-- Categories
INSERT INTO
    public.categories (name)
VALUES
    ('makanan'),
    ('minuman'),
    ('elektronik'),
    ('skincare'),
    ('makanan-ringan') ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SEED: SUPPLIERS
-- ============================================
INSERT INTO
    public.suppliers (name, phone_number, address)
VALUES
    (
        'pt sumber makmur',
        '081234567890',
        'jl. raya darmo no. 15, surabaya'
    ),
    (
        'cv berkah jaya',
        '081298765432',
        'jl. ahmad yani no. 88, surabaya'
    ),
    (
        'pt mitra niaga indonesia',
        '082112345678',
        'jl. rungkut industri no. 21, surabaya'
    ),
    (
        'cv sentosa abadi',
        '082198765432',
        'jl. kedungdoro no. 45, surabaya'
    ),
    (
        'pt sinar terang distribusi',
        '083812345678',
        'jl. margomulyo no. 30, surabaya'
    );

-- ============================================
-- SEED: PURCHASE ORDERS
-- ============================================
INSERT INTO public.purchase_orders (
    supplier_id
)
SELECT
    s.id
FROM public.suppliers AS s
ORDER BY s.created_at;

-- ============================================
-- SEED: CUSTOMERS
-- ============================================
INSERT INTO
    public.customers (code_member, name, phone_number, point)
VALUES
    ('MEM001', 'budi santoso', '081234567801', 120),
    ('MEM002', 'siti aminah', '081234567802', 75),
    ('MEM003', 'andi pratama', '081234567803', 250),
    ('MEM004', 'dewi lestari', '081234567804', 50),
    ('MEM005', 'rizky maulana', '081234567805', 180);