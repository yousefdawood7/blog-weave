import express from "express";
import helmet from "helmet";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type EventType = {
  type: string;
  payload: { [key: string]: any };
};

const events: EventType[] = [];

app.post("/event", async (req, res) => {
  const event = req.body;
  events.push(event);

  await Promise.all([
    axios.post("http://localhost:4000/event", event),
    axios.post("http://localhost:4001/event", event),
    axios.post("http://localhost:4002/event", event),
    axios.post("http://localhost:4003/event", event),
  ]);

  res
    .status(200)
    .send({ status: 200, message: "Forwards event to all our services" });
});

app.get("/event", (_req, res) => res.json(events));

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});
