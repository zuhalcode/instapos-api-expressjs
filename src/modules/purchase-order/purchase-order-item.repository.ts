import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  PurchaseOrderItemRow,
  PurchaseOrderRow,
  PurchaseOrderItemInsert,
  PurchaseOrderItemUpdate,
} from "./purchase-order.types";

const table = TABLES.PURCHASE_ORDER_ITEMS;

export default {
  async create(
    purchaseOrderId: PurchaseOrderRow["id"],
    payload: PurchaseOrderItemInsert,
  ): Promise<PurchaseOrderItemRow> {
    const { data, error } = await supabase
      .from(table)
      .insert({
        purchase_order_id: purchaseOrderId,
        product_id: payload.product_id,
        quantity: payload.quantity,
        unit_price: payload.unit_price,
      })
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    purchaseOrderId: PurchaseOrderRow["id"],
    itemId: PurchaseOrderItemRow["id"],
    payload: PurchaseOrderItemUpdate,
  ): Promise<PurchaseOrderItemRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", itemId)
      .eq("purchase_order_id", purchaseOrderId)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },
};
