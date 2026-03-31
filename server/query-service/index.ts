import express from "express";
import helmet from "helmet";
import cors from "cors";
import type {
  CommentCreatedEvent,
  PostCreatedEvent,
  PostsType,
} from "./utils/types.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts: PostsType = {};

app.post("/event", (req, res) => {
  const { type, payload }: PostCreatedEvent | CommentCreatedEvent = req.body;

  if (type === "PostCreated") {
    const post = posts[payload.id];
    if (!post)
      posts[payload.id] = {
        id: payload.id,
        title: payload.title,
        comments: [],
      };

    return res.status(200).send({
      status: 200,
      message: "PostCreated event handled successfully",
    });
  }

  if (type === "CommentCreated") {
    const post = posts[payload.postID];

    if (!post)
      return res.status(404).send({
        status: 404,
        message: "There is no post with this ID",
      });

    post.comments.push(payload);

    return res.status(200).send({
      status: 200,
      message: "CommentCreated handled Successfully",
    });
  }

  return res.status(404).send({ status: 404, message: "Unknown Event" });
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
});
