import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["USER"];

export const userPaths: OpenAPIV3.PathsObject = {
  "/api/users": {
    get: {
      tags,
      summary: "Get all users",
      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Users retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Users retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              }),
            },
          },
        },

        400: {
          description: "Invalid Request",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema(),
            },
          },
        },

        403: {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: errorResponseSchema(403, "Insufficient priviledges"),
            },
          },
        },

        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Requested resource not found"),
            },
          },
        },
      },
    },
  },

  "/api/users/{id}": {
    delete: {
      tags,
      summary: "Delete user",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "User UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "69c0c9fa-471b-4e87-97ce-f89ee8877316",
        },
      ],

      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "User deleted successfully", {
                nullable: true,
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
          description: "Not Found",
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
