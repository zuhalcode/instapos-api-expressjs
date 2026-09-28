import { Database } from "../../types/database.types";
import { SaleItemRow } from "../sale-item";

type SaleRow = Database["public"]["Tables"]["sales"]["Row"];
type SaleInsert = Database["public"]["Tables"]["sales"]["Insert"];
type SaleUpdate = Database["public"]["Tables"]["sales"]["Update"];
type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];

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

type SaleWithDetails = SaleRow & {
  items: SaleItemRow[];
  payments: PaymentRow[];
};

export type { SaleRow, SaleInsert, SaleUpdate, SaleWithDetails };
