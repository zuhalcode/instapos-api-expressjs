import { Database } from "../../types/database.types";

type SupplierRow = Database["public"]["Tables"]["suppliers"]["Row"];
type SupplierInsert = Database["public"]["Tables"]["suppliers"]["Insert"];
type SupplierUpdate = Database["public"]["Tables"]["suppliers"]["Update"];

export type { SupplierRow, SupplierInsert, SupplierUpdate };
