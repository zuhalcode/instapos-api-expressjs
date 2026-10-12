import { OpenAPIV3 } from "openapi-types";

export const reportSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  SalesReport: {
    type: "object",
    required: ["period", "summary", "payment_breakdown", "cashiers", "daily_trend"],
    properties: {
      period: {
        type: "object",
        required: ["from", "to"],
        properties: {
          from: {
            type: "string",
            example: "2026-10-01",
          },
          to: {
            type: "string",
            example: "2026-10-08",
          },
        },
      },
      summary: {
        type: "object",
        required: [
          "gross_sales",
          "total_discounts",
          "net_sales",
          "transaction_count",
          "average_transaction_value",
          "items_sold",
        ],
        properties: {
          gross_sales: {
            type: "number",
            example: 1250000,
          },
          total_discounts: {
            type: "number",
            example: 50000,
          },
          net_sales: {
            type: "number",
            example: 1200000,
          },
          transaction_count: {
            type: "integer",
            example: 25,
          },
          average_transaction_value: {
            type: "number",
            example: 48000,
          },
          items_sold: {
            type: "integer",
            example: 80,
          },
        },
      },
      payment_breakdown: {
        type: "array",
        items: {
          type: "object",
          required: ["method", "transactions", "amount", "percentage"],
          properties: {
            method: {
              type: "string",
              example: "cash",
            },
            transactions: {
              type: "integer",
              example: 15,
            },
            amount: {
              type: "number",
              example: 750000,
            },
            percentage: {
              type: "number",
              example: 62.5,
            },
          },
        },
      },
      cashiers: {
        type: "array",
        items: {
          type: "object",
          required: ["cashier_id", "cashier_name", "transactions", "net_sales"],
          properties: {
            cashier_id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            cashier_name: {
              type: "string",
              example: "cashier",
            },
            transactions: {
              type: "integer",
              example: 25,
            },
            net_sales: {
              type: "number",
              example: 1200000,
            },
          },
        },
      },
      daily_trend: {
        type: "array",
        items: {
          type: "object",
          required: ["date", "transactions", "gross_sales", "net_sales"],
          properties: {
            date: {
              type: "string",
              example: "2026-10-01",
            },
            transactions: {
              type: "integer",
              example: 5,
            },
            gross_sales: {
              type: "number",
              example: 260000,
            },
            net_sales: {
              type: "number",
              example: 250000,
            },
          },
        },
      },
    },
  },
};
