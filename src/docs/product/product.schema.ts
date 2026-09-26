import { OpenAPIV3 } from "openapi-types";

export const productSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Product: {
    type: "object",
    required: [
      "id",
      "category_id",
      "name",
      "price",
      "barcode",
      "is_active",
      "created_at",
      "updated_at",
      "category",
    ],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },
      category_id: {
        type: "string",
        format: "uuid",
        example: "2f8b5c7e-1a34-4d91-9c62-8e7b3a5f2140",
      },
      name: {
        type: "string",
        example: "indomie goreng",
      },
      price: {
        type: "number",
        minimum: 0,
        example: 3500,
      },
      barcode: {
        type: "string",
        maxLength: 50,
        nullable: true,
        example: "8992761132104",
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
        nullable: true,
        example: "2026-09-22T07:00:00.000Z",
      },
      category: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
        },
      },
    },
  },

  CreateProductRequest: {
    type: "object",
    required: ["category_id", "name", "price"],
    properties: {
      category_id: {
        type: "string",
        format: "uuid",
        example: "2f8b5c7e-1a34-4d91-9c62-8e7b3a5f2140",
      },
      name: {
        type: "string",
        minLength: 1,
        example: "indomie goreng",
      },
      price: {
        type: "number",
        minimum: 0,
        example: 3500,
      },
      barcode: {
        type: "string",
        maxLength: 50,
        nullable: true,
        example: "8992761132104",
      },
    },
  },

  UpdateProductRequest: {
    type: "object",
    minProperties: 1,
    properties: {
      category_id: {
        type: "string",
        format: "uuid",
        example: "2f8b5c7e-1a34-4d91-9c62-8e7b3a5f2140",
      },
      name: {
        type: "string",
        minLength: 1,
        example: "indomie goreng special",
      },
      price: {
        type: "number",
        minimum: 0,
        example: 4000,
      },
      barcode: {
        type: "string",
        maxLength: 50,
        nullable: true,
        example: "8992761132104",
      },
      is_active: {
        type: "boolean",
        example: true,
      },
    },
  },
};
