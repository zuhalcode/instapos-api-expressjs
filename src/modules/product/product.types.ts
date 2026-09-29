import { Database } from "../../types/database.types";
import { PurchaseOrderItemRow } from "../purchase-order";
import { SupplierRow } from "../supplier";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

type ProductWithRelations = ProductWithCategory & {
  supplier: SupplierRow | null;
};

type ProductWithCategory = ProductRow & {
  category: {
    name: string;
  };
};

type ProductWithSuppliers = ProductRow & {
  suppliers: Pick<SupplierRow, "id" | "code" | "name">[];
};

export type ProductSupplierItem = {
  product_id: PurchaseOrderItemRow["product_id"];
  purchase_orders: {
    suppliers: SupplierRow;
  } | null;
};

type ProductResponse = Omit<ProductWithRelations, "category"> & {
  category_name: string | null;
};

export type {
  ProductRow,
  ProductInsert,
  ProductUpdate,
  ProductWithSuppliers,
  ProductWithCategory,
  ProductWithRelations,
  ProductResponse,
};
