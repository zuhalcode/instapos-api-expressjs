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
      description: "Retrieve all sales with their sale items.",
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
      description: "Create a new sale transaction.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateSaleRequest",
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
          description: "Product not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product not found"),
            },
          },
        },

        409: {
          description: "Insufficient stock",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Insufficient stock"),
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
      description: "Retrieve a sale by ID with its sale items.",
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
  },
};
