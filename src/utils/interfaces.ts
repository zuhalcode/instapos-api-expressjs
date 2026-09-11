import { Request } from "express";
import type { Database } from "../types/database";

export type UserRole = Database["public"]["Enums"]["user_roles"];

interface IUserToken {
  id: string;
  email?: string;
  role: UserRole;
}

interface IReqUser extends Request {
  user?: IUserToken;
}

export type { IUserToken, IReqUser };
