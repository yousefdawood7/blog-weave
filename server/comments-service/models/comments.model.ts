type CommentsByPostIDType = {
  [key: string]: {
    id: string;
    postID: string;
    content: string;
    status: "PENDING" | "APPROVED" | "REJECJTED";
  }[];
};

const commentsByPostID: CommentsByPostIDType = {};

export default commentsByPostID;
