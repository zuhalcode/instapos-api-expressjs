import { Database } from "../../types/database.types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];
type ProductLocation = Database["public"]["Enums"]["product_location"];

export type { ProductRow, ProductInsert, ProductLocation, ProductUpdate };
