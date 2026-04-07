import type { Request, Response } from "express";
import commentsByPostID, { type CommentType } from "../models/comments.model";
import axios from "axios";

type CommentEventType = {
  type: string;
  payload: CommentType;
};

export async function handleEvents(
  req: Request<undefined, undefined, CommentEventType>,
  res: Response,
) {
  const { type, payload: comment } = req.body;

  if (type !== "CommentModerated")
    return res.status(200).send({ message: "Comment-Service", type: type });

  const post = commentsByPostID[comment.postID];

  // prettier-ignore
  if (!post)
    return res.status(404).send({ message: "Post Not Found" });

  let moderatedCommentIndex = post.findIndex((c) => c.id === comment.id);

  if (moderatedCommentIndex === -1 || !post[moderatedCommentIndex])
    return res.status(404).send({ message: "Comment Not Found" });

  post[moderatedCommentIndex] = {
    ...post[moderatedCommentIndex],
    status: comment.status,
  };

  await axios.post("http://localhost:4005/event", {
    type: "CommentUpdated",
    payload: post[moderatedCommentIndex],
  });

  res.send({ message: "Comment-Service", type: req.body.type });
}
