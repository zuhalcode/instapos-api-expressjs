import { Database } from "../../types/database.types";
import { ProductRow } from "../product";
import { SaleItemRow } from "../sale-item";
import { UserRow } from "../user";

type SaleRow = Database["public"]["Tables"]["sales"]["Row"];
type SaleInsert = Database["public"]["Tables"]["sales"]["Insert"];
type SaleUpdate = Database["public"]["Tables"]["sales"]["Update"];
type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];

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

type SaleWithRelations = SaleRow & {
  cashier: Pick<UserRow, "name">;
  customer: Pick<CustomerRow, "name"> | null;
  items: SaleItemWithRelations[];
  payments: PaymentRow[];
};

type SaleItemWithRelations = SaleItemRow & {
  product: Pick<ProductRow, "name">;
};

type SaleWithDetails = SaleRow & {
  cashier_name: string;
  customer_name: string | null;
  items: SaleItemWithDetails[];
  payments: PaymentRow[];
};

type SaleItemWithDetails = SaleItemRow & {
  product_name: string;
};

export type {
  SaleRow,
  SaleInsert,
  SaleUpdate,
  SaleWithDetails,
  SaleWithRelations,
};
