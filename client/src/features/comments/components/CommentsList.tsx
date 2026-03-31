import Comment from "@/features/comments/components/Comment";

const comments = [
  {
    id: "1",
    content: "Great post! Really helpful.",
  },
  {
    id: "2",
    content: "Thanks for sharing this insight.",
  },
  {
    id: "3",
    content: "Could you elaborate more on this?",
  },
  {
    id: "4",
    content: "Exactly what I was looking for!",
  },
  {
    id: "5",
    content: "Well written and informative.",
  },
];

export default function CommentsList() {
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
