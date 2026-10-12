import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["REPORT"];

export const reportPaths: OpenAPIV3.PathsObject = {
  "/api/report/sales": {
    get: {
      tags,
      summary: "Get sales report",
      description:
        "Retrieve aggregated financial sales statistics for a specified date period (gross sales, discounts, net revenue, items sold, payment breakdown, cashier performance, daily trend).",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "from",
          in: "query",
          required: true,
          description: "Start date of the reporting period. Inclusive. Format: YYYY-MM-DD.",
          schema: {
            type: "string",
            format: "date",
          },
          example: "2026-10-01",
        },
        {
          name: "to",
          in: "query",
          required: true,
          description: "End date of the reporting period. Exclusive. Format: YYYY-MM-DD.",
          schema: {
            type: "string",
            format: "date",
          },
          example: "2026-10-08",
        },
        {
          name: "cashier_id",
          in: "query",
          required: false,
          description: "Optional cashier UUID filter.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "550e8400-e29b-41d4-a716-446655440000",
        },
      ],

      responses: {
        200: {
          description: "Sales report retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Sales report retrieved successfully",
                {
                  $ref: "#/components/schemas/SalesReport",
                },
              ),
            },
          },
        },

        400: {
          description: "Invalid request (invalid date format or from >= to)",
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
      },
    },
  },
};
