import axios from "axios";
import app from "./app";
import { handleEventService } from "./services/event.service";
import type {
  CommentCreatedEvent,
  CommentUpdatedEvent,
  PostCreatedEvent,
} from "./utils/types";

app.listen(4002, async () => {
  console.log("Server is running on port 4002");
  const events = await axios.get<
    (PostCreatedEvent | CommentCreatedEvent | CommentUpdatedEvent)[]
  >("http://localhost:4005/event");

  // prettier-ignore
  for (const event of events.data) 
    handleEventService(event);
});
