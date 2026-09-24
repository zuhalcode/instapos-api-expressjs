import { Database } from "../../types/database.types";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export type { CategoryRow, CategoryInsert, CategoryUpdate };
