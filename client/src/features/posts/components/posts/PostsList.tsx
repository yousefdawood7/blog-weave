import Post from "@/features/posts/components/posts/Post";

const posts = [
  {
    id: "1",
    title: "First Post",
  },
  {
    id: "2",
    title: "Second Post",
  },
  {
    id: "3",
    title: "Third Post",
  },
  {
    id: "4",
    title: "Fourth Post",
  },
];

export default function PostsList() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-5 place-items-center">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} />
      ))}
    </section>
  );
}
