import axios from "axios";

export async function createComment({
  postID,
  content,
}: {
  postID: string;
  content: string;
}) {
  await axios.post(`http://localhost:4001/posts/${postID}/comments`, {
    content,
  });
}
