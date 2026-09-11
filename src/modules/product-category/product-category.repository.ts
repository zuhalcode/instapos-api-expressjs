import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { ProductCategoryRow } from "./product-category.types";

const table = TABLES.PRODUCT_CATEGORIES;

export default {
  async findAll(): Promise<ProductCategoryRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },
};
