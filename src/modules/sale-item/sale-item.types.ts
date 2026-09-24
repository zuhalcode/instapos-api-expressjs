import { Database } from "../../types/database.types";

type SaleItemRow = Database["public"]["Tables"]["sale_items"]["Row"];
type SaleItemInsert = Database["public"]["Tables"]["sale_items"]["Insert"];
type SaleItemUpdate = Database["public"]["Tables"]["sale_items"]["Update"];

export type { SaleItemRow, SaleItemInsert, SaleItemUpdate };
