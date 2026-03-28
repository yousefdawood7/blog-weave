import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type PostsType = {
  [key: string]: { id: string; title: string };
};
const posts: PostsType = {};

app.get("/posts", (_req, res) => {
  res.status(200).send(posts);
});

app.post("/posts", (req, res) => {
  const { title = null } = req.body ?? {};

  if (!title)
    return res
      .status(400)
      .send({ code: 400, message: "Bad Request", cause: "Title not provided" });

  const createdPostID = crypto.randomUUID();

  posts[createdPostID] = { id: createdPostID, title };

  res.status(201).send(posts[createdPostID]);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
