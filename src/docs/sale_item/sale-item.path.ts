import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["SALE_ITEM"];

export const saleItemPaths: OpenAPIV3.PathsObject = {
  "/api/sale-items": {
    get: {
      tags,
      summary: "Get all sale items",
      description: "Retrieve all sale items.",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Sale items retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Sale items retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/SaleItem",
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
  },

  "/api/sale-items/{id}": {
    get: {
      tags,
      summary: "Get sale item",
      description: "Retrieve a sale item by ID.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Sale item UUID.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "c7f1b9a2-9e4d-4d2e-8b2d-1b7f4c9e1234",
        },
      ],

      responses: {
        200: {
          description: "Sale item retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Sale item retrieved successfully", {
                $ref: "#/components/schemas/SaleItem",
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
          description: "Sale item not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Sale item not found"),
            },
          },
        },
      },
    },
  },
};
