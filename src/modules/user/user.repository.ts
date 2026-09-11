import { TABLES } from "../../constants/table.constant";
import { supabase } from "../../libs/supabase";
import { UserRow } from "./user.types";

const table = TABLES.USERS;

export default {
  async findAll(): Promise<UserRow[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) throw error;

    return data;
  },
};
