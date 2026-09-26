import { seedUsers } from "./seed-auth";
import { seedPurchaseOrderItems } from "./seed-po-item";
import { seedProducts } from "./seed-product";

async function main() {
  console.log("Starting database seed...\n");

  await seedUsers();

  console.log("");

  await seedProducts();

  console.log("");

  await seedPurchaseOrderItems();

  console.log("\nDatabase seed completed successfully.");
}

main().catch((error) => {
  console.error("\nDatabase seed failed:");
  console.error(error);

  process.exit(1);
});
