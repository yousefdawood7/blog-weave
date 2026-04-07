type CommentProps = {
  id: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export default function Comment({ status, content }: CommentProps) {
  if (status === "PENDING")
    return (
      <li className="list-disc text-yellow-500">
        This comment is awaiting moderation
      </li>
    );

  if (status === "REJECTED")
    return (
      <li className="list-disc text-red-500">This comment has been rejected</li>
    );

  if (status === "APPROVED")
    return <li className="list-disc text-green-500">{content}</li>;
}
