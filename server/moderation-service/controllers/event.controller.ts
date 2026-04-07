import type { Request, Response } from "express";
import express from "express";

import axios from "axios";

type CommentType = {
  id: string;
  postID: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECJTED";
};

type CommentEventType = {
  type: string;
  payload: CommentType;
};

const moderatedWords = [
  "orange",
  "apple",
  "banana",
  "grape",
  "melon",
  "peach",
  "pear",
  "plum",
  "kiwi",
  "mango",
  "strawberry",
  "blueberry",
  "raspberry",
];

export async function handleEvents(
  req: Request<undefined, undefined, CommentEventType>,
  res: Response,
) {
  const { type, payload: comment } = req.body;

  if (type !== "CommentCreated")
    return res.send({ message: "Moderation-Service", type: type });

  await new Promise((resolve) => setTimeout(resolve, 7 * 1000));

  const isCommentReject = comment.content
    .split(" ")
    .some((word) => moderatedWords.includes(word));

  const moderatedComment: CommentType = {
    ...comment,
    status: isCommentReject ? "REJECJTED" : "APPROVED",
  };

  await axios.post("http://localhost:4005", {
    type: "CommentModerated",
    moderatedComment,
  });

  res.status(204).send({ message: "Comment Moderated Successfully" });
}
