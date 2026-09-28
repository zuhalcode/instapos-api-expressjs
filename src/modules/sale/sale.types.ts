import { Database } from "../../types/database.types";
import { ProductRow } from "../product";
import { PurchaseOrderItemRow, PurchaseOrderRow } from "../purchase-order";
import { SaleItemRow } from "../sale-item";
import { SupplierRow } from "../supplier";
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

type SaleWithDetails = SaleRow & {
  cashier: UserRow;
  customer: CustomerRow | null;
  items: SaleItemWithDetails[];
  payments: PaymentRow[];
};

type SaleItemWithDetails = SaleItemRow & {
  product: ProductRow & {
    purchase_order_items: PurchaseOrderItemWithDetails[];
  };
};

type PurchaseOrderItemWithDetails = PurchaseOrderItemRow & {
  purchase_order: PurchaseOrderWithSupplier;
};

type PurchaseOrderWithSupplier = PurchaseOrderRow & {
  supplier: SupplierRow;
};

export type { SaleRow, SaleInsert, SaleUpdate, SaleWithDetails };
