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

    post: {
      tags,
      summary: "Create Auth User",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateAuthUserRequest",
            },
          },
        },
      },

      responses: {
        201: {
          description: "Authenticated user created successfully",
          content: {
            "application/json": {
              schema: responseSchema(
                201,
                "Authenticated user created successfully",
                {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              ),
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
    get: {
      tags,
      summary: "Get user by id",
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
          example: "45863156-7d72-48d0-8934-1f52721e6120",
        },
      ],

      responses: {
        200: {
          description: "User retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "User retrieved successfully", {
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

    patch: {
      tags,
      summary: "Update user",
      description: "Update an existing user by UUID.",
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
          example: "45863156-7d72-48d0-8934-1f52721e6120",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateUserRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "User updated successfully", {
                $ref: "#/components/schemas/User",
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
              schema: errorResponseSchema(404, "Data not found"),
            },
          },
        },
      },
    },
  },
};
