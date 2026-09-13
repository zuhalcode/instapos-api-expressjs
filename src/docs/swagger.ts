import { OpenAPIV3 } from "openapi-types";
import { authDocs } from "./auth.doc";
import { authSchemas } from "./schemas/auth.schema";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "InstaPOS API",
    version: "1.0.0",
    description: "API documentation for InstaPOS",
  },

  servers: [
    { url: "https://instapos-api-staging.vercel.app", description: "Staging" },
    { url: "https://instapos-api.vercel.app", description: "Production" },
  ],

  paths: { ...authDocs },

  components: {
    schemas: {
      ...authSchemas,
    },

    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
};
