import express from "express";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";

import { corsMiddleware } from "./configs/cors";
import docs from "./docs/route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

// Swagger
docs(app);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
  });
});

app.use("/api", apiRouter);

export default app;
