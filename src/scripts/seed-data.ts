import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const categories = {
  makanan: [
    ["Indomie Goreng", 3500],
    ["Indomie Ayam Bawang", 3500],
    ["Mie Sedaap Goreng", 3500],
    ["Pop Mie Ayam", 5000],
    ["Nasi Goreng Instan", 8500],
  ],
  minuman: [
    ["Aqua 600ml", 4000],
    ["Teh Botol Sosro 450ml", 5000],
    ["Coca-Cola 390ml", 6000],
    ["Sprite 390ml", 6000],
    ["Ultra Milk 250ml", 6000],
  ],
  elektronik: [
    ["Kabel Data USB Type-C", 25000],
    ["Charger USB 20W", 75000],
    ["Mouse Wireless", 85000],
    ["Keyboard USB", 100000],
    ["Earphone Wired", 45000],
  ],
  skincare: [
    ["Wardah Lightening Facial Wash", 32000],
    ["Emina Bright Stuff Face Wash", 28000],
    ["Hanasui Sunscreen", 45000],
    ["Azarine Sunscreen Gel", 65000],
    ["Somethinc Gentle Cleanser", 89000],
  ],
  "makanan-ringan": [
    ["Chitato Original", 12000],
    ["Qtela Singkong Balado", 10000],
    ["Oreo Original", 12000],
    ["SilverQueen Almond", 18000],
    ["Taro Net Seaweed", 10000],
  ],
};

async function main() {
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
      name,
      price,
    }));

    const { error: productError } = await supabase
      .from("products")
      .insert(productRows);

    if (productError) {
      throw productError;
    }

    console.log(`Seeded: ${categoryName}`);
  }

  console.log("Categories and products seeded successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
