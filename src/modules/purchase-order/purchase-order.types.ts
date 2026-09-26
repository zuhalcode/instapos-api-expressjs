import { Database } from "../../types/database.types";
import { SupplierRow } from "../supplier";

type PurchaseOrderRow = Database["public"]["Tables"]["purchase_orders"]["Row"];
type PurchaseOrderItemRow =
  Database["public"]["Tables"]["purchase_order_items"]["Row"];
type PurchaseOrderInsert =
  Database["public"]["Tables"]["purchase_orders"]["Insert"];
type PurchaseOrderUpdate =
  Database["public"]["Tables"]["purchase_orders"]["Update"];

type PurchaseOrderDetail = PurchaseOrderRow & {
  supplier: SupplierRow;
  items: PurchaseOrderItemRow[];
};

export type {
  PurchaseOrderRow,
  PurchaseOrderInsert,
  PurchaseOrderUpdate,
  PurchaseOrderDetail,
};
