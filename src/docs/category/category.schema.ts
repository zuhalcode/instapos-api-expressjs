import { OpenAPIV3 } from "openapi-types";

export const categorySchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Category: {
    type: "object",
    required: ["id", "name", "created_at", "updated_at"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "Category UUID.",
        example: "69d0c9fa-461b-4e87-97ce-f89ee8877316",
      },

      name: {
        type: "string",
        description: "Category name.",
        example: "Makanan",
      },
    },
  },

  CreateCategoryRequest: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        description: "Category name.",
        example: "Makanan",
      },
    },
  },

  UpdateCategoryRequest: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        description: "Updated category name.",
        example: "Makanan Ringan",
      },
    },
  },
};
