import { seedUsers } from "./seed-auth";
import { seedProducts, updateProductPrices } from "./seed-product";
import { seedPurchaseOrderItems } from "./seed-po-item";
import { seedSales } from "./seed-sale";
import { completePurchaseOrders } from "./seed-complete-po";

async function main() {
  console.log("Starting database seed...\n");

  await seedUsers();

  console.log("");

  await seedProducts();

  console.log("");

  await seedPurchaseOrderItems();

  console.log("");

  await completePurchaseOrders();

  console.log("");

  await updateProductPrices();

  console.log("");

  await seedSales();

  console.log("\nDatabase seed completed successfully.");
}

main().catch((error) => {
  console.error("\nDatabase seed failed:");
  console.error(error);

  process.exit(1);
});
