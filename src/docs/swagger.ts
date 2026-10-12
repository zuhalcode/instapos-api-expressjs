import { OpenAPIV3 } from "openapi-types";
import { authSchemas } from "./auth/auth.schema";
import { userSchemas } from "./user/user.schema";
import { authPaths } from "./auth/auth.path";
import { userPaths } from "./user/user.path";
import { APP_ENV, AppEnv } from "../libs/env";
import { productSchemas } from "./product/product.schema";
import { productPaths } from "./product/product.path";
import { categorySchemas } from "./category/category.schema";
import { categoryPaths } from "./category/category.path";
import { salePaths } from "./sale/sale.path";
import { saleSchemas } from "./sale/sale.schema";
import { supplierPaths } from "./supplier/supplier.path";
import { supplierSchemas } from "./supplier/supplier.schema";
import { purchaseOrderPaths } from "./purchase-order/purchase-order.path";
import { purchaseOrderSchemas } from "./purchase-order/purchase-orders.schema";
import { dashboardPaths } from "./dashboard/dashboard.path";
import { dashboardSchemas } from "./dashboard/dashboard.schema";
import { reportPaths } from "./report/report.path";
import { reportSchemas } from "./report/report.schema";
import { memberPaths } from "./member/member.path";
import { memberSchemas } from "./member/member.schema";

const servers: Record<AppEnv, OpenAPIV3.ServerObject> = {
  development: { url: "http://localhost:3001", description: "Development" },
  staging: {
    url: "https://instapos-api-staging.vercel.app",
    description: "Staging",
  },
  production: {
    url: "https://instapos-api.vercel.app",
    description: "Production",
  },
};

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "InstaPOS API",
    version: "1.0.0",
    description: "API documentation for InstaPOS",
  },

  servers: [servers[APP_ENV]],

  paths: {
    ...authPaths,
    ...dashboardPaths,
    ...reportPaths,
    ...userPaths,
    ...categoryPaths,
    ...productPaths,
    ...supplierPaths,
    ...purchaseOrderPaths,
    ...salePaths,
    ...memberPaths,
  },

  components: {
    schemas: {
      ...authSchemas,
      ...dashboardSchemas,
      ...reportSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...productSchemas,
      ...supplierSchemas,
      ...purchaseOrderSchemas,
      ...saleSchemas,
      ...memberSchemas,
    },

    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
};
