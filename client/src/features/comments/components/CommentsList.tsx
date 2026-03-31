import Comment from "@/features/comments/components/Comment";
import type { CommentType } from "@/features/posts/types";

type CommentsListProps = CommentType;

export default function CommentsList({
  comments,
}: {
  comments: CommentsListProps[];
}) {
  if (comments.length === 0) {
    return <h3 className="text-center">There are no comments yet.</h3>; // Don't render anything if there are no comments
  }

  return (
    <div className="flex flex-col gap-1.5">
      {comments.length > 0 && <h3 className="text-lg font-medium">Comments</h3>}

      <ul className="pl-8">
        {comments.map((comment) => (
          <Comment key={comment.id} id={comment.id} content={comment.content} />
        ))}
      </ul>
    </div>
  );
}
