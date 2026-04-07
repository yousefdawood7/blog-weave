import express from "express";
import { getAllComments, submitComment } from "../controllers/posts.controller";

const router = express.Router();

router.route("/:id/comments").get(getAllComments).post(submitComment);

export default router;
