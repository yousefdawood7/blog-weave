import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import postsRouter from "./routes/posts.routes";
import eventRouter from "./routes/event.routes";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);
app.use("/event", eventRouter);

export default app;
