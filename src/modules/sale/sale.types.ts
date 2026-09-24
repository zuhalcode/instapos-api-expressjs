import { Database } from "../../types/database.types";

type SaleRow = Database["public"]["Tables"]["sales"]["Row"];
type SaleInsert = Database["public"]["Tables"]["sales"]["Insert"];
type SaleUpdate = Database["public"]["Tables"]["sales"]["Update"];

export type { SaleRow, SaleInsert, SaleUpdate };
