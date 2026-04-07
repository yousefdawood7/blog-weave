export type CommentType = {
  id: string;
  postID: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type PostsType = {
  [index: string]: {
    id: string;
    title: string;
    comments: CommentType[];
  };
};
