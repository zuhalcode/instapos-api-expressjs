import z from "zod";

export const createMemberSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(100),
  phone_number: z.string().trim().max(20).nullable().optional(),
  code_member: z.string().trim().max(20).optional(),
  point: z.number().int().nonnegative().optional(),
});

export const updateMemberSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(100).optional(),
  phone_number: z.string().trim().max(20).nullable().optional(),
  code_member: z.string().trim().max(20).optional(),
  point: z.number().int().nonnegative().optional(),
});

export const memberQuerySchema = z.object({
  search: z.string().trim().optional(),
});

type CreateMemberDTO = z.infer<typeof createMemberSchema>;
type UpdateMemberDTO = z.infer<typeof updateMemberSchema>;
type MemberQueryDTO = z.infer<typeof memberQuerySchema>;

export type { CreateMemberDTO, UpdateMemberDTO, MemberQueryDTO };
