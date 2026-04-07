import express from "express";
import { handleEvents } from "../controllers/event.controller";

const router = express.Router();

router.route("/").post(handleEvents);

export default router;
