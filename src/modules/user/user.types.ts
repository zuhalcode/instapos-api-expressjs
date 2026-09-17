import { Database } from "../../types/database.types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
type UserRole = Database["public"]["Enums"]["user_role"];

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

type UpdateUserPayload = {
  name?: string;
  role?: UserRole;
};

export type {
  UserResponse,
  UserRow,
  UserInsert,
  UserRole,
  CreateAuthUserPayload,
  UpdateUserPayload,
};
