import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  ProductInsert,
  ProductRow,
  ProductUpdate,
  ProductWithCategory,
  ProductWithRelations,
} from "./product.types";

const table = TABLES.PRODUCTS;

const select = `
  *,
  category:categories (
    name
  ),
  purchase_order_items (
    purchase_order:purchase_orders (
      supplier:suppliers (
        id,
        code,
        name,
        phone_number,
        address
      )
    )
  )
`;

const productSelect = `
  *,
  category:categories (
    name
  )
` as const;

const supplierSelect = `
  product_id,
  purchase_orders (
    suppliers ( id,
      code,
      name)
  )
`;

export default {
  async findAll() {
    const { data, error } = await supabase.from(table).select(select);

    if (error) {
      throw error;
    }

    return data.map((product) => {
      const suppliers = product.purchase_order_items
        .map((item) => item.purchase_order?.supplier)
        .filter(Boolean);

      // Hilangkan supplier duplicate
      const uniqueSuppliers = Array.from(
        new Map(suppliers.map((supplier) => [supplier.id, supplier])).values(),
      );

      return {
        ...product,
        category_name: product.category?.name ?? null,
        suppliers: uniqueSuppliers,
        category: undefined,
        purchase_order_items: undefined,
      };
    });
  },

  async findOne(id: ProductRow["id"]) {},

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
