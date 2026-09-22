import { OpenAPIV3 } from "openapi-types";
import { authSchemas } from "./auth/auth.schema";
import { userSchemas } from "./user/user.schema";
import { authPaths } from "./auth/auth.path";
import { userPaths } from "./user/user.path";
import { APP_ENV, AppEnv } from "../libs/env";
import { productSchemas } from "./product/product.schema";
import { productPaths } from "./product/product.path";

const servers: Record<AppEnv, OpenAPIV3.ServerObject> = {
  development: { url: "http://localhost:3001", description: "Development" },
  staging: {
    url: "https://instapos-api-staging.vercel.app",
    description: "Staging",
  },
  production: {
    url: "https://instapos-api.vercel.app",
    description: "Production",
  },
};

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "InstaPOS API",
    version: "1.0.0",
    description: "API documentation for InstaPOS",
  },

  servers: [servers[APP_ENV]],

  paths: { ...authPaths, ...userPaths, ...productPaths },

  components: {
    schemas: { ...authSchemas, ...userSchemas, ...productSchemas },

    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
};
