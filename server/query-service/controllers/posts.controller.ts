import type { Request, Response } from "express";
import { posts } from "../model/posts.model";

export function getPosts(req: Request, res: Response) {
  res.status(200).send({ status: 200, data: posts });
}
