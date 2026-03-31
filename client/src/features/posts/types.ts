export type CommentType = {
  id: string;
  postID: string;
  content: string;
};

export type PostsType = {
  [index: string]: {
    id: string;
    title: string;
    comments: CommentType[];
  };
};
