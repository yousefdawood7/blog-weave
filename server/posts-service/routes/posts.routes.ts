import express from "express";
import { createPost, getPosts } from "../controllers/posts.controller";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

export default router;
