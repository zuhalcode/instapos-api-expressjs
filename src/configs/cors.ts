import cors from "cors";
import type { RequestHandler } from "express";
import { CORS_FRONTEND_ORIGIN } from "../libs/env";

const corsHandler = cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (origin === CORS_FRONTEND_ORIGIN) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
});

export const corsMiddleware: RequestHandler = (req, res, next) => {
  const origin = req.get("Origin");

  // Request tanpa Origin:
  // curl, Postman, server-to-server, dll.
  if (!origin) {
    return next();
  }

  // Same-origin:
  // https://instapos-api-staging.vercel.app
  //        ↓
  // https://instapos-api-staging.vercel.app/api/*
  const currentOrigin = `${req.protocol}://${req.get("host")}`;

  if (origin === currentOrigin) {
    return next();
  }

  // Cross-origin:
  // http://localhost:3000
  //        ↓
  // https://instapos-api-staging.vercel.app/api/*
  return corsHandler(req, res, next);
};
