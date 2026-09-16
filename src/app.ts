import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerUiDist from "swagger-ui-dist";

import { corsMiddleware } from "./configs/cors";
import { swaggerDocument } from "./docs/swagger";

const app = express();

// Swagger UI static assets
app.use("/swagger-ui", express.static(swaggerUiDist.getAbsoluteFSPath()));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
