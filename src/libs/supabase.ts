// src/lib/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "./env";
import { Database } from "../types/database";

declare global {
  // Extend globalThis supaya TypeScript ngerti properti ini
  var _supabase: SupabaseClient<Database> | undefined;
}

if (!globalThis._supabase) {
  globalThis._supabase = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
  );
}

export const supabase = globalThis._supabase!; // Non-null assertion karena sudah dipastikan ada
