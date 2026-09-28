import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  ProductInsert,
  ProductRow,
  ProductUpdate,
  ProductWithCategory,
  ProductWithSuppliers,
} from "./product.types";

const table = TABLES.PRODUCTS;

const select = `
  *,
  category:categories (
    name
  ),
` as const;

const supplierSelect = `
  product_id,
  purchase_orders (
    suppliers (*)
  )
`;

export default {
  async findAll() {
    const { data: products, error: productError } = await supabase
      .from(table)
      .select("*");

    if (productError) throw productError;

    const productIds = products.map(({ id }) => id);

    const { data: items, error: itemError } = await supabase
      .from("purchase_order_items")
      .select(supplierSelect)
      .in("product_id", productIds);

    if (itemError) throw itemError;

    return {
      products,
      items,
    };
  },

  async findOne(id: string) {
    const { data: product, error: productError } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (productError) throw productError;

    const { data: items, error: itemError } = await supabase
      .from("purchase_order_items")
      .select(supplierSelect)
      .eq("product_id", id);

    if (itemError) throw itemError;

    return {
      product,
      items,
    };
  },

  async create(payload: ProductInsert): Promise<ProductWithCategory> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select(
        `
        *,
        category:categories (
          name
        )
      `,
      )
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    id: string,
    payload: ProductUpdate,
  ): Promise<ProductWithCategory> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select(
        `
        *,
        category:categories (
          name
        )
      `,
      )
      .single();

    if (error) throw error;

    return data;
  },
};
