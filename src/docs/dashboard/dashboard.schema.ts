import type { OpenAPIV3 } from "openapi-types";

export const dashboardSchemas: OpenAPIV3.ComponentsObject = {
  schemas: {
    DashboardPeriod: {
      type: "object",
      required: ["from", "to"],
      properties: {
        from: {
          type: "string",
          format: "date",
          example: "2026-10-01",
        },
        to: {
          type: "string",
          format: "date",
          example: "2026-10-08",
        },
      },
    },

    DashboardSummary: {
      type: "object",
      required: [
        "revenue",
        "transaction_count",
        "average_transaction_value",
        "items_sold",
      ],
      properties: {
        revenue: {
          type: "number",
          format: "double",
          example: 125000000,
        },
        transaction_count: {
          type: "integer",
          example: 342,
        },
        average_transaction_value: {
          type: "number",
          format: "double",
          example: 365497,
        },
        items_sold: {
          type: "integer",
          example: 817,
        },
      },
    },

    DashboardPaymentMethod: {
      type: "object",
      required: ["method", "transactions", "revenue", "percentage"],
      properties: {
        method: {
          type: "string",
          enum: ["cash", "qris", "card", "transfer"],
          example: "cash",
        },
        transactions: {
          type: "integer",
          example: 180,
        },
        revenue: {
          type: "number",
          format: "double",
          example: 65000000,
        },
        percentage: {
          type: "number",
          format: "double",
          example: 52.63,
        },
      },
    },

    DashboardTopProduct: {
      type: "object",
      required: ["product_id", "product_name", "quantity", "revenue"],
      properties: {
        product_id: {
          type: "string",
          format: "uuid",
        },
        product_name: {
          type: "string",
          example: "Produk A",
        },
        quantity: {
          type: "integer",
          example: 120,
        },
        revenue: {
          type: "number",
          format: "double",
          example: 24000000,
        },
      },
    },

    DashboardSalesTrend: {
      type: "object",
      required: ["date", "transactions", "revenue"],
      properties: {
        date: {
          type: "string",
          format: "date",
          example: "2026-10-01",
        },
        transactions: {
          type: "integer",
          example: 32,
        },
        revenue: {
          type: "number",
          format: "double",
          example: 12500000,
        },
      },
    },

    DashboardSalePayment: {
      type: "object",
      required: ["method", "amount"],
      properties: {
        method: {
          type: "string",
          enum: ["cash", "qris", "card", "transfer"],
          example: "cash",
        },
        amount: {
          type: "number",
          format: "double",
          example: 250000,
        },
      },
    },

    DashboardRecentSale: {
      type: "object",
      required: [
        "id",
        "invoice_number",
        "cashier_name",
        "total",
        "payments",
        "created_at",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        invoice_number: {
          type: "string",
          example: "INV-20261006-001",
        },
        cashier_name: {
          type: "string",
          example: "Zuhal",
        },
        total: {
          type: "number",
          format: "double",
          example: 450000,
        },
        payments: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DashboardSalePayment",
          },
        },
        created_at: {
          type: "string",
          format: "date-time",
          example: "2026-10-06T09:31:00+07:00",
        },
      },
    },

    DashboardStats: {
      type: "object",
      required: [
        "period",
        "summary",
        "payment_methods",
        "top_products",
        "sales_trend",
        "recent_sales",
      ],
      properties: {
        period: {
          $ref: "#/components/schemas/DashboardPeriod",
        },

        summary: {
          $ref: "#/components/schemas/DashboardSummary",
        },

        payment_methods: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DashboardPaymentMethod",
          },
        },

        top_products: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DashboardTopProduct",
          },
        },

        sales_trend: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DashboardSalesTrend",
          },
        },

        recent_sales: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DashboardRecentSale",
          },
        },
      },
    },
  },
};
