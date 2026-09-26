import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { categories } from "./data";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const seedItems = [
  [
    { quantity: 10, unit_price: 5_000 },
    { quantity: 20, unit_price: 7_500 },
    { quantity: 30, unit_price: 10_000 },
  ],
  [
    { quantity: 10, unit_price: 8_000 },
    { quantity: 20, unit_price: 12_000 },
    { quantity: 30, unit_price: 15_000 },
  ],
  [
    { quantity: 10, unit_price: 11_000 },
    { quantity: 20, unit_price: 14_000 },
    { quantity: 30, unit_price: 18_000 },
  ],
  [
    { quantity: 10, unit_price: 6_000 },
    { quantity: 20, unit_price: 9_000 },
    { quantity: 30, unit_price: 13_000 },
  ],
  [
    { quantity: 10, unit_price: 7_000 },
    { quantity: 20, unit_price: 16_000 },
    { quantity: 30, unit_price: 20_000 },
  ],
];

export async function seedPurchaseOrderItems() {
  // =========================================================
  // GET PURCHASE ORDERS
  // =========================================================

  const { data: purchaseOrders, error: purchaseOrderError } = await supabase
    .from("purchase_orders")
    .select("id")
    .order("created_at", { ascending: true });

  if (purchaseOrderError) {
    throw purchaseOrderError;
  }

  if (!purchaseOrders?.length) {
    throw new Error("No purchase orders found.");
  }

  // =========================================================
  // GET PRODUCTS
  // =========================================================

  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (productError) {
    throw productError;
  }

  if (!products?.length) {
    throw new Error("No products found.");
  }

  // =========================================================
  // VALIDATE PRODUCTS AGAINST SEED DATA
  // =========================================================

  const productNames = new Set(
    Object.values(categories)
      .flat()
      .map(([name]) => name?.toString().toLowerCase()),
  );

  for (const product of products) {
    if (!productNames.has(product.name)) {
      throw new Error(`Product "${product.name}" is not defined in seed data.`);
    }
  }

  // =========================================================
  // CREATE PURCHASE ORDER ITEMS
  // =========================================================

  const items = purchaseOrders.flatMap((purchaseOrder, poIndex) => {
    const selectedProducts = [0, 1, 2].map(
      (offset) => products[(poIndex * 3 + offset) % products.length],
    );

    const prices = seedItems[poIndex % seedItems.length];

    if (!prices) {
      throw new Error(`Seed prices not found for PO index ${poIndex}`);
    }

    return selectedProducts.map((product, index) => {
      if (!product) {
        throw new Error(
          `Product not found for purchase order ${purchaseOrder.id}.`,
        );
      }

      const itemPrice = prices[index];

      if (!itemPrice)
        throw new Error(
          `Price configuration not found for item index ${index}.`,
        );

      return {
        purchase_order_id: purchaseOrder.id,
        product_id: product.id,
        quantity: itemPrice.quantity,
        unit_price: itemPrice.unit_price,
      };
    });
  });

  // =========================================================
  // INSERT ITEMS
  // =========================================================

  const { error: insertError } = await supabase
    .from("purchase_order_items")
    .insert(items);

  if (insertError) {
    throw insertError;
  }

  // =========================================================
  // UPDATE PURCHASE ORDER TOTAL
  // =========================================================

  for (const purchaseOrder of purchaseOrders) {
    const purchaseOrderItems = items.filter(
      (item) => item.purchase_order_id === purchaseOrder.id,
    );

    const total = purchaseOrderItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0,
    );
    const { error: updateError } = await supabase
      .from("purchase_orders")
      .update({ total })
      .eq("id", purchaseOrder.id);

    if (updateError) {
      throw updateError;
    }
  }

  console.log(`Seeded ${items.length} purchase order items.`);
}
