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
    public.suppliers (code, name, phone_number, address)
VALUES
    (
        'SUP001',
        'pt sumber makmur',
        '081234567890',
        'jl. raya darmo no. 15, surabaya'
    ),
    (
        'SUP002',
        'cv berkah jaya',
        '081298765432',
        'jl. ahmad yani no. 88, surabaya'
    ),
    (
        'SUP003',
        'pt mitra niaga indonesia',
        '082112345678',
        'jl. rungkut industri no. 21, surabaya'
    ),
    (
        'SUP004',
        'cv sentosa abadi',
        '082198765432',
        'jl. kedungdoro no. 45, surabaya'
    ),
    (
        'SUP005',
        'pt sinar terang distribusi',
        '083812345678',
        'jl. margomulyo no. 30, surabaya'
    );

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