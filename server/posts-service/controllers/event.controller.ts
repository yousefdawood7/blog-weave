import type { Request, Response } from "express";

export function handleEvents(req: Request, res: Response) {
  console.log("Post-Service", req.body.type);
  res.send({ message: "Post-Service", type: req.body.type });
}
