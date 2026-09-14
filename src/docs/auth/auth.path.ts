import { OpenAPIV3 } from "openapi-types";
import {
  errorResponseSchema,
  responseSchema,
  validationErrorResponseSchema,
} from "../common.schema";

const tags = ["AUTH"];

export const authPaths: OpenAPIV3.PathsObject = {
  "/api/auth/login": {
    post: {
      tags,
      summary: "Login user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Login successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Login successfully", {
                $ref: "#/components/schemas/LoginResponse",
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
          description: "Invalid email or password",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Invalid email or password"),
            },
          },
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      tags,
      summary: "Logout user",

      security: [{ bearerAuth: [] }],

      responses: {
        200: {
          description: "Logout successfully",
          content: {
            "application/json": {
              schema: responseSchema(200, "Logout successfully", {
                nullable: true,
              }),
            },
          },
        },

        401: {
          description: "Invalid email or password",
          content: {
            "application/json": {
              schema: errorResponseSchema(401, "Invalid email or password"),
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
