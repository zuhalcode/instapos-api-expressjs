import { Database } from "../../types/database.types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

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

export type { UserResponse, UserRow };
