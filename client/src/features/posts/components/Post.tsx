import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import CommentsList from "@/features/comments/components/CommentsList";
import { createComment } from "@/features/comments/services/createComment";
import type { CommentType } from "@/features/posts/types";
import { useMutation } from "@tanstack/react-query";
import { useId, useState } from "react";

type PostProps = {
  id: string;
  title: string;
  comments: CommentType[];
};

export default function Post({ id: postID, title, comments }: PostProps) {
  const commentID = useId();
  const [comment, setComment] = useState<string>("");

  const { mutate: createCommentMutation, isPending } = useMutation({
    mutationFn: createComment,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CommentsList comments={comments} />
      </CardContent>

      <CardFooter>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            createCommentMutation({ postID, content: comment });
            setComment("");
          }}
        >
          <p className="flex flex-col gap-2.5">
            <Label htmlFor={commentID}>Comment</Label>
            <Input
              type="text"
              id={commentID}
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </p>

          <Button>{isPending ? <Spinner /> : "Create a Comment"}</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
