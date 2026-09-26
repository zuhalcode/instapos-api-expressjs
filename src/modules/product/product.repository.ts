import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import { ProductInsert, ProductRow, ProductUpdate } from "./product.types";

const table = TABLES.PRODUCTS;

const select = `
  *,
  category:categories (
    name
  )
`;

export default {
  async findAll(): Promise<ProductRow[]> {
    const { data, error } = await supabase.from(table).select(select);

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: ProductInsert): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select(select)
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: ProductUpdate): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select(select)
      .single();

    if (error) throw error;

    return data;
  },
};
