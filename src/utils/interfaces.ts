import { Request } from "express";
import { Database } from "../types/database.types";

export type UserRole = Database["public"]["Enums"]["user_role"];

interface IUserToken {
  id: string;
  email: string;
  role: UserRole;
}

interface IReqUser extends Request {
  user?: IUserToken;
}

export type { IUserToken, IReqUser };
