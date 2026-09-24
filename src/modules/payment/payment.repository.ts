import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { PaymentInsert, PaymentRow, PaymentUpdate } from "./payment.types";

const table = TABLES.PAYMENTS;

export default {
  async findAll(): Promise<PaymentRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<PaymentRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: PaymentInsert): Promise<PaymentRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: PaymentUpdate): Promise<PaymentRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },
};
