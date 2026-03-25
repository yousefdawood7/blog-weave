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
import { useId } from "react";

export default function CreatePost() {
  const formID = useId();
  const post = useId();

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
          }}
        >
          <p className="flex flex-col gap-2.5">
            <Label htmlFor={post}>Title</Label>
            <Input
              type="text"
              id={post}
              name="title"
              placeholder="Enter post title"
            />
          </p>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formID} className="w-full">
          Create Post
        </Button>
      </CardFooter>
    </Card>
  );
}
