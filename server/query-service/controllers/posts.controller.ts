import type { Request, Response } from "express";
import { posts } from "../models/posts.model";

export function getPosts(_req: Request, res: Response) {
  res.status(200).send({ status: 200, data: posts });
}
