# Product Requirements Document (PRD)
## InstaPOS API

| | |
|---|---|
| **Dokumen** | PRD - InstaPOS API |
| **Versi** | 1.0 |
| **Status** | Draft |
| **Tanggal** | 16 September 2026 |
| **Pemilik Produk** | *[isi nama PM/Product Owner]* |
| **Kontributor** | *[Engineering Lead, Tech Lead, QA Lead]* |

> **Catatan:** Beberapa asumsi ditandai dengan label **[ASUMSI]** karena detail spesifik bisnis (skala, vertikal industri, integrasi eksisting) belum diberikan. Sesuaikan sebelum dokumen ini difinalisasi.

---

## 1. Ringkasan Eksekutif

InstaPOS API adalah layanan backend berbasis REST/GraphQL yang menyediakan kemampuan inti Point of Sale (POS) — manajemen produk, transaksi penjualan, inventori, pembayaran, dan pelaporan — agar dapat dikonsumsi oleh berbagai jenis klien (aplikasi kasir mobile/tablet, dashboard admin web, integrasi pihak ketiga seperti e-commerce atau akuntansi). API ini dirancang agar bisnis retail dan F&B skala kecil-menengah dapat menjalankan operasional penjualan multi-outlet secara real-time, andal, dan aman.

---

## 2. Goals (Tujuan Produk)

### 2.1 Goals Bisnis
- Menyediakan fondasi API yang stabil sehingga InstaPOS dapat diadopsi oleh berbagai jenis merchant (retail, F&B, jasa) tanpa perlu membangun ulang backend per vertikal.
- Mempercepat time-to-market fitur baru dengan arsitektur API yang modular dan terdokumentasi baik.
- Membuka peluang monetisasi melalui model API-as-a-Service (partner integrasi, marketplace, akuntansi pihak ketiga).
- Mengurangi churn merchant dengan memastikan transaksi tidak pernah hilang/gagal tercatat (data integrity tinggi).

### 2.2 Goals Produk
- Transaksi penjualan dapat diproses dalam **< 500ms** (p95) pada kondisi jaringan normal.
- Mendukung operasional **offline-first** pada sisi klien dengan sinkronisasi otomatis saat online kembali.
- Menyediakan API yang **self-service** melalui dokumentasi (OpenAPI/Swagger) sehingga partner eksternal dapat berintegrasi tanpa dukungan manual ekstensif.
- Mencapai **99.9% uptime** untuk seluruh endpoint transaksi inti.

### 2.3 Goals Pengguna
- Kasir dapat menyelesaikan transaksi dengan cepat dan minim gangguan teknis.
- Pemilik bisnis mendapatkan visibilitas stok dan penjualan secara real-time lintas outlet.
- Developer/integrator pihak ketiga dapat mengintegrasikan InstaPOS dengan effort minimal.

---

## 3. Problem Statement (Pernyataan Masalah)

**Masalah utama:**
Pelaku usaha retail dan F&B skala kecil-menengah di Indonesia kesulitan mengelola operasional penjualan, stok, dan laporan keuangan secara terpusat ketika memiliki lebih dari satu titik penjualan (outlet/cabang) atau kanal (offline dan online). Sistem kasir konvensional umumnya:

1. **Terisolasi per perangkat** — data transaksi tidak tersinkronisasi otomatis antar outlet atau ke pusat.
2. **Rentan terhadap gangguan jaringan** — transaksi gagal tercatat ketika koneksi internet terputus.
3. **Sulit diintegrasikan** — tidak menyediakan API terbuka untuk terhubung dengan sistem akuntansi, e-commerce, atau CRM.
4. **Minim visibilitas real-time** — pemilik bisnis tidak dapat memantau penjualan/stok secara langsung dari mana pun.
5. **Skalabilitas terbatas** — sistem tidak dirancang untuk menangani pertumbuhan jumlah transaksi atau ekspansi outlet.

**Dampak jika masalah tidak diselesaikan:**
- Kehilangan pendapatan akibat stok tidak akurat (overselling/understock).
- Rekonsiliasi data manual yang memakan waktu dan rawan human error.
- Merchant beralih ke kompetitor yang menawarkan sistem lebih terintegrasi.

**Solusi yang diusulkan:**
InstaPOS API menyediakan lapisan backend terpusat, real-time, dan dapat diintegrasikan, yang menjadi single source of truth untuk seluruh data transaksi, inventori, dan pelanggan — dapat diakses oleh berbagai klien dan sistem pihak ketiga melalui API yang aman dan terdokumentasi.

---

## 4. Target Users (Target Pengguna)

### 4.1 Persona Utama

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Kasir (Cashier)** | Staf operasional yang menggunakan aplikasi kasir sehari-hari di outlet | Transaksi cepat, antarmuka sederhana, tetap bisa bekerja saat offline |
| **Pemilik/Manajer Bisnis (Owner/Admin)** | Pemilik UMKM atau manajer yang mengawasi 1-banyak outlet | Laporan real-time, manajemen produk & harga, kontrol akses staf |
| **Staf Gudang/Inventori** | Bertanggung jawab atas stok barang | Update stok akurat, notifikasi stok menipis, mutasi antar outlet |
| **Developer/Partner Integrator** | Tim internal atau pihak ketiga (mis. software akuntansi, e-commerce) yang mengonsumsi API | Dokumentasi jelas, autentikasi aman, response konsisten, webhook |
| **Support/Operasional Internal InstaPOS** | Tim internal yang menangani onboarding & troubleshooting merchant | Kemampuan audit log, akses monitoring, tools debugging |

### 4.2 Segmen Bisnis Target **[ASUMSI]**
- UMKM retail (toko kelontong, fashion, minimarket) dengan 1-20 outlet.
- Usaha F&B (kafe, restoran, kedai) dengan kebutuhan menu, meja, dan open bill.
- Skala transaksi: 50–5.000 transaksi/hari per merchant.

---

## 5. User Stories

Format: *Sebagai [peran], saya ingin [aksi], sehingga [manfaat].*

### 5.1 Autentikasi & Manajemen Akun
- **US-01**: Sebagai admin outlet, saya ingin membuat akun staf dengan peran (role) tertentu, sehingga akses ke fitur API dapat dibatasi sesuai tanggung jawab.
- **US-02**: Sebagai pengguna API, saya ingin login menggunakan API key/OAuth token, sehingga sistem saya dapat mengakses data secara aman.
- **US-03**: Sebagai admin, saya ingin dapat mencabut (revoke) akses token staf yang resign, sehingga keamanan data tetap terjaga.

### 5.2 Manajemen Produk & Kategori
- **US-04**: Sebagai admin, saya ingin menambah/mengubah/menghapus produk beserta harga dan varian, sehingga katalog selalu up-to-date.
- **US-05**: Sebagai admin, saya ingin mengelompokkan produk ke dalam kategori, sehingga pencarian produk di aplikasi kasir lebih cepat.
- **US-06**: Sebagai admin multi-outlet, saya ingin mengatur harga berbeda per outlet, sehingga strategi harga bisa disesuaikan lokasi.

### 5.3 Transaksi Penjualan
- **US-07**: Sebagai kasir, saya ingin membuat transaksi penjualan baru dengan banyak item, sehingga proses checkout pelanggan efisien.
- **US-08**: Sebagai kasir, saya ingin menerapkan diskon per item/transaksi, sehingga promosi dapat dijalankan dengan mudah.
- **US-09**: Sebagai kasir, saya ingin mencatat transaksi meskipun sedang offline, dan transaksi otomatis tersinkron saat online kembali, sehingga tidak ada penjualan yang hilang.
- **US-10**: Sebagai kasir, saya ingin membatalkan atau melakukan refund transaksi, sehingga kesalahan transaksi dapat dikoreksi.
- **US-11**: Sebagai kasir F&B, saya ingin membuka bill/tab untuk meja tertentu dan menambah item sebelum pembayaran final, sehingga alur dine-in dapat didukung.

### 5.4 Pembayaran
- **US-12**: Sebagai kasir, saya ingin memproses pembayaran tunai, kartu, atau QRIS/e-wallet melalui satu API, sehingga metode pembayaran fleksibel.
- **US-13**: Sebagai sistem, saya ingin menerima notifikasi/webhook status pembayaran dari payment gateway, sehingga status transaksi dapat diperbarui otomatis.
- **US-14**: Sebagai kasir, saya ingin mencetak/mengirim struk digital setelah pembayaran berhasil, sehingga pelanggan mendapat bukti transaksi.

### 5.5 Inventori
- **US-15**: Sebagai staf gudang, saya ingin stok otomatis berkurang setiap ada transaksi penjualan, sehingga data stok selalu akurat.
- **US-16**: Sebagai staf gudang, saya ingin melakukan penyesuaian stok manual (stock opname), sehingga selisih fisik dan sistem dapat dikoreksi.
- **US-17**: Sebagai admin, saya ingin menerima notifikasi ketika stok produk di bawah ambang batas, sehingga dapat melakukan restock tepat waktu.
- **US-18**: Sebagai admin multi-outlet, saya ingin melakukan mutasi stok antar outlet, sehingga distribusi barang lebih efisien.

### 5.6 Laporan & Analitik
- **US-19**: Sebagai pemilik bisnis, saya ingin melihat ringkasan penjualan harian/mingguan/bulanan lintas outlet, sehingga saya dapat memantau performa bisnis.
- **US-20**: Sebagai pemilik bisnis, saya ingin mengekspor data transaksi (CSV/Excel), sehingga dapat diproses lebih lanjut untuk pembukuan.
- **US-21**: Sebagai pemilik bisnis, saya ingin melihat produk terlaris dan performa kasir, sehingga dapat mengambil keputusan operasional.

### 5.7 Integrasi Pihak Ketiga
- **US-22**: Sebagai developer partner, saya ingin mengakses dokumentasi API (OpenAPI/Swagger) yang lengkap, sehingga saya dapat berintegrasi tanpa perlu dukungan langsung.
- **US-23**: Sebagai partner sistem akuntansi, saya ingin menerima webhook setiap transaksi selesai, sehingga data keuangan dapat disinkronkan otomatis.
- **US-24**: Sebagai developer, saya ingin mengakses sandbox/testing environment, sehingga integrasi dapat diuji sebelum production.

### 5.8 Pelanggan (Customer Management) **[ASUMSI]**
- **US-25**: Sebagai kasir, saya ingin mencatat data pelanggan (nama, kontak) pada transaksi, sehingga program loyalitas dapat dijalankan.
- **US-26**: Sebagai pemilik bisnis, saya ingin melihat riwayat pembelian pelanggan tertentu, sehingga dapat melakukan personalisasi promosi.

---

## 6. Functional Requirements (Kebutuhan Fungsional)

### 6.1 Autentikasi & Otorisasi
| ID | Requirement | Prioritas |
|---|---|---|
| FR-01 | Sistem harus mendukung autentikasi via OAuth 2.0 / API Key untuk akses machine-to-machine | Must |
| FR-02 | Sistem harus mendukung Role-Based Access Control (RBAC): Owner, Admin Outlet, Kasir, Staf Gudang, Partner Read-Only | Must |
| FR-03 | Token akses harus memiliki masa berlaku (expiry) dan mendukung refresh token | Must |
| FR-04 | Sistem harus mencatat audit log untuk setiap aksi sensitif (login, perubahan harga, void transaksi) | Must |
| FR-05 | Sistem harus mendukung multi-tenant, memastikan isolasi data antar merchant | Must |

### 6.2 Manajemen Produk
| ID | Requirement | Prioritas |
|---|---|---|
| FR-06 | API harus menyediakan CRUD untuk produk, kategori, dan varian (ukuran, warna, dsb.) | Must |
| FR-07 | API harus mendukung pengaturan harga berbeda per outlet | Should |
| FR-08 | API harus mendukung import/export katalog produk secara bulk (CSV) | Should |
| FR-09 | API harus mendukung pencarian & filter produk (nama, SKU, barcode, kategori) | Must |

### 6.3 Transaksi
| ID | Requirement | Prioritas |
|---|---|---|
| FR-10 | API harus dapat membuat transaksi dengan multiple line items, diskon, dan pajak | Must |
| FR-11 | API harus mendukung idempotency key pada endpoint transaksi untuk mencegah duplikasi akibat retry | Must |
| FR-12 | API harus mendukung status transaksi: draft, open (bill terbuka), paid, void, refunded | Must |
| FR-13 | API harus mendukung mekanisme sinkronisasi transaksi offline (queue & conflict resolution) | Must |
| FR-14 | API harus menghitung otomatis subtotal, pajak (PPN), service charge, dan total akhir | Must |
| FR-15 | API harus mendukung split payment (lebih dari satu metode pembayaran dalam satu transaksi) | Should |

### 6.4 Pembayaran
| ID | Requirement | Prioritas |
|---|---|---|
| FR-16 | API harus terintegrasi dengan payment gateway (mis. Midtrans/Xendit) untuk QRIS, kartu, e-wallet | Must |
| FR-17 | API harus menyediakan endpoint webhook untuk menerima callback status pembayaran | Must |
| FR-18 | API harus mendukung pencatatan pembayaran tunai secara manual | Must |
| FR-19 | Sistem harus melakukan rekonsiliasi otomatis antara status pembayaran gateway dan status transaksi internal | Should |

### 6.5 Inventori
| ID | Requirement | Prioritas |
|---|---|---|
| FR-20 | Stok harus otomatis terupdate real-time saat transaksi berhasil/void/refund | Must |
| FR-21 | API harus mendukung stock opname (penyesuaian manual dengan alasan) | Must |
| FR-22 | API harus mendukung mutasi stok antar outlet/gudang | Should |
| FR-23 | Sistem harus mengirim notifikasi/event saat stok mencapai ambang batas minimum | Should |
| FR-24 | API harus mendukung manajemen multi-satuan (unit conversion, mis. dus ke pcs) | Could |

### 6.6 Laporan
| ID | Requirement | Prioritas |
|---|---|---|
| FR-25 | API harus menyediakan endpoint ringkasan penjualan (per hari/minggu/bulan/outlet) | Must |
| FR-26 | API harus menyediakan endpoint laporan produk terlaris & performa kasir | Should |
| FR-27 | API harus mendukung ekspor laporan dalam format CSV/Excel | Should |
| FR-28 | API harus menyediakan dashboard data agregat via endpoint analitik | Could |

### 6.7 Integrasi & Developer Experience
| ID | Requirement | Prioritas |
|---|---|---|
| FR-29 | Sistem harus menyediakan dokumentasi API sesuai spesifikasi OpenAPI 3.0 | Must |
| FR-30 | Sistem harus menyediakan sandbox environment terpisah dari production | Should |
| FR-31 | Sistem harus mendukung webhook events (transaksi baru, stok rendah, refund) dengan mekanisme retry | Should |
| FR-32 | API harus menerapkan versioning (mis. `/v1/`, `/v2/`) untuk menjaga backward compatibility | Must |

### 6.8 Manajemen Pelanggan **[ASUMSI]**
| ID | Requirement | Prioritas |
|---|---|---|
| FR-33 | API harus mendukung CRUD data pelanggan dan riwayat transaksinya | Could |
| FR-34 | API harus mendukung program poin loyalitas dasar | Could |

> Prioritas menggunakan skema MoSCoW: **Must** (wajib untuk MVP), **Should** (penting namun bisa menyusul), **Could** (nice-to-have).

---

## 7. Non-Functional Requirements (Kebutuhan Non-Fungsional)

### 7.1 Performa
- Response time API untuk endpoint transaksi inti: **p95 < 500ms**, **p99 < 1000ms**.
- Sistem harus mampu menangani minimal **1.000 transaksi per menit** pada peak load **[ASUMSI, sesuaikan skala bisnis]**.
- Endpoint laporan agregat berat harus menggunakan caching/pre-aggregation agar tidak membebani database transaksional.

### 7.2 Skalabilitas
- Arsitektur harus mendukung horizontal scaling (stateless API service).
- Database harus dirancang mendukung sharding/partitioning berdasarkan `merchant_id` untuk multi-tenant.
- Sistem harus mampu menambah outlet/merchant baru tanpa downtime.

### 7.3 Keandalan & Ketersediaan
- Target **uptime 99.9%** (SLA) untuk endpoint transaksi dan pembayaran.
- Mekanisme retry & idempotency wajib pada seluruh endpoint write-critical (transaksi, pembayaran).
- Disaster recovery: RPO (Recovery Point Objective) ≤ 15 menit, RTO (Recovery Time Objective) ≤ 1 jam.
- Backup database otomatis harian dengan retensi minimal 30 hari.

### 7.4 Keamanan
- Seluruh komunikasi harus menggunakan **TLS 1.2+**.
- Data sensitif (kredensial, token, data pembayaran) harus dienkripsi at-rest (AES-256).
- Sistem harus patuh terhadap **PCI-DSS** untuk data terkait kartu pembayaran (jika menyimpan data kartu).
- Sistem harus patuh terhadap **UU PDP (Perlindungan Data Pribadi) Indonesia** terkait data pelanggan.
- Rate limiting wajib diterapkan per API key untuk mencegah abuse (mis. 100 req/menit per klien, dapat dikonfigurasi).
- Wajib menerapkan input validation & sanitization untuk mencegah injection attack.

### 7.5 Observability & Maintainability
- Sistem harus menyediakan logging terstruktur (structured logs) dan tracing terdistribusi (mis. OpenTelemetry).
- Sistem harus memiliki monitoring & alerting (mis. Prometheus/Grafana atau setara) untuk metrik latency, error rate, dan throughput.
- Kode dan API harus mengikuti standar dokumentasi (OpenAPI) yang selalu sinkron dengan implementasi.

### 7.6 Kompatibilitas & Interoperabilitas
- API harus mendukung format data **JSON** sebagai default, dengan opsi kompatibilitas untuk kebutuhan tertentu.
- API harus backward-compatible antar versi minor; breaking changes hanya melalui versi major baru.
- Harus kompatibel dengan integrasi payment gateway populer di Indonesia (Midtrans, Xendit, atau setara) **[ASUMSI]**.

### 7.7 Usability (Developer Experience)
- Dokumentasi API harus mencakup contoh request/response untuk setiap endpoint.
- Pesan error harus konsisten dan informatif (kode error, deskripsi, saran perbaikan).
- Sistem harus menyediakan Postman collection atau SDK dasar untuk mempercepat integrasi **[ASUMSI/Nice-to-have]**.

### 7.8 Auditability & Kepatuhan
- Semua transaksi finansial harus immutable (tidak dapat dihapus, hanya bisa void/refund dengan jejak audit).
- Sistem harus menyimpan histori perubahan harga, stok, dan struktur akun untuk keperluan audit.

---

## 8. Scope (Ruang Lingkup)

### 8.1 In-Scope (MVP — Fase 1)
- Autentikasi & RBAC dasar (Owner, Admin, Kasir).
- Manajemen produk, kategori, dan harga per outlet.
- Transaksi penjualan (create, void, refund) dengan dukungan offline-sync dasar.
- Pembayaran tunai dan integrasi minimal satu payment gateway (QRIS).
- Manajemen stok otomatis + stock opname manual.
- Laporan penjualan dasar (harian/mingguan/bulanan).
- Dokumentasi API (OpenAPI) dan sandbox environment.
- Webhook dasar untuk event transaksi selesai.

### 8.2 Out-of-Scope (Fase 1) — Dipertimbangkan untuk Fase Berikutnya
- Program loyalitas pelanggan & poin reward lanjutan.
- Manajemen multi-currency / ekspansi internasional.
- Integrasi marketplace (Tokopedia, Shopee, dsb.) secara native.
- Fitur akuntansi lengkap (buku besar, neraca) — hanya menyediakan data mentah via API/export.
- AI-based demand forecasting atau rekomendasi produk.
- Aplikasi client (mobile/web) itu sendiri — PRD ini fokus pada **API/backend**, bukan UI klien.
- Dukungan hardware kasir spesifik (printer thermal, cash drawer) — hanya menyediakan spesifikasi data yang dibutuhkan klien untuk itu.

### 8.3 Asumsi & Batasan
- **[ASUMSI]** Target awal adalah merchant di Indonesia sehingga kepatuhan regulasi mengikuti hukum Indonesia (UU PDP, ketentuan pajak PPN).
- **[ASUMSI]** Payment gateway pihak ketiga akan digunakan (bukan membangun payment processor sendiri).
- Ketersediaan tim engineering, budget, dan timeline belum ditentukan dalam dokumen ini — perlu dilengkapi oleh Product/Engineering Lead.
- Dokumen ini adalah PRD tingkat produk; spesifikasi teknis detail (skema database, kontrak API per endpoint) akan dituangkan dalam dokumen teknis terpisah (Technical Design Document / API Spec).

---

## 9. Metrik Keberhasilan (Success Metrics)

| Metrik | Target |
|---|---|
| Uptime API transaksi | ≥ 99.9% |
| Latency transaksi (p95) | < 500ms |
| Tingkat kegagalan sinkronisasi offline | < 0.1% dari total transaksi |
| Waktu integrasi rata-rata partner baru | < 5 hari kerja |
| Jumlah merchant aktif menggunakan API dalam 3 bulan pertama | *[isi target sesuai bisnis]* |
| Skor kepuasan developer (dari survei/NPS API) | ≥ 8/10 |

---

## 10. Open Questions

1. Apakah InstaPOS akan menyediakan aplikasi klien resmi (mobile/web), atau murni API untuk pihak ketiga?
2. Payment gateway mana yang menjadi prioritas integrasi pertama?
3. Apakah dibutuhkan dukungan multi-bahasa/multi-mata uang di fase awal?
4. Bagaimana model pricing API untuk partner eksternal (per transaksi, subscription, atau flat fee)?
5. Apakah ada kebutuhan kepatuhan spesifik industri (mis. F&B dengan cukai/pajak restoran daerah)?

---

*Dokumen ini adalah living document dan akan diperbarui seiring validasi kebutuhan lebih lanjut dengan stakeholder bisnis dan tim engineering.*
