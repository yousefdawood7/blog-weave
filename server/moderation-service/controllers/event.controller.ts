import axios from "axios";
import type { Request, Response } from "express";

type CommentType = {
  id: string;
  postID: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
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
    return res.status(200).send({ message: "Moderation-Service", type: type });

  await new Promise((resolve) => setTimeout(resolve, 1 * 1000));

  const isCommentReject = comment.content
    .split(" ")
    .some((word) => moderatedWords.includes(word.toLowerCase()));

  const moderatedComment: CommentType = {
    ...comment,
    status: isCommentReject ? "REJECTED" : "APPROVED",
  };

  await axios.post("http://event-bus-srv:4005/event", {
    type: "CommentModerated",
    payload: moderatedComment,
  });

  res.status(204).send({ message: "Comment Moderated Successfully" });
}
