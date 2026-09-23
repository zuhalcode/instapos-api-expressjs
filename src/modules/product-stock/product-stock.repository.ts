import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import {
  ProductStockInsert,
  ProductStockRow,
  ProductStockUpdate,
} from "./product-stock.types";

const table = TABLES.PRODUCT_STOCKS;

export default {
  async findAll(): Promise<ProductStockRow[]> {
    const { data, error } = await supabase.from(table).select(`
      product_id,
      quantity,
      location,
      product:products (
        name,
        price,
        is_active,
        created_at,
        updated_at
      )
    `);

    if (error) throw error;

    return data;
  },

  async findOne(productId: string): Promise<ProductStockRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("product_id", productId)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: ProductStockInsert): Promise<ProductStockRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    productId: string,
    payload: ProductStockUpdate,
  ): Promise<ProductStockRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("product_id", productId)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },
};
