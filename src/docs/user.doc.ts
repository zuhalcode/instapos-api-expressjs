// docs/user.doc.ts

export const userPaths = {
  "/api/users": {
    get: {
      tags: ["Users"],
      summary: "Get all users",

      responses: {
        200: {
          description: "Data Retrieved Successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  meta: {
                    type: "object",
                    properties: {
                      status: {
                        type: "integer",
                        example: 200,
                      },
                      message: {
                        type: "string",
                        example: "Data Retrieved Successfully",
                      },
                    },
                  },

                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          format: "uuid",
                          example: "69c0c9fa-471b-4e87-97ce-f89ee8877316",
                        },
                        name: {
                          type: "string",
                          example: "zuhal",
                        },
                        email: {
                          type: "string",
                          format: "email",
                          example: "zuhalcode@gmail.com",
                        },
                        role: {
                          type: "string",
                          example: "owner",
                          enum: ["owner", "admin", "staff", "viewer"],
                        },
                      },
                    },
                  },
                },
              },

              example: {
                meta: {
                  status: 200,
                  message: "Data Retrieved Successfully",
                },
                data: [
                  {
                    id: "69c0c9fa-471b-4e87-97ce-f89ee8877316",
                    name: "zuhal",
                    email: "zuhalcode@gmail.com",
                    role: "owner",
                  },
                ],
              },
            },
          },
        },

        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};
