import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { categories } from "./data";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function seedProducts(): Promise<void> {
  for (const [categoryName, products] of Object.entries(categories)) {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .upsert({ name: categoryName }, { onConflict: "name" })
      .select("id")
      .single();

    if (categoryError) {
      throw categoryError;
    }

    const productRows = products.map(([name, price]) => ({
      category_id: category.id,
      name: name?.toString().toLowerCase(),
      price,
    }));

    const { error: productError } = await supabase
      .from("products")
      .insert(productRows);

    if (productError) {
      throw productError;
    }

    console.log(`Seeded category: ${categoryName}`);
  }

  console.log("Products seeded successfully.");
}

export async function updateProductPrices(): Promise<void> {
  console.log("Updating product prices...");

  const { data: products, error: fetchError } = await supabase
    .from("products")
    .select("id, name, purchase_price")
    .gt("purchase_price", 0);

  if (fetchError) {
    throw new Error(
      `Failed to get products with purchase price: ${fetchError.message}`,
    );
  }

  if (!products || products.length === 0) {
    console.log("No products with purchase price found.");
    return;
  }

  for (const product of products) {
    const price = Math.round(product.purchase_price * 1.1 * 100) / 100;

    const { error: updateError } = await supabase
      .from("products")
      .update({ price })
      .eq("id", product.id);

    if (updateError) {
      throw new Error(
        `Failed to update price for product ${product.id}: ${updateError.message}`,
      );
    }

    console.log(
      `✓ ${product.name} | ` +
        `purchase_price=${product.purchase_price} | ` +
        `price=${price}`,
    );
  }

  console.log(`${products.length} product price(s) updated.`);
}
