import type { PostsType } from "@/features/posts/types";
import axiox from "axios";

export async function fetchAllPosts(): Promise<PostsType> {
  const posts = await axiox.get("http://localhost:4002/posts", {
    headers: {
      "If-None-Match": "",
    },
  });
  return posts.data.data;
}
