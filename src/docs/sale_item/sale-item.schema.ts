import { OpenAPIV3 } from "openapi-types";

export const saleItemSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
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
        description: "Sale item subtotal.",
        example: 7000,
      },
    },
  },
};
