import { User } from "@supabase/supabase-js";
import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { CreateAuthUserPayload, UserRow } from "./user.types";

const table = TABLES.USERS;

export default {
  async findAll(): Promise<UserRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },

  async findOne(id: string): Promise<UserRow> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async createAuthUser(payload: CreateAuthUserPayload): Promise<User> {
    const { data, error } = await supabase.auth.admin.createUser(payload);

    if (error) throw error;

    return data.user;
  },
};
