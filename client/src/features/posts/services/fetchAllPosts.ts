import type { PostsType } from "@/features/posts/types";
import { URL, QUERY_NODE_PORT } from "@/lib/constants";
import axios from "axios";

export async function fetchAllPosts(): Promise<PostsType> {
  const posts = await axios.get(`${URL}:${QUERY_NODE_PORT}/posts`);
  return posts.data.data;
}
