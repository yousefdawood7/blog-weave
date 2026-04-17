import { URL, COMMENT_NODE_PORT } from "@/lib/constants";
import axios from "axios";

export async function createComment({
  postID,
  content,
}: {
  postID: string;
  content: string;
}) {
  await axios.post(`${URL}:${COMMENT_NODE_PORT}/posts/${postID}/comments`, {
    content,
  });
}
