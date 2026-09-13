import { OpenAPIV3 } from "openapi-types";

export const authDocs: OpenAPIV3.PathsObject = {
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "admin@gmail.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "password123",
                },
              },
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Login successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Login successfully",
                data: {
                  user: {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    email: "admin@gmail.com",
                    role: "owner",
                  },
                  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },

        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Validation error",
                errors: {
                  email: "Email must be a valid email address",
                  password: "Password is required",
                },
              },
            },
          },
        },

        "401": {
          description: "Invalid email or password",
          content: {
            "application/json": {
              example: { success: false, message: "Invalid email or password" },
            },
          },
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "admin@gmail.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "password123",
                },
              },
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
};
