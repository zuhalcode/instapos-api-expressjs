import { OpenAPIV3 } from "openapi-types";
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFile = ["../app.ts"];

const doc = {
  openapi: "3.0.0",
  info: {
    title: "InstaPOS API",
    version: "1.0.0",
    description: "API documentation for InstaPOS",
  },

  servers: [
    { url: "http://localhost:3001", description: "Local Development" },
    { url: "https://instapos-api-staging.vercel.app", description: "Staging" },
    { url: "https://instapos-api.vercel.app", description: "Production" },
  ],

  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },

    schemas: {
      LoginRequest: {
        email: "zuhal@gmail.com",
        password: "xxxxxx",
      },
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFile, doc);
