type CommentProps = {
  id: string;
  content: string;
};

export default function Comment({ content }: CommentProps) {
  return <li className="list-disc">{content}</li>;
}
