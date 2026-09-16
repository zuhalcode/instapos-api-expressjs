import express from "express";
import type { Express } from "express";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";
import { swaggerUiOptions, swaggerUiPath } from "./swagger-ui";

export default function docs(app: Express) {
  app.use("/swagger-ui", express.static(swaggerUiPath));
}
