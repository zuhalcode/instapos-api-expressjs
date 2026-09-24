import z from "zod";

export const paymentIdSchema = z.object({
  id: z.string().uuid(),
});

export const saleIdSchema = z.object({
  saleId: z.string().uuid(),
});

export const createPaymentSchema = z.object({
  sale_id: z.string().uuid(),
  method: z.enum(["cash", "qris", "card", "transfer"]),
  amount: z.number().nonnegative(),
  paid_amount: z.number().nonnegative(),
});

export const updatePaymentSchema = z
  .object({
    method: z.enum(["cash", "qris", "card", "transfer"]).optional(),
    paid_amount: z.number().nonnegative().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentDTO = z.infer<typeof updatePaymentSchema>;
