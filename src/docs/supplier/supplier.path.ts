import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["SUPPLIER"];

export const supplierPaths: OpenAPIV3.PathsObject = {
  "/api/suppliers": {
    get: {
      tags,
      summary: "Get all suppliers",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Suppliers retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Suppliers retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Supplier",
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
      summary: "Create supplier",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateSupplierRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Supplier created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Supplier created successfully", {
                $ref: "#/components/schemas/Supplier",
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

  "/api/suppliers/{id}": {
    get: {
      tags,
      summary: "Get supplier by id",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Supplier UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "45863156-7d72-48d0-8934-1f52721e6120",
        },
      ],

      responses: {
        200: {
          description: "Supplier retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Supplier retrieved successfully", {
                $ref: "#/components/schemas/Supplier",
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

        403: {
          description: "Insufficient privileges",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient privileges"),
            },
          },
        },

        404: {
          description: "Data not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Data not found"),
            },
          },
        },
      },
    },

    patch: {
      tags,
      summary: "Update supplier",
      description: "Update an existing supplier by UUID.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Supplier UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "45863156-7d72-48d0-8934-1f52721e6120",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateSupplierRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Supplier updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Supplier updated successfully", {
                $ref: "#/components/schemas/Supplier",
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
          description: "Data not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Data not found"),
            },
          },
        },
      },
    },
  },
};
