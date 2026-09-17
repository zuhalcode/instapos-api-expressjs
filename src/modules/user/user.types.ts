import { Database } from "../../types/database.types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

export enum UserRole {
  OWNER = "OWNER",
  CASHIER = "CASHIER",
  CUSTOMER = "CUSTOMER",
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface CreateAuthUserPayload {
  email: string;
  password: string;
  email_confirm: boolean;
  user_metadata: {
    name: string;
  };
}

export type { UserResponse, UserRow, UserInsert, CreateAuthUserPayload };
