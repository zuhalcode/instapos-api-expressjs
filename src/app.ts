import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { corsMiddleware } from "./configs/cors";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", apiRouter);

export default app;
