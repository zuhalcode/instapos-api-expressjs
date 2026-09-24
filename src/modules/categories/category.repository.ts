import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { CategoryInsert, CategoryRow, CategoryUpdate } from "./category.types";

const table = TABLES.CATEGORIES;

export default {
  async findAll(): Promise<CategoryRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<CategoryRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: CategoryInsert): Promise<CategoryRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: CategoryUpdate): Promise<CategoryRow> {
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
