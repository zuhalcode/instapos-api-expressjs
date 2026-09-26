export const ROLES = {
  SUPERUSER: "superuser",
  OWNER: "owner",
  SUPERVISOR: "supervisor",
  CASHIER: "cashier",
  USER: "user",
  CUSTOMER: "customer",
} as const;

export const TABLES = {
  USERS: "users",
  CATEGORIES: "categories",
  PRODUCTS: "products",
  SUPPLIERS: "suppliers",
  PURCHASE_ORDERS: "purchase_orders",
  PURCHASE_ORDER_ITEMS: "purchase_order_items",
  SALES: "sales",
  SALE_ITEMS: "sale_items",
  PAYMENTS: "payments",
} as const;
