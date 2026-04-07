import type { Request, Response } from "express";
import type {
  CommentCreatedEvent,
  CommentType,
  PostCreatedEvent,
} from "../utils/types";
import { posts } from "../models/posts.model";

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

export function handleCommentCreatedEvent(payload: CommentType) {
  const post = posts[payload.postID];

  // prettier-ignore
  if (!post)
    return false;

  console.log("PAT", payload);
  post.comments.push(payload);

  return true;
}

export function handleCommentUpdated(payload: CommentType) {
  const post = posts[payload.postID];

  // prettier-ignore
  if (!post)
    return false;

  let moderatedCommentIndex = post.comments.findIndex(
    (c) => c.id === payload.id,
  );

  // prettier-ignore
  if ( moderatedCommentIndex === -1 || !post.comments[moderatedCommentIndex] )
    return false;

  post.comments[moderatedCommentIndex] = {
    ...post.comments[moderatedCommentIndex],
    status: payload.status,
  };

  return true;
}

export function handleEvents(req: Request, res: Response) {
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
          message: "CommentCreated event handled successfully",
        })
      : res.status(404).send({
          status: 404,
          message: "There is no post with this ID",
        });
  }

  if (type === "CommentUpdated") {
    const isCommentUpdated = handleCommentUpdated(payload);
    console.log(isCommentUpdated);

    return isCommentUpdated
      ? res.status(200).send({
          status: 200,
          message: "CommentUpdated event handled successfully",
        })
      : res.status(404).send({
          status: 404,
          message: "There is no post or comment with this ID",
        });
  }

  return res.status(204).send({ status: 204, message: "Unknown Event" });
}
