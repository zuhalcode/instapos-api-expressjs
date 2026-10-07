import type { OpenAPIV3 } from "openapi-types";

import {
  dashboardResponseSchema,
  dashboardErrorResponseSchema,
} from "../common.schema";

const tags = ["DASHBOARD"];

export const dashboardPaths = {
  "/api/dashboard/stats": {
    get: {
      tags,

      summary: "Get dashboard statistics",

      description:
        "Returns aggregated sales statistics for the specified reporting period. Only completed sales are included.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "from",
          in: "query",
          required: true,
          description:
            "Start date of the reporting period. Inclusive. Format: YYYY-MM-DD.",
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
          description:
            "End date of the reporting period. Exclusive. Format: YYYY-MM-DD.",
          schema: {
            type: "string",
            format: "date",
          },
          example: "2026-10-08",
        },
      ],

      responses: {
        200: dashboardResponseSchema(
          {
            $ref: "#/components/schemas/DashboardStats",
          },
          "Dashboard statistics fetched successfully",
        ),

        401: dashboardErrorResponseSchema("Unauthorized"),

        403: dashboardErrorResponseSchema("Insufficient privileges"),

        500: dashboardErrorResponseSchema("Internal server error"),
      },
    },
  },
} satisfies OpenAPIV3.PathsObject;
