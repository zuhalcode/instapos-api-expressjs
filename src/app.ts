import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";

import docs from "./docs/route";
import swaggerUiDist from "swagger-ui-dist";

import { corsMiddleware } from "./configs/cors";

const app = express();

// Swagger UI static assets
app.use("/swagger-ui", express.static(swaggerUiDist.getAbsoluteFSPath()));

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
