import z from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  category_id: z.string().uuid(),
  price: z.number().nonnegative(),
});

export const updateProductSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  category_id: z.string().uuid(),
  price: z.number().nonnegative(),
});

type CreateProductDTO = z.infer<typeof createProductSchema>;
type UpdateProductDTO = z.infer<typeof updateProductSchema>;

export type { CreateProductDTO, UpdateProductDTO };
