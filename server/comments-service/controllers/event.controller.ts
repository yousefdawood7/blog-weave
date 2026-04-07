import type { Request, Response } from "express";

export function handleEvents(req: Request, res: Response) {
  console.log("Comment-Service", req.body.type);
  res.send({ message: "Comment-Service", type: req.body.type });
}
