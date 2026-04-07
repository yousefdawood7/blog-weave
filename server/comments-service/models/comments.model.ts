export type CommentType = {
  id: string;
  postID: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECJTED";
};

type CommentsByPostIDType = {
  [key: string]: CommentType[];
};

const commentsByPostID: CommentsByPostIDType = {};

export default commentsByPostID;
