import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerUiDist from "swagger-ui-dist";
import path from "node:path";
import fs from "node:fs";

import { corsMiddleware } from "./configs/cors";
import { swaggerDocument } from "./docs/swagger";

const app = express();

// Swagger UI static assets
const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

app.use("/swagger-ui", express.static(swaggerUiPath));

app.get("/swagger-ui/swagger-ui.css", (_, res) => {
  res
    .type("text/css")
    .send(fs.readFileSync(path.join(swaggerUiPath, "swagger-ui.css"), "utf8"));
});

app.get("/swagger-ui/swagger-ui-bundle.js", (_, res) => {
  res
    .type("application/javascript")
    .send(
      fs.readFileSync(path.join(swaggerUiPath, "swagger-ui-bundle.js"), "utf8"),
    );
});

app.get("/swagger-ui/swagger-ui-standalone-preset.js", (_, res) => {
  res
    .type("application/javascript")
    .send(
      fs.readFileSync(
        path.join(swaggerUiPath, "swagger-ui-standalone-preset.js"),
        "utf8",
      ),
    );
});

// Swagger
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

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

app.get("/", (_, res) => {
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
