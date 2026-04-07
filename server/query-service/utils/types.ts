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

export type CommentCreatedEvent = {
  type: "CommentCreated";
  payload: CommentType;
};

export type PostCreatedEvent = {
  type: "PostCreated";
  payload: {
    id: string;
    title: string;
  };
};

export type CommentUpdatedEvent = {
  type: "CommentUpdated";
  payload: CommentType;
};
