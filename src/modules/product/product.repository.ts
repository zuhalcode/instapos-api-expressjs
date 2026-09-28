import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  ProductInsert,
  ProductRow,
  ProductUpdate,
  ProductWithSuppliers,
} from "./product.types";

const table = TABLES.PRODUCTS;

const select = `
  *,
  category:categories (
    name
  )
`;

export default {
  async findAll(): Promise<ProductWithSuppliers[]> {
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*");

    if (productError) throw productError;

    const productIds = products.map((product) => product.id);

    const { data: items, error: itemError } = await supabase
      .from("purchase_order_items")
      .select(`product_id, purchase_orders(suppliers(*))`)
      .in("product_id", productIds);

    if (itemError) throw itemError;

    const result = products
      .map((product) => ({
        ...product,
        suppliers: items
          .filter((item) => item.product_id === product.id)
          .map((item) => item.purchase_orders?.suppliers)
          .filter(Boolean),
      }))
      .filter((product) => product.suppliers.length > 0);

    return result;
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
