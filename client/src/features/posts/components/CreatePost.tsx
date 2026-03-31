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
import { createPost } from "@/features/posts/services/createPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";

export default function CreatePost() {
  const formID = useId();
  const post = useId();
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
      await queryClient.invalidateQueries();
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">Create Post</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id={formID}
          onSubmit={(e) => {
            e.preventDefault();
            createPostMutation(title);
          }}
        >
          <p className="flex flex-col gap-2.5">
            <Label htmlFor={post}>Title</Label>
            <Input
              type="text"
              id={post}
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </p>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form={formID}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Create Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
