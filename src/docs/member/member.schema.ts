import { OpenAPIV3 } from "openapi-types";

export const memberSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Member: {
    type: "object",
    required: ["id", "code_member", "name", "point", "created_at"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "c1f102b9-b126-4e46-bff9-bf564a154669",
      },
      code_member: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "MEM001",
      },
      name: {
        type: "string",
        maxLength: 100,
        example: "budi santoso",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "081234567801",
      },
      point: {
        type: "integer",
        minimum: 0,
        example: 120,
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-24T02:12:17.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        nullable: true,
        example: "2026-10-12T09:00:00.000Z",
      },
    },
  },

  CreateMemberRequest: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        maxLength: 100,
        example: "siti aminah",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "081234567802",
      },
      code_member: {
        type: "string",
        maxLength: 20,
        description: "Optional. Auto-generated if omitted.",
        example: "MEM006",
      },
      point: {
        type: "integer",
        minimum: 0,
        default: 0,
        example: 0,
      },
    },
  },

  UpdateMemberRequest: {
    type: "object",
    properties: {
      name: {
        type: "string",
        maxLength: 100,
        example: "siti aminah updated",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "081234567899",
      },
      code_member: {
        type: "string",
        maxLength: 20,
        example: "MEM006",
      },
      point: {
        type: "integer",
        minimum: 0,
        example: 50,
      },
    },
  },
};
