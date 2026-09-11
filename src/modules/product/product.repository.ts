import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";

import { ProductInsert, ProductRow, ProductUpdate } from "./product.types";

const table = TABLES.PRODUCTS;

export default {
  async findAll(): Promise<ProductRow[]> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  async create(payload: ProductInsert): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: ProductUpdate): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .is("deleted_at", null)
      .select(`*`)
      .single();

    if (error) throw error;

    return data;
  },

  async restore(id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .update({ deleted_at: null, deleted_by: null })
      .eq("id", id)
      .not("deleted_at", "is", null)
      .select("id")
      .single();

    if (error) throw error;
  },

  // Soft Delete
  async remove(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select("id")
      .single();

    if (error) throw error;
  },

  // Hard Delete
  async destroy(id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .not("deleted_at", "is", null)
      .select("id")
      .single();

    if (error) throw error;
  },

  async getNextSequenceNumber(code: string): Promise<number> {
    const { data, error } = await supabase.rpc("next_product_sequence", {
      p_category_code: code,
    });

    if (error) throw error;

    return data;
  },
};
