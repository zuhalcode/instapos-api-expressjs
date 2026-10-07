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

export const dashboardResponseSchema = (
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  description: string,
): OpenAPIV3.ResponseObject => ({
  description,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["success", "message", "data"],
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: description,
          },
          data: schema,
        },
      },
    },
  },
});

export const dashboardErrorResponseSchema = (
  description: string,
): OpenAPIV3.ResponseObject => ({
  description,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["success", "message"],
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: description,
          },
        },
      },
    },
  },
});
