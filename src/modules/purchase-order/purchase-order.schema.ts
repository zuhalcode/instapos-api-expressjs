import z from "zod";

export const createPurchaseOrderSchema = z.object({
  supplier_id: z.string().uuid(),
});

export const updatePurchaseOrderSchema = z.object({
  supplier_id: z.string().uuid(),
});

export const createPurchaseOrderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  unit_price: z.number().nonnegative(),
});

export const updatePurchaseOrderItemSchema = z
  .object({
    quantity: z.number().int().positive().optional(),
    unit_price: z.number().nonnegative().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

type CreatePurchaseOrderDTO = z.infer<typeof createPurchaseOrderSchema>;
type UpdatePurchaseOrderDTO = z.infer<typeof updatePurchaseOrderSchema>;
type CreatePurchaseOrderItemDTO = z.infer<typeof createPurchaseOrderItemSchema>;
type UpdatePurchaseOrderItemDTO = z.infer<typeof updatePurchaseOrderItemSchema>;

export type {
  CreatePurchaseOrderDTO,
  UpdatePurchaseOrderDTO,
  CreatePurchaseOrderItemDTO,
  UpdatePurchaseOrderItemDTO,
};
