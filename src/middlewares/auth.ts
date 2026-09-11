import { Response, NextFunction } from "express";
import { supabase } from "../libs/supabase";
import { IReqUser } from "../utils/interfaces";
import { TABLES } from "../constants/table.constant";

export async function isAuthenticated(
  req: IReqUser,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  const table = TABLES.USERS;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized – no token" });
  }

  // Verify the token with Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.error("Error getting user:", error);
    return res.status(401).json({ error: "Unauthorized – invalid token" });
  }

  const { data: appUser, error: appUserError } = await supabase
    .from(table)
    .select("role")
    .eq("id", user.id)
    .single();

  if (appUserError || !appUser) {
    return res.status(403).json({
      error: "User profile not found",
    });
  }

  req.user = {
    id: user.id,
    email: user.email,
    role: appUser.role,
  };

  next();
}
