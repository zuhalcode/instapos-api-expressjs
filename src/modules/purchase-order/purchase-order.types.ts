import { Database } from "../../types/database.types";
import { SupplierRow } from "../supplier";

type PurchaseOrderItemRow =
  Database["public"]["Tables"]["purchase_order_items"]["Row"];
type PurchaseOrderItemInsert =
  Database["public"]["Tables"]["purchase_order_items"]["Insert"];
type PurchaseOrderItemUpdate =
  Database["public"]["Tables"]["purchase_order_items"]["Update"];

type PurchaseOrderRow = Database["public"]["Tables"]["purchase_orders"]["Row"];
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
  PurchaseOrderItemRow,
  PurchaseOrderItemInsert,
  PurchaseOrderItemUpdate,
};
