import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { categories } from "./data";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function seedProducts() {
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
