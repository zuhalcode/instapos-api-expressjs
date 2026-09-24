import { OpenAPIV3 } from "openapi-types";

export const saleSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Sale: {
    type: "object",
    required: ["id", "total_amount", "created_at", "updated_at", "items"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "Sale UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      total_amount: {
        type: "number",
        format: "double",
        minimum: 0,
        description: "Total sale amount.",
        example: 17500,
      },

      created_at: {
        type: "string",
        format: "date-time",
        description: "Sale creation timestamp.",
        example: "2026-09-24T07:30:00Z",
      },

      updated_at: {
        type: "string",
        format: "date-time",
        description: "Sale last update timestamp.",
        example: "2026-09-24T07:30:00Z",
      },

      items: {
        type: "array",
        description: "Products included in the sale.",
        items: {
          $ref: "#/components/schemas/SaleItem",
        },
      },
    },
  },

  SaleItem: {
    type: "object",
    required: [
      "id",
      "sale_id",
      "product_id",
      "quantity",
      "unit_price",
      "subtotal",
    ],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "Sale item UUID.",
        example: "c7f1b9a2-9e4d-4d2e-8b2d-1b7f4c9e1234",
      },

      sale_id: {
        type: "string",
        format: "uuid",
        description: "Sale UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      product_id: {
        type: "string",
        format: "uuid",
        description: "Product UUID.",
        example: "5b8f3c21-7a6e-4d91-b2f8-8c3e1a456789",
      },

      quantity: {
        type: "integer",
        minimum: 1,
        description: "Quantity of the product sold.",
        example: 2,
      },

      unit_price: {
        type: "number",
        format: "double",
        minimum: 0,
        description: "Product selling price at the time of sale.",
        example: 3500,
      },

      subtotal: {
        type: "number",
        format: "double",
        minimum: 0,
        description: "Subtotal for this sale item.",
        example: 7000,
      },
    },
  },

  CreateSaleItemRequest: {
    type: "object",
    required: ["product_id", "quantity"],
    properties: {
      product_id: {
        type: "string",
        format: "uuid",
        description: "Product UUID.",
        example: "5b8f3c21-7a6e-4d91-b2f8-8c3e1a456789",
      },

      quantity: {
        type: "integer",
        minimum: 1,
        description: "Quantity of the product to sell.",
        example: 2,
      },
    },
  },

  CreateSaleRequest: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        minItems: 1,
        description: "Products included in the sale.",
        items: {
          $ref: "#/components/schemas/CreateSaleItemRequest",
        },
      },
    },
  },
};
