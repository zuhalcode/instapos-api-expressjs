import { Database } from "../../types/database.types";

type PaymentMethod = Database["public"]["Enums"]["payment_method"];
type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];
type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"];

export type { PaymentRow, PaymentInsert, PaymentUpdate, PaymentMethod };
