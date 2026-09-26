import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["CATEGORIES"];

export const categoryPaths: OpenAPIV3.PathsObject = {
  "/api/categories": {
    get: {
      tags,
      summary: "Get all categories",
      description: "Retrieve all product categories.",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Categories retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Categories retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Category",
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
      summary: "Create category",
      description: "Create a new product category.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCategoryRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Category created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Category created successfully", {
                $ref: "#/components/schemas/Category",
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

        409: {
          description: "Category already exists",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Category already exists"),
            },
          },
        },
      },
    },
  },

  "/api/categories/{id}": {
    patch: {
      tags,
      summary: "Update category",
      description: "Update an existing product category.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Category UUID.",
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
              $ref: "#/components/schemas/UpdateCategoryRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Category updated successfully", {
                $ref: "#/components/schemas/Category",
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
          description: "Category not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Category not found"),
            },
          },
        },

        409: {
          description: "Category already exists",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Category already exists"),
            },
          },
        },
      },
    },
  },
};
