import {
  handleCommentCreatedEvent,
  handleCommentUpdated,
  handlePostCreatedEvent,
} from "../controllers/event.controller";
import type {
  CommentCreatedEvent,
  CommentUpdatedEvent,
  PostCreatedEvent,
} from "../utils/types";

export function handleEventService({
  type,
  payload,
}: PostCreatedEvent | CommentCreatedEvent | CommentUpdatedEvent) {
  // prettier-ignore
  if (type === "PostCreated")
    handlePostCreatedEvent(payload);

  // prettier-ignore
  if (type === "CommentCreated")
    handleCommentCreatedEvent(payload);

  // prettier-ignore
  if (type === "CommentUpdated")
    handleCommentUpdated(payload);
}
