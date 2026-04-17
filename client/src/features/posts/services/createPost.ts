import { URL, POST_NODE_PORT } from "@/lib/constants";
import axios from "axios";

export async function createPost({ title }: { title: string }) {
  await axios.post(`${URL}:${POST_NODE_PORT}/posts`, { title });
}
