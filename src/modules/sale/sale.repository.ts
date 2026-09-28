import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";

import { CreateSalePayload, SaleRow, SaleWithRelations } from "./sale.types";

const table = TABLES.SALES;

const select = `
      *,
      cashier:users!sales_cashier_id_fkey (
        name
      ),
      customer:customers (
        name
      ),
      items:sale_items (
        *,
        product:products (
          name
        )
      ),
      payments:payments (
        *
      )
    `;

export default {
  async findAll(): Promise<SaleWithRelations[]> {
    const { data, error } = await supabase.from(table).select(select);

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<SaleWithRelations> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: CreateSalePayload): Promise<SaleRow> {
    const { data, error } = await supabase.rpc("create_sale", {
      p_cashier_id: payload.cashier_id,
      p_discount: payload.discount,
      p_items: payload.items,
      p_payments: payload.payments,
      ...(payload.customer_id ? { p_customer_id: payload.customer_id } : {}),
    });

    if (error) throw error;

    return data;
  },
};
