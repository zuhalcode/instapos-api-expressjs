import { OpenAPIV3 } from "openapi-types";

export const userSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  User: {
    type: "object",
    required: ["id", "name", "email", "role"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89gh9277316",
      },
      name: {
        type: "string",
        example: "zuhal",
      },
      email: {
        type: "string",
        format: "email",
        example: "zuhal@gmail.com",
      },
      role: {
        type: "string",
        enum: ["owner", "cashier", "customer"],
        example: "owner",
      },
    },
  },

  CreateAuthUserRequest: {
    type: "object",
    required: ["name", "email", "password", "role"],
    properties: {
      name: {
        type: "string",
        example: "andi",
      },
      email: { type: "string", format: "email", example: "andi@gmail.com" },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        example: "password123",
      },
    },
  },

  UpdateUserRequest: {
    type: "object",
    properties: {
      name: { type: "string", example: "zuhal" },
      role: {
        type: "string",
        enum: ["owner", "cashier", "customer", "superuser"],
        example: "owner",
      },
    },
    minProperties: 1,
  },
};
