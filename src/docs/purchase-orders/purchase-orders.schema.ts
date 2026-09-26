import { OpenAPIV3 } from "openapi-types";

export const purchaseOrderSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  PurchaseOrderStatus: {
    type: "string",
    enum: ["draft", "completed", "cancelled"],
    example: "draft",
  },

  PurchaseOrderItem: {
    type: "object",
    required: [
      "id",
      "purchase_order_id",
      "product_id",
      "quantity",
      "unit_price",
      "subtotal",
      "created_at",
    ],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      },
      purchase_order_id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89gh9277316",
      },
      product_id: {
        type: "string",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
      },
      quantity: {
        type: "integer",
        minimum: 1,
        example: 20,
      },
      unit_price: {
        type: "number",
        format: "double",
        minimum: 0,
        example: 12000,
      },
      subtotal: {
        type: "number",
        format: "double",
        minimum: 0,
        readOnly: true,
        example: 240000,
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-26T03:00:00.000Z",
      },
    },
  },

  CreatePurchaseOrderItemRequest: {
    type: "object",
    required: ["product_id", "quantity", "unit_price"],
    properties: {
      product_id: {
        type: "string",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
      },
      quantity: {
        type: "integer",
        minimum: 1,
        example: 20,
      },
      unit_price: {
        type: "number",
        format: "double",
        minimum: 0,
        example: 12000,
      },
    },
  },

  UpdatePurchaseOrderItemRequest: {
    type: "object",
    properties: {
      quantity: {
        type: "integer",
        minimum: 1,
        example: 25,
      },
      unit_price: {
        type: "number",
        format: "double",
        minimum: 0,
        example: 12500,
      },
    },
    minProperties: 1,
  },

  PurchaseOrder: {
    type: "object",
    required: [
      "id",
      "po_number",
      "supplier_id",
      "status",
      "total",
      "created_at",
      "updated_at",
    ],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89gh9277316",
      },
      po_number: {
        type: "string",
        maxLength: 50,
        readOnly: true,
        example: "PO000001",
      },
      supplier_id: {
        type: "string",
        format: "uuid",
        example: "45863156-7d72-48d0-8934-1f52721e6120",
      },
      status: {
        $ref: "#/components/schemas/PurchaseOrderStatus",
      },
      total: {
        type: "number",
        format: "double",
        minimum: 0,
        readOnly: true,
        example: 500000,
      },
      ordered_at: {
        type: "string",
        format: "date-time",
        nullable: true,
        readOnly: true,
        example: "2026-09-26T03:00:00.000Z",
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-26T03:00:00.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-26T03:00:00.000Z",
      },
    },
  },

  PurchaseOrderDetail: {
    allOf: [
      {
        $ref: "#/components/schemas/PurchaseOrder",
      },
      {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PurchaseOrderItem",
            },
          },
        },
      },
    ],
  },

  CreatePurchaseOrderRequest: {
    type: "object",
    required: ["supplier_id"],
    properties: {
      supplier_id: {
        type: "string",
        format: "uuid",
        example: "45863156-7d72-48d0-8934-1f52721e6120",
      },
    },
  },

  UpdatePurchaseOrderRequest: {
    type: "object",
    properties: {
      supplier_id: {
        type: "string",
        format: "uuid",
        example: "45863156-7d72-48d0-8934-1f52721e6120",
      },
    },
    minProperties: 1,
  },
};
