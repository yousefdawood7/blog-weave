import axios from "axios";

export async function createPost(title: string) {
  axios.post("http://localhost:4000/posts", { title });
}
