import cors from "cors";
import type { RequestHandler } from "express";
import { CORS_FRONTEND_ORIGINS } from "../libs/env";

const corsHandler = cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (CORS_FRONTEND_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
});

export const corsMiddleware: RequestHandler = (req, res, next) => {
  const origin = req.get("Origin");

  // Request without Origin:
  // curl, Postman, server-to-server, dll.
  if (!origin) {
    return next();
  }

  // Same-origin:
  const currentOrigin = `${req.protocol}://${req.get("host")}`;

  if (origin === currentOrigin) {
    return next();
  }

  // Cross-origin:
  return corsHandler(req, res, next);
};
