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

export type CommentCreatedEvent = {
  type: "CommentCreated";
  payload: {
    id: string;
    postID: string;
    content: string;
  };
};

export type PostCreatedEvent = {
  type: "PostCreated";
  payload: {
    id: string;
    title: string;
  };
};
