import axios from "axios";
import type { Request, Response } from "express";
import commentsByPostID, { type CommentType } from "../models/comments.model";

export function getAllComments(req: Request<{ id: string }>, res: Response) {
  const { id: postID } = req.params;
  return res.status(200).send(commentsByPostID[postID] ?? []);
}

export async function submitComment(
  req: Request<{ id: string }, unknown, { content: string }>,
  res: Response,
) {
  const { id: postID } = req.params;
  const { content } = req.body;

  if (!content)
    return res.status(400).send({
      code: 400,
      message: "Bad Request",
      cause: "Content not provided",
    });

  const comments = commentsByPostID[postID] ?? [];

  const newCreatedComment: CommentType = {
    id: crypto.randomUUID(),
    postID,
    content,
    status: "PENDING",
  };

  comments.push(newCreatedComment);
  commentsByPostID[postID] = comments;

  axios.post("http://localhost:4005/event", {
    type: "CommentCreated",
    payload: newCreatedComment,
  });

  res.status(201).send(newCreatedComment);
}
