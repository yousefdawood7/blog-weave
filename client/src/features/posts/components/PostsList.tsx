import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import Post from "@/features/posts/components/Post";
import { fetchAllPosts } from "@/features/posts/services/fetchAllPosts";

export default function PostsList() {
  const { data: posts, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
    refetchInterval: 1000,
  });

  if (isPending)
    return (
      <section className="my-auto ">
        <Spinner className="size-12" />
      </section>
    );

  if (posts === undefined || Object.keys(posts).length === 0)
    return (
      <section className="my-auto ">
        <h1 className="text-2xl font-bold">There is no posts yet</h1>
      </section>
    );

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-5 place-items-center">
      {Object.values(posts).map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </section>
  );
}
