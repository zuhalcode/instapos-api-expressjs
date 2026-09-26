import z from "zod";

export const createPurchaseOrderSchema = z.object({
  supplier_id: z.string().uuid(),
});

export const updatePurchaseOrderSchema = z.object({
  supplier_id: z.string().uuid(),
});

type CreatePurchaseOrderDTO = z.infer<typeof createPurchaseOrderSchema>;
type UpdatePurchaseOrderDTO = z.infer<typeof updatePurchaseOrderSchema>;

export type { CreatePurchaseOrderDTO, UpdatePurchaseOrderDTO };
