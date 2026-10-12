import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["MEMBERS"];

export const memberPaths: OpenAPIV3.PathsObject = {
  "/api/members": {
    get: {
      tags,
      summary: "Get all members",
      description: "Retrieve all members, with optional keyword search.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "search",
          in: "query",
          required: false,
          description: "Search keyword matching name, phone number, or member code.",
          schema: {
            type: "string",
          },
          example: "budi",
        },
      ],

      responses: {
        200: {
          description: "Members retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Members retrieved successfully", {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Member",
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
      summary: "Create member",
      description: "Register a new store member/customer.",
      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateMemberRequest",
            },
            example: {
              name: "siti aminah",
              phone_number: "081234567802",
              code_member: "MEM006",
              point: 0,
            },
          },
        },
      },

      responses: {
        201: {
          description: "Member created successfully",
          content: {
            "application/json": {
              schema: responseSchema(201, "Member created successfully", {
                $ref: "#/components/schemas/Member",
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
          description: "Member code already exists",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Resource already exists"),
            },
          },
        },
      },
    },
  },

  "/api/members/{id}": {
    get: {
      tags,
      summary: "Get member by ID",
      description: "Retrieve a single member by their UUID.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Member UUID.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "c1f102b9-b126-4e46-bff9-bf564a154669",
        },
      ],

      responses: {
        200: {
          description: "Member retrieved successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Member retrieved successfully", {
                $ref: "#/components/schemas/Member",
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
          description: "Member not found",
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
      summary: "Update member",
      description: "Update member details.",
      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Member UUID.",
          schema: {
            type: "string",
            format: "uuid",
          },
          example: "c1f102b9-b126-4e46-bff9-bf564a154669",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateMemberRequest",
            },
            example: {
              name: "siti aminah updated",
              phone_number: "081234567899",
              point: 50,
            },
          },
        },
      },

      responses: {
        200: {
          description: "Member updated successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Member updated successfully", {
                $ref: "#/components/schemas/Member",
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
          description: "Member not found",
          content: {
            "application/json": {
              schema: errorResponseSchema(404, "Data not found"),
            },
          },
        },

        409: {
          description: "Member code conflict",
          content: {
            "application/json": {
              schema: errorResponseSchema(409, "Resource already exists"),
            },
          },
        },
      },
    },
  },
};
