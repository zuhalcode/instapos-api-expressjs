import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";

import { corsMiddleware } from "./configs/cors";
import { swaggerUiPath } from "./docs/swagger-ui";

import docs from "./docs/route";

const app = express();

app.set("trust proxy", 1);

// Swagger UI static assets
app.use("/swagger-ui", express.static(swaggerUiPath));

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

// Swagger
docs(app);

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
