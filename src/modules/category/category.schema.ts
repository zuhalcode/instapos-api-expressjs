import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1),
});

type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;

export type { CreateCategoryDTO, UpdateCategoryDTO };
