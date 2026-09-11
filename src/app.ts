import express from "express";
import apiRouter from "./routes/api";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./configs/cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

app.use("/api", apiRouter);

export default app;
