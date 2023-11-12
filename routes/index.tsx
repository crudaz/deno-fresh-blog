import { useSignal } from "@preact/signals";
import { listPosts } from "../utils/posts.ts";
import { Post } from "../types.d.ts";
import { PageProps, Handlers, HandlerContext } from "$fresh/server.ts";
import { format } from "https://deno.land/std@0.206.0/datetime/format.ts";

export const handler: Handlers = {
  async GET(req: Request, context: HandlerContext<any, Record<string, unknown>>): Promise<void> {
    const posts: Post[] = await listPosts();
    return context.render({ posts });
  },
}

export default function Home(props: PageProps) {
  const { data} = props;
  const { posts } = data;
  return (
    <main class="p-4">
      <h1 class="text-4xl font-bold">El blog de crudaz</h1>
      {posts.map((post: Post) => (
        <article class="p-4">
          <h2 class="text-2xl font-bold">
            <a class="underline hover:text-blue-500" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{format(new Date(post.date), "yyyy-MM-dd")}</time>
        </article>
      ))}
    </main>
  );
}
