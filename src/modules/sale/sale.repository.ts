import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { SaleInsert, SaleRow, SaleUpdate } from "./sale.types";

const table = TABLES.SALES;

export default {
  async findAll(): Promise<SaleRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<SaleRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: SaleInsert): Promise<SaleRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: SaleUpdate): Promise<SaleRow> {
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
