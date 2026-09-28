import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const saleSeeds = [
  {
    productCount: 5,
    paymentMethod: "cash" as const,
  },
  {
    productCount: 10,
    paymentMethod: "qris" as const,
  },
  {
    productCount: 15,
    paymentMethod: "transfer" as const,
  },
  {
    productCount: 20,
    paymentMethod: "cash" as const,
  },
  {
    productCount: 25,
    paymentMethod: "qris" as const,
  },
];

export async function seedSales(): Promise<void> {
  console.log("Seeding sales...");

  // ---------------------------------------------------------------------------
  // Cashier
  // ---------------------------------------------------------------------------

  const { data: cashier, error: cashierError } = await supabase
    .from("users")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (cashierError) {
    throw new Error(`Failed to get cashier: ${cashierError.message}`);
  }

  if (!cashier) {
    throw new Error("Cannot seed sales: no cashier found in public.users");
  }

  // ---------------------------------------------------------------------------
  // Customer
  // ---------------------------------------------------------------------------

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (customerError) {
    throw new Error(`Failed to get customer: ${customerError.message}`);
  }

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------

  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name, price, stock")
    .eq("is_active", true)
    .gt("price", 0)
    .gt("stock", 0)
    .order("created_at", { ascending: true });

  if (productError) {
    throw new Error(`Failed to get sale products: ${productError.message}`);
  }

  if (!products || products.length === 0) {
    console.log("No active products with price > 0 and stock > 0 found.");

    return;
  }

  console.log(`Found ${products.length} product(s) available for sales.`);

  for (const product of products) {
    console.log(
      `- ${product.name} | price=${product.price} | stock=${product.stock}`,
    );
  }

  // ---------------------------------------------------------------------------
  // Sales
  // ---------------------------------------------------------------------------

  for (let saleIndex = 0; saleIndex < saleSeeds.length; saleIndex++) {
    const saleSeed = saleSeeds[saleIndex];

    if (!saleSeed) {
      throw new Error(
        `Sale seed configuration not found at index ${saleIndex}`,
      );
    }

    const invoiceNumber = `SEED-INV-${String(saleIndex + 1).padStart(6, "0")}`;

    // -------------------------------------------------------------------------
    // Prevent duplicate invoice
    // -------------------------------------------------------------------------

    const { data: existingSale, error: existingSaleError } = await supabase
      .from("sales")
      .select("id")
      .eq("invoice_number", invoiceNumber)
      .maybeSingle();

    if (existingSaleError) {
      throw new Error(
        `Failed to check existing sale ${invoiceNumber}: ` +
          existingSaleError.message,
      );
    }

    if (existingSale) {
      console.log(`- ${invoiceNumber} already exists, skipping`);

      continue;
    }

    // -------------------------------------------------------------------------
    // Select available products
    // -------------------------------------------------------------------------

    const availableProducts = products.filter(
      (product) => product.stock > 0 && product.price > 0,
    );

    if (availableProducts.length < 2) {
      console.log(
        `- ${invoiceNumber} skipped: ` +
          `only ${availableProducts.length} product(s) available.`,
      );

      continue;
    }

    const productCount = Math.min(
      saleSeed.productCount,
      availableProducts.length,
    );

    if (productCount < 2) {
      console.log(`- ${invoiceNumber} skipped: not enough products.`);

      continue;
    }

    const selectedProducts = availableProducts.slice(0, productCount);

    // -------------------------------------------------------------------------
    // Create sale items
    // -------------------------------------------------------------------------

    const saleItems = selectedProducts.map((product) => ({
      product_id: product.id,
      quantity: 1,
      unit_price: product.price,
      subtotal: product.price,
    }));

    const subtotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0);

    const discount = 0;
    const total = subtotal - discount;

    if (total <= 0) {
      throw new Error(`Invalid total for ${invoiceNumber}: ${total}`);
    }

    // -------------------------------------------------------------------------
    // Sale
    // -------------------------------------------------------------------------

    const { data: sale, error: saleError } = await supabase
      .from("sales")
      .insert({
        invoice_number: invoiceNumber,
        cashier_id: cashier.id,
        customer_id: customer?.id ?? null,
        subtotal,
        discount,
        total,
        status: "completed",
      })
      .select("*")
      .single();

    if (saleError) {
      throw new Error(
        `Failed to create sale ${invoiceNumber}: ${saleError.message}`,
      );
    }

    // -------------------------------------------------------------------------
    // Sale items
    // -------------------------------------------------------------------------

    const { error: itemError } = await supabase.from("sale_items").insert(
      saleItems.map((item) => ({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal,
      })),
    );

    if (itemError) {
      throw new Error(
        `Failed to create sale items ${invoiceNumber}: ` + itemError.message,
      );
    }

    // -------------------------------------------------------------------------
    // Payment
    // -------------------------------------------------------------------------

    const { error: paymentError } = await supabase.from("payments").insert({
      sale_id: sale.id,
      method: saleSeed.paymentMethod,
      amount: total,
    });

    if (paymentError) {
      throw new Error(
        `Failed to create payment ${invoiceNumber}: ` + paymentError.message,
      );
    }

    // -------------------------------------------------------------------------
    // Update stock
    // -------------------------------------------------------------------------

    for (const product of selectedProducts) {
      const newStock = product.stock - 1;

      const { error: stockError } = await supabase
        .from("products")
        .update({
          stock: newStock,
        })
        .eq("id", product.id);

      if (stockError) {
        throw new Error(
          `Failed to update stock for ${product.name}: ` + stockError.message,
        );
      }

      // Keep local stock state synchronized
      product.stock = newStock;
    }

    // -------------------------------------------------------------------------
    // Log
    // -------------------------------------------------------------------------

    console.log(
      `✓ ${invoiceNumber} | ` +
        `products=${selectedProducts.length} | ` +
        `subtotal=${subtotal} | ` +
        `total=${total}`,
    );

    for (const item of saleItems) {
      const product = selectedProducts.find(
        (product) => product.id === item.product_id,
      );

      console.log(
        `  - ${product?.name} | ` +
          `qty=${item.quantity} | ` +
          `price=${item.unit_price}`,
      );
    }
  }

  console.log("Sales seeded successfully.");
}
