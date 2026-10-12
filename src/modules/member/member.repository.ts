import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";
import { MemberInsert, MemberRow, MemberUpdate } from "./member.types";

const table = TABLES.CUSTOMERS;

export default {
  async findAll(search?: string): Promise<MemberRow[]> {
    let query = supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,phone_number.ilike.%${search}%,code_member.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<MemberRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(payload: MemberInsert): Promise<MemberRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, payload: MemberUpdate): Promise<MemberRow> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return data;
  },

  async getLatestMemberCode(): Promise<string | null> {
    const { data, error } = await supabase
      .from(table)
      .select("code_member")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return data?.code_member ?? null;
  },
};
