import { Express } from "express";
import swaggerUi from "swagger-ui-express";

import fs from "fs";
import path from "path";
import { swaggerDocument } from "./swagger";

export default function docs(app: Express) {
  const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../node_modules/swagger-ui-dist/swagger-ui.css",
    ),
    "utf-8",
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerDocument,
      {
        customCss: css,
      },
      { defaultModelsExpandDepth: -1 },
    ),
  );
}
