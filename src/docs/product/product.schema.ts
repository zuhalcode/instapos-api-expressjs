import { OpenAPIV3 } from "openapi-types";

export const productSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  ProductSupplier: {
    type: "object",
    required: ["id", "code", "name"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "b7f3c1a2-8d45-4e91-b6f2-123456789abc",
      },
      code: {
        type: "string",
        nullable: true,
        maxLength: 20,
        example: "SUP001",
      },
      name: {
        type: "string",
        nullable: true,
        maxLength: 100,
        example: "PT Sejahtera",
      },
    },
  },

  Product: {
    type: "object",
    required: [
      "id",
      "category_id",
      "name",
      "purchase_price",
      "price",
      "stock",
      "min_stock",
      "is_active",
      "created_at",
      "updated_at",
      "suppliers",
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
        example: "Indomie goreng",
      },

      purchase_price: {
        type: "number",
        minimum: 0,
        example: 1500000,
        description: "Current purchase price of the product.",
      },

      price: {
        type: "number",
        minimum: 0,
        example: 1750000,
        description: "Selling price of the product.",
      },

      stock: {
        type: "integer",
        minimum: 0,
        example: 10,
      },

      min_stock: {
        type: "integer",
        minimum: 0,
        example: 3,
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

      suppliers: {
        type: "array",
        description:
          "Suppliers that have supplied this product through purchase orders.",
        items: {
          $ref: "#/components/schemas/ProductSupplier",
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
        example: "",
      },

      price: {
        type: "number",
        minimum: 0,
        example: 1750000,
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
        example: "Indomie Special",
      },

      price: {
        type: "number",
        minimum: 0,
        example: 1850000,
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
