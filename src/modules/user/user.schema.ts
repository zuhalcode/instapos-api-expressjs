import z from "zod";

const userRoles = [
  "user",
  "owner",
  "superuser",
  "cashier",
  "supervisor",
  "customer",
] as const;

export const createAuthUserSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
  role: z.enum(userRoles),
});

export const updateUserSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  role: z.enum(userRoles),
});

type CreateAuthUserDTO = z.infer<typeof createAuthUserSchema>;
type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export type { CreateAuthUserDTO, UpdateUserDTO };
