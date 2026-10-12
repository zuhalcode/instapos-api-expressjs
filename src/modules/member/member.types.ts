import { Database } from "../../types/database.types";

type MemberRow = Database["public"]["Tables"]["customers"]["Row"];
type MemberInsert = Database["public"]["Tables"]["customers"]["Insert"];
type MemberUpdate = Database["public"]["Tables"]["customers"]["Update"];

export type { MemberRow, MemberInsert, MemberUpdate };
