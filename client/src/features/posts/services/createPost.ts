import axios from "axios";

export async function createPost({ title }: { title: string }) {
  await axios.post("http://localhost:4000/posts", { title });
}
