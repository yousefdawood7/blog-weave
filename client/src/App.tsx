import { Separator } from "@/components/ui/separator";
import CreatePost from "@/features/posts/components/posts/CreatePost";
import PostsList from "@/features/posts/components/posts/PostsList";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-start p-5 min-h-svh gap-4">
      <CreatePost />
      <Separator />
      <PostsList />
    </main>
  );
}
