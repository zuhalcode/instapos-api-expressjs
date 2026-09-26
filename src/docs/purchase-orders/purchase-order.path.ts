import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["PURCHASE ORDER"];

const purchaseOrderIdParameter: OpenAPIV3.ParameterObject = {
  name: "id",
  in: "path",
  required: true,
  description: "Purchase order UUID",
  schema: {
    type: "string",
    format: "uuid",
  },
  example: "69d0c9fa-461b-4e87-97ce-f89ab9277316",
};

const purchaseOrderItemIdParameter: OpenAPIV3.ParameterObject = {
  name: "itemId",
  in: "path",
  required: true,
  description: "Purchase order item UUID",
  schema: {
    type: "string",
    format: "uuid",
  },
  example: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
};

export const purchaseOrderPaths: OpenAPIV3.PathsObject = {
  "/api/purchase-orders": {
    get: {
      tags,
      summary: "Get all purchase orders",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Purchase orders retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase orders retrieved successfully",
                {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/PurchaseOrder",
                  },
                },
              ),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },
      },
    },

    post: {
      tags,
      summary: "Create purchase order",
      description:
        "Create a new purchase order. The purchase order is created with draft status and total 0.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreatePurchaseOrderRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Purchase order created successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                201,
                "Purchase order created successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrder",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Supplier not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Supplier not found"),
            },
          },
        },
      },
    },
  },

  "/api/purchase-orders/{id}": {
    get: {
      tags,
      summary: "Get purchase order by id",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter],

      responses: {
        200: {
          description: "Purchase order retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase order retrieved successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrderDetail",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Purchase order not found"),
            },
          },
        },
      },
    },

    patch: {
      tags,
      summary: "Update purchase order",
      description:
        "Update a purchase order. Only purchase orders with draft status can be updated.",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdatePurchaseOrderRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Purchase order updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase order updated successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrder",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Purchase order not found"),
            },
          },
        },

        409: {
          description: "Purchase order cannot be updated",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Purchase order cannot be updated",
              ),
            },
          },
        },
      },
    },
  },

  "/api/purchase-orders/{id}/complete": {
    patch: {
      tags,
      summary: "Complete purchase order",
      description:
        "Complete a draft purchase order. This updates the purchase order total, increases product stock, updates the latest purchase price, and changes the status to completed atomically.",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter],

      responses: {
        200: {
          description: "Purchase order completed successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase order completed successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrder",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Purchase order not found"),
            },
          },
        },

        409: {
          description:
            "Purchase order cannot be completed from its current state",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Purchase order cannot be completed from its current state",
              ),
            },
          },
        },
      },
    },
  },

  "/api/purchase-orders/{id}/cancel": {
    patch: {
      tags,
      summary: "Cancel purchase order",
      description:
        "Cancel a draft purchase order. A cancelled purchase order cannot be modified or completed.",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter],

      responses: {
        200: {
          description: "Purchase order cancelled successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase order cancelled successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrder",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Purchase order not found"),
            },
          },
        },

        409: {
          description:
            "Purchase order cannot be cancelled from its current state",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Purchase order cannot be cancelled from its current state",
              ),
            },
          },
        },
      },
    },
  },

  "/api/purchase-orders/{id}/items": {
    post: {
      tags,
      summary: "Add item to purchase order",
      description:
        "Add a product to a draft purchase order. The subtotal is calculated by the database.",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreatePurchaseOrderItemRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Purchase order item added successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                201,
                "Purchase order item added successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrderItem",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order or product not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                404,
                "Purchase order or product not found",
              ),
            },
          },
        },

        409: {
          description:
            "Purchase order cannot be modified or product already exists in the purchase order",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Purchase order cannot be modified or product already exists in the purchase order",
              ),
            },
          },
        },
      },
    },
  },

  "/api/purchase-orders/{id}/items/{itemId}": {
    patch: {
      tags,
      summary: "Update purchase order item",
      description:
        "Update quantity or unit price of an item in a draft purchase order.",
      security: [{ bearerAuth: [] }],
      parameters: [purchaseOrderIdParameter, purchaseOrderItemIdParameter],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdatePurchaseOrderItemRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Purchase order item updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Purchase order item updated successfully",
                {
                  $ref: "#/components/schemas/PurchaseOrderItem",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Purchase order item not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Purchase order item not found"),
            },
          },
        },

        409: {
          description: "Purchase order cannot be modified",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Purchase order cannot be modified",
              ),
            },
          },
        },
      },
    },
  },
};
