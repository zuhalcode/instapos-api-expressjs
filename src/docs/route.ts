import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";

export default function docs(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl: "/swagger-ui/swagger-ui.css",
      customJs: [
        "/swagger-ui/swagger-ui-bundle.js",
        "/swagger-ui/swagger-ui-standalone-preset.js",
      ],
    }),
  );
}
