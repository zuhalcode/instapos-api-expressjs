import type { OpenAPIV3 } from "openapi-types";

export const responseMetaSchema = {
  type: "object",
  required: ["status", "message"],
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
} satisfies OpenAPIV3.SchemaObject;

export const errorResponseSchema = {
  type: "object",
  required: ["meta", "data"],
  properties: {
    meta: {
      $ref: "#/components/schemas/ResponseMeta",
    },
    data: {
      nullable: true,
      example: null,
    },
  },
} satisfies OpenAPIV3.SchemaObject;
