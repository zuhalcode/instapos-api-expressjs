import z from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  category_id: z.string().uuid(),
  price: z.number().nonnegative(),
  barcode: z.string().trim().max(50).nullable(),
});

export const updateProductSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  category_id: z.string().uuid(),
  price: z.number().nonnegative(),
  barcode: z.string().trim().max(50).nullable(),
  min_stock: z.number().int().nonnegative(),
  is_active: z.boolean(),
});

type CreateProductDTO = z.infer<typeof createProductSchema>;
type UpdateProductDTO = z.infer<typeof updateProductSchema>;

export type { CreateProductDTO, UpdateProductDTO };
