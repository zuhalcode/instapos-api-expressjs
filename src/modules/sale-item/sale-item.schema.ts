import z from "zod";

export const saleItemIdSchema = z.object({
  id: z.string().uuid(),
});

export const createSaleItemSchema = z.object({
  sale_id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().nonnegative(),
  unit_price: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
});

export const updateSaleItemSchema = z.object({
  sale_id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().nonnegative(),
  unit_price: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
});

type CreateSaleItemDTO = z.infer<typeof createSaleItemSchema>;
type UpdateSaleItemDTO = z.infer<typeof updateSaleItemSchema>;

export type { CreateSaleItemDTO, UpdateSaleItemDTO };
