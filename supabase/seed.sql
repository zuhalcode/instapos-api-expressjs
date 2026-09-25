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
        'PT Sumber Makmur',
        '081234567890',
        'Jl. Raya Darmo No. 15, Surabaya'
    ),
    (
        'SUP002',
        'CV Berkah Jaya',
        '081298765432',
        'Jl. Ahmad Yani No. 88, Surabaya'
    ),
    (
        'SUP003',
        'PT Mitra Niaga Indonesia',
        '082112345678',
        'Jl. Rungkut Industri No. 21, Surabaya'
    ),
    (
        'SUP004',
        'CV Sentosa Abadi',
        '082198765432',
        'Jl. Kedungdoro No. 45, Surabaya'
    ),
    (
        'SUP005',
        'PT Sinar Terang Distribusi',
        '083812345678',
        'Jl. Margomulyo No. 30, Surabaya'
    );

-- ============================================
-- SEED: CUSTOMERS
-- ============================================
INSERT INTO
    public.customers (code_member, name, phone_number, point)
VALUES
    ('MEM001', 'Budi Santoso', '081234567801', 120),
    ('MEM002', 'Siti Aminah', '081234567802', 75),
    ('MEM003', 'Andi Pratama', '081234567803', 250),
    ('MEM004', 'Dewi Lestari', '081234567804', 50),
    ('MEM005', 'Rizky Maulana', '081234567805', 180);