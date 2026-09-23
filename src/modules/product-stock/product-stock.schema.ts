import z from "zod";

export const productStockIdSchema = z.object({
  productId: z.string().uuid(),
  location: z.enum(["warehouse", "display"]),
});

export const createProductStockSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().nonnegative(),
  location: z.enum(["warehouse", "display"]),
});

export const updateProductStockSchema = z.object({
  quantity: z.number().int().nonnegative(),
});

type CreateProductStockDTO = z.infer<typeof createProductStockSchema>;
type UpdateProductStockDTO = z.infer<typeof updateProductStockSchema>;

export type { CreateProductStockDTO, UpdateProductStockDTO };
