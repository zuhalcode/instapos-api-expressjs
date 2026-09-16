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

  LoginResponse: {
    type: "object",
    required: ["access_token", "refresh_token"],
    properties: {
      access_token: {
        type: "string",
        description: "JWT access token used to authenticate API requests.",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      refresh_token: {
        type: "string",
        description: "Token used to obtain a new access token.",
        example: "v1.MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw...",
      },
    },
  },
};
