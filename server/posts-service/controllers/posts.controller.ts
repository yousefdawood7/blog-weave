import axios from "axios";
import type { Request, Response } from "express";
import posts from "../models/posts.model";

export function getPosts(_req: Request, res: Response) {
  res.status(200).send(posts);
}

export async function createPost(req: Request, res: Response) {
  const { title = null } = req.body ?? {};

  if (!title)
    return res
      .status(400)
      .send({ code: 400, message: "Bad Request", cause: "Title not provided" });

  const createdPostID = crypto.randomUUID();

  posts[createdPostID] = { id: createdPostID, title };

  await axios.post("http://event-bus-srv:4005/event", {
    type: "PostCreated",
    payload: posts[createdPostID],
  });

  return res.status(201).send(posts[createdPostID]);
}
