import { OpenAPIV3 } from "openapi-types";

type Schema = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;

export const responseSchema = (
  status: number,
  message: string,
  data: Schema,
): OpenAPIV3.SchemaObject => ({
  type: "object",
  required: ["meta", "data"],
  properties: {
    meta: {
      type: "object",
      required: ["status", "message"],
      properties: {
        status: {
          type: "integer",
          example: status,
        },
        message: {
          type: "string",
          example: message,
        },
      },
    },
    data,
  },
});

export const errorResponseSchema = (
  status: number,
  message: string,
): OpenAPIV3.SchemaObject =>
  responseSchema(status, message, {
    nullable: true,
  });

export const validationErrorResponseSchema = (): OpenAPIV3.SchemaObject =>
  responseSchema(400, "Invalid Request", {
    type: "array",
    items: {
      type: "object",
    },
    example: [{}],
  });
