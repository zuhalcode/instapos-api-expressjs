import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { corsMiddleware } from "./configs/cors";
import { swaggerUiPath } from "./docs/swagger-ui";

import docs from "./docs/route";
import { swaggerDocument } from "./docs/swagger";

const app = express();

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
