import z from "zod";

export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export const createAuthUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type CreateAuthUserDTO = z.infer<typeof createAuthUserSchema>;

export type { CreateAuthUserDTO };
