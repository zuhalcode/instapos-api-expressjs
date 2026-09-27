import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  PurchaseOrderDetail,
  PurchaseOrderInsert,
  PurchaseOrderRow,
  PurchaseOrderUpdate,
} from "./purchase-order.types";

const table = TABLES.PURCHASE_ORDERS;

export default {
  async findAll(): Promise<PurchaseOrderRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<PurchaseOrderDetail> {
    const { data, error } = await supabase
      .from("purchase_orders")
      .select(
        `
      *,
      supplier:suppliers (
        *
      ),
      items:purchase_order_items (
        *
      )
    `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: PurchaseOrderInsert): Promise<PurchaseOrderRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    id: string,
    payload: PurchaseOrderUpdate,
  ): Promise<PurchaseOrderRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async complete(id: PurchaseOrderRow["id"]): Promise<PurchaseOrderRow> {
    const { error } = await supabase.rpc("complete_purchase_order", {
      p_purchase_order_id: id,
    });

    if (error) throw error;

    const { data, error: fetchError } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    return data;
  },

  async cancel(id: PurchaseOrderRow["id"]): Promise<PurchaseOrderRow> {
    const { data, error } = await supabase
      .from(table)
      .update({ status: "cancelled" })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },
};
