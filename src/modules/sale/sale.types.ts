import { Database } from "../../types/database.types";

type SaleRow = Database["public"]["Tables"]["sales"]["Row"];
type SaleInsert = Database["public"]["Tables"]["sales"]["Insert"];
type SaleUpdate = Database["public"]["Tables"]["sales"]["Update"];

export type CreateSalePayload = {
  cashier_id: string;
  customer_id?: string;
  discount: number;
  items: {
    product_id: string;
    quantity: number;
  }[];
  payments: {
    method: "cash" | "qris" | "card" | "transfer";
    amount: number;
  }[];
};

export type { SaleRow, SaleInsert, SaleUpdate };
