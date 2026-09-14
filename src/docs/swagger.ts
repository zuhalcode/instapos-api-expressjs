import { OpenAPIV3 } from "openapi-types";

import { authSchemas } from "./auth/auth.schema";
import { userSchemas } from "./user/user.schema";
import { authPaths } from "./auth/auth.path";
import { userPaths } from "./user/user.path";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "InstaPOS API",
    version: "1.0.0",
    description: "API documentation for InstaPOS",
  },

  servers: [
    { url: "http://localhost:3001", description: "Development" },
    { url: "https://instapos-api-staging.vercel.app", description: "Staging" },
    { url: "https://instapos-api.vercel.app", description: "Production" },
  ],

  paths: { ...authPaths, ...userPaths },

  components: {
    schemas: { ...authSchemas, ...userSchemas },

    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
};
