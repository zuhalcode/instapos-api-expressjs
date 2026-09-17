import { Request } from "express";
import { UserRole } from "../modules/user/user.types";

interface IUserToken {
  id: string;
  email: string;
  role: UserRole;
}

interface IReqUser extends Request {
  user?: IUserToken;
}

export type { IUserToken, IReqUser };
