import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["SALES"];

export const salePaths: OpenAPIV3.PathsObject = {
  "/api/sales": {
    get: {
      tags,
      summary: "Get all sales",
      description: "Retrieve all sales with their sale items and payments.",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Sales retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Sales retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Sale",
                },
              }),
            },
          },
        },

        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Unauthorized"),
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
      summary: "Create sale",
      description:
        "Create a completed sale transaction. Invoice number, prices, subtotal, total, cashier, and status are generated or calculated by the server.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateSaleRequest",
            },
            examples: {
              memberCustomer: {
                summary: "Sale for a registered member",
                description: "Create a sale associated with a member customer.",
                value: {
                  customer_id: "3d69b584-730d-4bf9-b5ae-7aecea1f4013",
                  items: [
                    {
                      product_id: "5b8f3c21-7a6e-4d91-b2f8-8c3e1a456789",
                      quantity: 2,
                    },
                  ],
                  payments: [
                    {
                      method: "cash",
                      amount: 100000,
                    },
                  ],
                },
              },

              nonMemberCustomer: {
                summary: "Sale for a non-member customer",
                description:
                  "Create a sale associated with a non-member customer.",
                value: {
                  items: [
                    {
                      product_id: "5b8f3c21-7a6e-4d91-b2f8-8c3e1a456789",
                      quantity: 2,
                    },
                  ],
                  payments: [
                    {
                      method: "cash",
                      amount: 100000,
                    },
                  ],
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Sale created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Sale created successfully", {
                $ref: "#/components/schemas/Sale",
              }),
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

        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Unauthorized"),
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
          description: "Product or customer not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product or customer not found"),
            },
          },
        },

        409: {
          description: "Insufficient stock or payment conflict",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Insufficient stock or payment conflict",
              ),
            },
          },
        },
      },
    },
  },

  "/api/sales/{id}": {
    get: {
      tags,
      summary: "Get sale",
      description: "Retrieve a sale by ID with its sale items and payments.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Sale UUID.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
        },
      ],

      responses: {
        200: {
          description: "Sale retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Sale retrieved successfully", {
                $ref: "#/components/schemas/Sale",
              }),
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

        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Unauthorized"),
            },
          },
        },

        404: {
          description: "Sale not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Sale not found"),
            },
          },
        },
      },
    },

    patch: {
      tags,
      summary: "Update sale",
      description:
        "Update sale details such as associating or disassociating a customer. Omit customer_id to preserve existing, provide a UUID to associate, or provide null to remove customer association.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Sale UUID.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateSaleRequest",
            },
            example: {
              customer_id: null,
            },
          },
        },
      },

      responses: {
        200: {
          description: "Sale updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Sale updated successfully", {
                $ref: "#/components/schemas/Sale",
              }),
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

        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Unauthorized"),
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
          description: "Sale not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Sale not found"),
            },
          },
        },

        409: {
          description: "Referenced customer does not exist",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Referenced resource does not exist",
              ),
            },
          },
        },
      },
    },
  },
};
