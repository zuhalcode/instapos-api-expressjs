import dotenv from "dotenv";

dotenv.config();

export type AppEnv = "development" | "staging" | "production";

export const APP_ENV: AppEnv =
  process.env.APP_ENV === "staging"
    ? "staging"
    : process.env.APP_ENV === "production"
      ? "production"
      : "development";

export const PORT: number = Number(process.env.PORT) || 3001;

export const SUPABASE_URL: string = process.env.SUPABASE_URL || "";
export const SUPABASE_DATABASE_URL: string =
  process.env.SUPABASE_DATABASE_URL || "";
export const SUPABASE_SERVICE_ROLE_KEY: string =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const CORS_FRONTEND_ORIGIN: string =
  process.env.CORS_FRONTEND_ORIGIN || "";
