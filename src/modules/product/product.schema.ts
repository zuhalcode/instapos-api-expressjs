import z from "zod";

export const productIdSchema = z.object({
  id: z.string().uuid(),
});

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1),
  role: z.enum(["superuser", "owner", "supervisor", "cashier"]),
});

type CreateProductDTO = z.infer<typeof createProductSchema>;
type UpdateProductDTO = z.infer<typeof updateProductSchema>;

export type { CreateProductDTO, UpdateProductDTO };
