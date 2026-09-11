// docs/swagger.ts

import swaggerJSDoc from "swagger-jsdoc";
import { userPaths } from "./user.doc";
const options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Instant POS API",
      version: "1.0.0",
    },

    paths: {
      ...userPaths,
    },
  },
};

export const swaggerSpec = swaggerJSDoc(options);
