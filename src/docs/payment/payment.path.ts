import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["PAYMENT"];

export const paymentPaths: OpenAPIV3.PathsObject = {
  "/api/sales/{id}/payment": {
    get: {
      tags,
      summary: "Get sale payment",
      description: "Retrieve the payment associated with a sale.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "saleId",
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
          description: "Payment retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Payment retrieved successfully", {
                $ref: "#/components/schemas/Payment",
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
          description: "Sale or payment not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Sale or payment not found"),
            },
          },
        },
      },
    },

    post: {
      tags,
      summary: "Create sale payment",
      description: "Record a payment for a sale.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "saleId",
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
              $ref: "#/components/schemas/CreatePaymentRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Payment created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Payment created successfully", {
                $ref: "#/components/schemas/Payment",
              }),
            },
          },
        },

        400: {
          description: "Invalid payment request",
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

        409: {
          description: "Payment already exists or payment amount is invalid",
          content: {
            "application/json": {
              schema: errorResponseSchema(
                409,
                "Payment already exists or payment amount is invalid",
              ),
            },
          },
        },
      },
    },
  },
};
