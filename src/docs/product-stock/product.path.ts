import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["PRODUCT_STOCK"];

export const productStockPaths: OpenAPIV3.PathsObject = {
  "/api/product-stocks": {
    get: {
      tags,
      summary: "Get all product stocks",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Product stocks retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Product stocks retrieved successfully",
                {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProductStock",
                  },
                },
              ),
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
      summary: "Create product stock",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateProductStockRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Product stock created successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                201,
                "Product stock created successfully",
                {
                  $ref: "#/components/schemas/ProductStock",
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
          description: "Product stock already exists",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Product stock already exists"),
            },
          },
        },
      },
    },
  },

  "/api/product-stocks/{productId}/{location}": {
    get: {
      tags,
      summary: "Get product stock",
      description: "Retrieve stock for a product at a specific location.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          description: "Product UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
        },
        {
          name: "location",
          in: "path",
          required: true,
          description: "Stock location",
          schema: {
            $ref: "#/components/schemas/ProductStockLocation",
          },
          example: "warehouse",
        },
      ],

      responses: {
        200: {
          description: "Product stock retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Product stock retrieved successfully",
                {
                  $ref: "#/components/schemas/ProductStock",
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

        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Unauthorized"),
            },
          },
        },

        404: {
          description: "Product stock not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product stock not found"),
            },
          },
        },
      },
    },

    patch: {
      tags,
      summary: "Update product stock",
      description: "Update the quantity of a product at a specific location.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "productId",
          in: "path",
          required: true,
          description: "Product UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
        },
        {
          name: "location",
          in: "path",
          required: true,
          description: "Stock location",
          schema: {
            $ref: "#/components/schemas/ProductStockLocation",
          },
          example: "warehouse",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateProductStockRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Product stock updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                200,
                "Product stock updated successfully",
                {
                  $ref: "#/components/schemas/ProductStock",
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
          description: "Product stock not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product stock not found"),
            },
          },
        },
      },
    },
  },
};
