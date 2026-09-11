import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";

import { corsMiddleware } from "./configs/cors";
import docs from "./docs/route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

app.use("/api", apiRouter);

// Swagger
docs(app);

export default app;
