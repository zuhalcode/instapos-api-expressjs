import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["PRODUCT"];

export const productPaths: OpenAPIV3.PathsObject = {
  "/api/products": {
    get: {
      tags,
      summary: "Get all products",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Products retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Products retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Product",
                },
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
      },
    },

    post: {
      tags,
      summary: "Create product",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateProductRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Product created successfully", {
                $ref: "#/components/schemas/Product",
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
      },
    },
  },

  "/api/products/{id}": {
    get: {
      tags,
      summary: "Get product by id",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Product UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
        },
      ],

      responses: {
        200: {
          description: "Product retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Product retrieved successfully", {
                $ref: "#/components/schemas/Product",
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
          description: "Not Found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product not found"),
            },
          },
        },
      },
    },

    patch: {
      tags,
      summary: "Update product",
      description: "Update an existing product by UUID.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Product UUID",
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
              $ref: "#/components/schemas/UpdateProductRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Product updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Product updated successfully", {
                $ref: "#/components/schemas/Product",
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
          description: "Not Found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Product not found"),
            },
          },
        },
      },
    },
  },
};
