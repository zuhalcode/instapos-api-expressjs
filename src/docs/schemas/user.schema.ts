import { OpenAPIV3 } from "openapi-types";

export const UserSchema: OpenAPIV3.SchemaObject = {
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
      enum: ["owner", "admin", "staff", "viewer"],
      example: "owner",
    },
  },
};
