import { OpenAPIV3 } from "openapi-types";

export const productStockSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  ProductStockLocation: {
    type: "string",
    enum: ["warehouse", "display"],
    example: "warehouse",
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
