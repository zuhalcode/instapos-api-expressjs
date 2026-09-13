import { OpenAPIV3 } from "openapi-types";

export const authSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "admin@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "password123",
      },
    },
  },
};
