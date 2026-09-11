import { userPaths } from "./user.doc";

export const swaggerSpec = {
  openapi: "3.0.3",

  info: {
    title: "InstaPOS API",
    version: "1.0.0",
  },

  paths: {
    ...userPaths,
  },
};
