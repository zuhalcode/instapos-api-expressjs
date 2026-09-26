import { OpenAPIV3 } from "openapi-types";

export const supplierSchemas: OpenAPIV3.ComponentsObject["schemas"] = {
  Supplier: {
    type: "object",
    required: ["id", "code", "name", "phone_number", "address", "created_at"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "69d0c9fa-461b-4e87-97ce-f89gh9277316",
      },
      code: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "SUP001",
      },
      name: {
        type: "string",
        maxLength: 100,
        nullable: true,
        example: "PT Sumber Makmur",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        nullable: true,
        example: "081234567890",
      },
      address: {
        type: "string",
        nullable: true,
        example: "Jl. Raya Gresik No. 10",
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2026-09-26T03:00:00.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        nullable: true,
        example: "2026-09-26T03:00:00.000Z",
      },
    },
  },

  CreateSupplierRequest: {
    type: "object",
    required: ["name"],
    properties: {
      code: {
        type: "string",
        maxLength: 20,
        example: "SUP001",
      },
      name: {
        type: "string",
        maxLength: 100,
        example: "PT Sumber Makmur",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        example: "081234567890",
      },
      address: {
        type: "string",
        example: "Jl. Raya Gresik No. 10",
      },
    },
  },

  UpdateSupplierRequest: {
    type: "object",
    properties: {
      code: {
        type: "string",
        maxLength: 20,
        example: "SUP001",
      },
      name: {
        type: "string",
        maxLength: 100,
        example: "PT Sumber Makmur",
      },
      phone_number: {
        type: "string",
        maxLength: 20,
        example: "081234567890",
      },
      address: {
        type: "string",
        example: "Jl. Raya Gresik No. 10",
      },
    },
    minProperties: 1,
  },
};
