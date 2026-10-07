import { z } from "zod";

const paymentMethodSchema = z.enum(["cash", "qris", "card", "transfer"]);

export const dashboardStatsQuerySchema = z
  .object({
    from: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "from must be a valid date in YYYY-MM-DD format",
      ),

    to: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "to must be a valid date in YYYY-MM-DD format",
      ),
  })
  .refine((data) => data.from < data.to, {
    message: "`from` must be before `to`",
    path: ["to"],
  });

export const dashboardStatsSchema = z.object({
  period: z.object({
    from: z.string(),
    to: z.string(),
  }),

  summary: z.object({
    revenue: z.number(),
    transaction_count: z.number(),
    average_transaction_value: z.number(),
    items_sold: z.number(),
  }),

  payment_methods: z.array(
    z.object({
      method: paymentMethodSchema,
      transactions: z.number(),
      revenue: z.number(),
      percentage: z.number(),
    }),
  ),

  top_products: z.array(
    z.object({
      product_id: z.string().uuid(),
      product_name: z.string(),
      quantity: z.number(),
      revenue: z.number(),
    }),
  ),

  sales_trend: z.array(
    z.object({
      date: z.string(),
      transactions: z.number(),
      revenue: z.number(),
    }),
  ),

  recent_sales: z.array(
    z.object({
      id: z.string().uuid(),
      invoice_number: z.string(),
      cashier_name: z.string(),
      total: z.number(),

      payments: z.array(
        z.object({
          method: paymentMethodSchema,
          amount: z.number(),
        }),
      ),

      created_at: z.string().datetime(),
    }),
  ),
});

export type DashboardStatsQuery = z.infer<typeof dashboardStatsQuerySchema>;

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
