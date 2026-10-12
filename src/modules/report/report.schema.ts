import { z } from "zod";

export const salesReportQuerySchema = z
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
    cashier_id: z.string().uuid().optional(),
  })
  .refine((data) => data.from < data.to, {
    message: "`from` must be before `to`",
    path: ["to"],
  });

export type SalesReportQueryDTO = z.infer<typeof salesReportQuerySchema>;
