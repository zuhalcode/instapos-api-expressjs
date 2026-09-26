import z from "zod";

export const createSupplierSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(100),
  phone_number: z.string().trim().max(20).nullable(),
  address: z.string().trim().nullable(),
});

export const updateSupplierSchema = z.object({
  name: z.string().trim().toLowerCase().min(1).max(100),
  phone_number: z.string().trim().max(20).nullable(),
  address: z.string().trim().nullable(),
});

type CreateSupplierDTO = z.infer<typeof createSupplierSchema>;
type UpdateSupplierDTO = z.infer<typeof updateSupplierSchema>;

export type { CreateSupplierDTO, UpdateSupplierDTO };
