import z from "zod";

export const saleIdSchema = z.object({
  id: z.string().uuid(),
});

export const createSaleSchema = z.object({
  invoice_number: z.string().min(1),
  total: z.number().nonnegative(),
});

export const updateSaleSchema = z.object({
  invoice_number: z.string().min(1),
  total: z.number().nonnegative(),
});

type CreateSaleDTO = z.infer<typeof createSaleSchema>;
type UpdateSaleDTO = z.infer<typeof updateSaleSchema>;

export type { CreateSaleDTO, UpdateSaleDTO };
