import z from "zod";

export const createSaleSchema = z.object({
  customer_id: z.string().uuid().optional(),

  discount: z.number().nonnegative().default(0),

  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),

  payments: z
    .array(
      z.object({
        method: z.enum(["cash", "qris", "card", "transfer"]),
        amount: z.number().positive(),
      }),
    )
    .min(1),
});

type CreateSaleDTO = z.infer<typeof createSaleSchema>;

export type { CreateSaleDTO };
