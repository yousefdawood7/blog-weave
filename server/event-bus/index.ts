import express from "express";
import helmet from "helmet";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/event", async (req, res) => {
  console.log(req.body);
  await Promise.all([
    axios.post("http://localhost:4000/event", req.body),
    axios.post("http://localhost:4001/event", req.body),
    axios.post("http://localhost:4002/event", req.body),
    axios.post("http://localhost:4003/event", req.body),
  ]);

  res
    .status(200)
    .send({ status: 200, message: "Forwards event to all our services" });
});

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});
