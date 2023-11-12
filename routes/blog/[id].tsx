import { Handlers, PageProps } from "https://deno.land/x/fresh@1.5.4/server.ts";
import { loadPost } from "../../utils/posts.ts";
import { Post } from "../../types.d.ts";
import { format } from "https://deno.land/std@0.206.0/datetime/format.ts";
import { CSS } from "https://deno.land/x/gfm@0.2.5/mod.ts";

export const handler: Handlers = {
  async GET(request: Request, context: any): Promise<void> {
    const { id } = context.params;
    const post: Post | null = await loadPost(id);
    console.log(post);
    return context.render({post});
  }
}

export default function PagePost(props: PageProps) {
  const { post } = props?.data || {};

  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <time>{format(new Date(post.date), "yyyy-MM-dd")}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div class="markdown-body" dangerouslySetInnerHTML={{ __html: post.content}} />
    </article>
  );
}
