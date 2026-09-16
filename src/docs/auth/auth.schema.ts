import { OpenAPIV3 } from "openapi-types";

export const authSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "tes@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "tes123",
      },
    },
  },

  LoginResponse: {
    type: "object",
    required: ["access_token", "refresh_token"],
    properties: {
      access_token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      refresh_token: {
        type: "string",
        example: "v1.MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw...",
      },
      expiresIn: {
        type: "number",
        example: 3600,
      },

      user: {
        type: "object",
        required: ["id", "name", "email", "role"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "45863156-7d72-48d0-8934-1f52721e6120",
          },
          name: {
            type: "string",
            example: "tes",
          },
          email: {
            type: "string",
            format: "email",
            example: "tes@gmail.com",
          },
          role: {
            type: "string",
            example: "customer",
          },
        },
      },
    },
  },
};
