import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { ProductInsert, ProductRow, ProductUpdate } from "./product.types";

const table = TABLES.PRODUCTS;

export default {
  async findAll(): Promise<ProductRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<ProductRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: ProductInsert): Promise<ProductRow> {
    const { data, error } = await supabase.rpc("create_product", {
      p_name: payload.name,
      p_price: payload.price,
    });

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: ProductUpdate): Promise<ProductRow> {
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
