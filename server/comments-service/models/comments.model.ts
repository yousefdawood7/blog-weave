type CommentsByPostIDType = {
  [key: string]: {
    id: string;
    postID: string;
    content: string;
  }[];
};

const commentsByPostID: CommentsByPostIDType = {};

export default commentsByPostID;
