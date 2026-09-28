import { Database } from "../../types/database.types";
import { SupplierRow } from "../supplier";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

type ProductWithSuppliers = ProductRow & {
  suppliers: SupplierRow[];
};

export type { ProductRow, ProductInsert, ProductUpdate, ProductWithSuppliers };
