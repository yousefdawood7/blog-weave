import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type CommentsByPostIDType = {
  [key: string]: {
    id: string;
    postID: string;
    content: string;
  }[];
};

const commentsByPostID: CommentsByPostIDType = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id: postID } = req.params;
  return res.status(200).send(commentsByPostID[postID] ?? []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { id: postID } = req.params;
  const { content } = req.body;

  if (!content)
    return res.status(400).send({
      code: 400,
      message: "Bad Request",
      cause: "Content not provided",
    });

  const comments = commentsByPostID[postID] ?? [];

  const newCreatedComment = { id: crypto.randomUUID(), postID, content };
  comments.push(newCreatedComment);

  commentsByPostID[postID] = comments;

  res.status(201).send(newCreatedComment);
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
