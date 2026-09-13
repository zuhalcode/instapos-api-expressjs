import { OpenAPIV3 } from "openapi-types";

export const authPaths: OpenAPIV3.PathsObject = {
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
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
        "200": {
          description: "Login successfully",
        },
        "400": {
          description: "Validation error",
        },
        "401": {
          description: "Invalid email or password",
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        "200": {
          description: "Logout successfully",
        },
        "401": {
          description: "Unauthorized",
        },
      },
    },
  },
};
