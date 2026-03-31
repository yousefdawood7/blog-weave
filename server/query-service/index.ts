import express from "express";
import helmet from "helmet";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
