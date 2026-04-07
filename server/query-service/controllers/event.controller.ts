import type { Request, Response } from "express";
import type { CommentCreatedEvent, PostCreatedEvent } from "../utils/types";
import { posts } from "../model/posts.model";

export function handlePostCreatedEvent(payload: PostCreatedEvent["payload"]) {
  const post = posts[payload.id];
  if (!post)
    posts[payload.id] = {
      id: payload.id,
      title: payload.title,
      comments: [],
    };

  return true;
}

export function handleCommentCreatedEvent(
  payload: CommentCreatedEvent["payload"],
) {
  const post = posts[payload.postID];

  if (!post) return false;

  post.comments.push(payload);

  return true;
}

export function handleEvents(req: Request, res: Response) {
  console.log("HI");
  const { type, payload }: PostCreatedEvent | CommentCreatedEvent = req.body;

  if (type === "PostCreated") {
    const isPostCreated = handlePostCreatedEvent(payload);

    return (
      isPostCreated &&
      res.status(200).send({
        status: 200,
        message: "PostCreated event handled successfully",
      })
    );
  }

  if (type === "CommentCreated") {
    const isCommentCreated = handleCommentCreatedEvent(payload);

    return isCommentCreated
      ? res.status(200).send({
          status: 200,
          message: "CommentCreated handled Successfully",
        })
      : res.status(404).send({
          status: 404,
          message: "There is no post with this ID",
        });
  }

  return res.status(404).send({ status: 404, message: "Unknown Event" });
}
