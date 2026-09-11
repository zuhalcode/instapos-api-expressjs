export const productSelect = {
  owner: "*",
  admin: "*",
  viewer: "*",
  staff:
    "id, code, gold_type_id, name, description, weight, status, created_at",
} as const;
