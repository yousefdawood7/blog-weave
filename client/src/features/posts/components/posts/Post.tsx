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
import CommentsList from "@/features/posts/components/comments/CommentsList";
import { useId } from "react";

type PostProps = {
  id: string;
  title: string;
};
export default function Post({ title }: PostProps) {
  const commentID = useId();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CommentsList />
      </CardContent>

      <CardFooter>
        <form className="w-full flex flex-col gap-5">
          <p className="flex flex-col gap-2.5">
            <Label htmlFor={commentID}>Comment</Label>
            <Input type="text" placeholder="Write a comment" />
          </p>

          <Button>Create a Comment</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
