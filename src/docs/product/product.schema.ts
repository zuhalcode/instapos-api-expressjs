import { OpenAPIV3 } from "openapi-types";

export const productSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Product: {
    type: "object",
    required: ["id", "name", "price", "is_active", "created_at", "updated_at"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },
      name: {
        type: "string",
        example: "Indomie Goreng",
      },
      price: {
        type: "number",
        example: 3500,
      },
      is_active: {
        type: "boolean",
        example: true,
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-22T07:00:00.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-22T07:00:00.000Z",
      },
    },
  },

  CreateProductRequest: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        example: "Indomie Goreng",
      },
      price: {
        type: "number",
        minimum: 0,
        example: 3500,
      },
    },
  },

  UpdateProductRequest: {
    type: "object",
    minProperties: 1,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        example: "Indomie Goreng Special",
      },
      price: {
        type: "number",
        minimum: 0,
        example: 4000,
      },
    },
  },
};
