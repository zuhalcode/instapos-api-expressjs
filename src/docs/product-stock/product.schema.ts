import { OpenAPIV3 } from "openapi-types";

export const productStockSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  ProductStockLocation: {
    type: "string",
    enum: ["warehouse", "display"],
    example: "warehouse",
  },

  Product: {
    type: "object",
    required: ["name", "price", "is_active", "created_at", "updated_at"],
    properties: {
      name: {
        type: "string",
        description: "Product name.",
        example: "Indomie Goreng",
      },

      price: {
        type: "number",
        format: "double",
        description: "Product selling price.",
        example: 3500,
      },

      is_active: {
        type: "boolean",
        description: "Whether the product is active.",
        example: true,
      },

      created_at: {
        type: "string",
        format: "date-time",
        description: "Product creation timestamp.",
        example: "2026-09-23T02:00:00Z",
      },

      updated_at: {
        type: "string",
        format: "date-time",
        description: "Product last update timestamp.",
        example: "2026-09-23T02:00:00Z",
      },
    },
  },

  ProductStock: {
    type: "object",
    required: ["product_id", "quantity", "location"],
    properties: {
      product_id: {
        type: "string",
        format: "uuid",
        description: "Product UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      quantity: {
        type: "integer",
        minimum: 0,
        description: "Available stock quantity.",
        example: 25,
      },

      location: {
        $ref: "#/components/schemas/ProductStockLocation",
      },
    },
  },

  ProductStockResponse: {
    type: "object",
    required: ["product_id", "quantity", "location", "product"],
    properties: {
      product_id: {
        type: "string",
        format: "uuid",
        description: "Product UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      quantity: {
        type: "integer",
        minimum: 0,
        description: "Available stock quantity.",
        example: 25,
      },

      location: {
        $ref: "#/components/schemas/ProductStockLocation",
      },

      product: {
        $ref: "#/components/schemas/Product",
      },
    },
  },

  CreateProductStockRequest: {
    type: "object",
    required: ["product_id", "location"],
    properties: {
      product_id: {
        type: "string",
        format: "uuid",
        description: "Product UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      quantity: {
        type: "integer",
        minimum: 0,
        default: 0,
        description: "Initial stock quantity.",
        example: 25,
      },

      location: {
        $ref: "#/components/schemas/ProductStockLocation",
      },
    },
  },

  UpdateProductStockRequest: {
    type: "object",
    required: ["quantity"],
    properties: {
      quantity: {
        type: "integer",
        minimum: 0,
        description: "New stock quantity.",
        example: 30,
      },
    },
  },
};
