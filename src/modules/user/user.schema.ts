import z from "zod";

export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export const createAuthUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
  role: z.enum(["superuser", "owner", "supervisor", "cashier"]),
});

type CreateAuthUserDTO = z.infer<typeof createAuthUserSchema>;
type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export type { CreateAuthUserDTO, UpdateUserDTO };
