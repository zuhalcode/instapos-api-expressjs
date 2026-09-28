import { purchaseOrderService } from "../modules/purchase-order";

export async function completePurchaseOrders(): Promise<void> {
  console.log("Completing purchase orders...");

  const purchaseOrders = await purchaseOrderService.findAll();

  const draftPurchaseOrders = purchaseOrders.filter(
    (purchaseOrder) => purchaseOrder.status === "draft",
  );

  if (draftPurchaseOrders.length === 0) {
    console.log("No draft purchase orders found.");
    return;
  }

  console.log(`Found ${draftPurchaseOrders.length} draft purchase order(s).`);

  for (const purchaseOrder of draftPurchaseOrders) {
    await purchaseOrderService.complete(purchaseOrder.id);

    console.log(`✓ ${purchaseOrder.po_number} completed`);
  }

  console.log(`${draftPurchaseOrders.length} purchase order(s) completed.`);
}
