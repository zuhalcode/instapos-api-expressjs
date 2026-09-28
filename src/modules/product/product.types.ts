import { Database } from "../../types/database.types";
import { PurchaseOrderItemRow } from "../purchase-order";
import { SupplierRow } from "../supplier";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

type ProductWithCategory = ProductRow & {
  category: {
    name: string;
  };
};

type ProductWithSuppliers = ProductRow & {
  suppliers: SupplierRow[];
};

export type ProductSupplierItem = {
  product_id: PurchaseOrderItemRow["product_id"];
  purchase_orders: {
    suppliers: SupplierRow;
  } | null;
};

export type {
  ProductRow,
  ProductInsert,
  ProductUpdate,
  ProductWithSuppliers,
  ProductWithCategory,
};
