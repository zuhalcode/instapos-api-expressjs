import z from "zod";

export const createSaleSchema = z.object({
  customer_id: z.string().uuid().optional(),

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

export const updateSaleSchema = z.object({
  customer_id: z.string().uuid().nullable().optional(),
});

type CreateSaleDTO = z.infer<typeof createSaleSchema>;
type UpdateSaleDTO = z.infer<typeof updateSaleSchema>;

export type { CreateSaleDTO, UpdateSaleDTO };
