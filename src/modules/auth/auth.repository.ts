import { supabase } from "../../libs/supabase";
import { TABLES } from "../../shared";

const table = TABLES.USERS;

export default {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },

  async findUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },
};
