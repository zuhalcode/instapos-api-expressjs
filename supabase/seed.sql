-- Categories
INSERT INTO
    public.categories (name)
VALUES
    ('makanan'),
    ('minuman'),
    ('elektronik'),
    ('skincare'),
    ('makanan-ringan') ON CONFLICT (name) DO NOTHING;