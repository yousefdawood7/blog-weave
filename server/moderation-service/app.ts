import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";

import eventRouter from "./routes/event.routes";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/event", eventRouter);

export default app;
