import { Response, NextFunction } from "express";
import { UserRole } from "../modules/user/user.types";
import { IReqUser } from "../utils/interfaces";

export function authorize(...allowedRoles: UserRole[]) {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    next();
  };
}
