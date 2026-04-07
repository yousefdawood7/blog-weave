export type CommentType = {
  id: string;
  postID: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

type CommentsByPostIDType = { 
  [key: string]: CommentType[];
};

const commentsByPostID: CommentsByPostIDType = {};

export default commentsByPostID;
