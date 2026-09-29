import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import {
  ProductInsert,
  ProductRow,
  ProductUpdate,
  ProductWithCategory,
  ProductWithRelations,
  ProductWithSuppliers,
} from "./product.types";

const table = TABLES.PRODUCTS;

const productSelect = `
  *,
  category:categories (
    name
  )
` as const;

const supplierSelect = `
  product_id,
  purchase_orders (
    suppliers (*)
  )
`;

export default {
  async findAll(): Promise<ProductWithRelations[]> {
    const { data: products, error: productError } = await supabase
      .from(table)
      .select(productSelect)
      .overrideTypes<ProductWithCategory[]>();

    if (productError) {
      throw productError;
    }

    if (products.length === 0) {
      return [];
    }

    const productIds = products.map(({ id }) => id);

    const { data: items, error: itemError } = await supabase
      .from("purchase_order_items")
      .select(supplierSelect)
      .in("product_id", productIds);

    if (itemError) {
      throw itemError;
    }

    const suppliersByProduct = new Map(
      items.map((item) => [
        item.product_id,
        item.purchase_orders?.suppliers ?? null,
      ]),
    );

    return products.map((product) => {
      const supplier = suppliersByProduct.get(product.id) ?? null;

      // Debug hanya product tertentu
      if (product.id === "d62c01aa-65bc-4307-8cf2-a0c40d9df438") {
        console.log("[PRODUCT SUPPLIER DEBUG]", {
          product_id: product.id,
          supplier_id: supplier?.id ?? null,
          supplier_name: supplier?.name ?? null,
        });
      }

      return {
        ...product,
        supplier,
      };
    });
  },

  async findOne(id: ProductRow["id"]): Promise<ProductWithRelations | null> {
    const { data: product, error: productError } = await supabase
      .from(table)
      .select(productSelect)
      .eq("id", id)
      .maybeSingle();

    if (productError) throw productError;

    if (!product) {
      return null;
    }

    const typedProduct = product as ProductWithCategory;

    const { data: item, error: itemError } = await supabase
      .from("purchase_order_items")
      .select(supplierSelect)
      .eq("product_id", typedProduct.id)
      .maybeSingle();

    if (itemError) throw itemError;

    return {
      ...typedProduct,
      supplier: item?.purchase_orders?.suppliers ?? null,
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
