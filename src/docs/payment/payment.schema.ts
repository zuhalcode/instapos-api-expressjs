import { OpenAPIV3 } from "openapi-types";

export const paymentSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  PaymentMethod: {
    type: "string",
    enum: ["cash", "card", "qris", "transfer"],
    example: "cash",
  },

  Payment: {
    type: "object",
    required: ["id", "sale_id", "method", "amount", "paid_at"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "Payment UUID.",
        example: "c7f1b9a2-9e4d-4d2e-8b2d-1b7f4c9e1234",
      },

      sale_id: {
        type: "string",
        format: "uuid",
        description: "Sale UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      amount: {
        type: "number",
        format: "double",
        minimum: 0,
        description: "Payment amount.",
        example: 20000,
      },

      paid_at: {
        type: "string",
        format: "date-time",
        description: "Payment timestamp.",
        example: "2026-09-24T07:30:00Z",
      },
    },
  },

  CreatePaymentRequest: {
    type: "object",
    required: ["method", "amount"],
    properties: {
      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      amount: {
        type: "number",
        format: "double",
        minimum: 0,
        description: "Amount paid by the customer.",
        example: 20000,
      },
    },
  },
};
