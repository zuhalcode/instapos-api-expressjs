import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { corsMiddleware } from "./configs/cors";
import { swaggerUiPath } from "./docs/swagger-ui";

import swaggerDocument from "./docs/swagger_output.json";
import docs from "./docs/route";

const app = express();

// Swagger UI static assets
app.use("/swagger-ui", express.static(swaggerUiPath));

// Swagger documentation
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "/swagger-ui/swagger-ui.css",
    customJs: [
      "/swagger-ui/swagger-ui-bundle.js",
      "/swagger-ui/swagger-ui-standalone-preset.js",
    ],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

// Swagger
docs(app);

app.get("/", (req, res) => {
  /**
   * #swagger.ignore = true
   */
  res.status(200).json({
    message: "Server is running",
    data: null,
  });
});

app.use("/api", apiRouter);

export default app;
