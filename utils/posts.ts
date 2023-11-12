import { Post } from '../types.d.ts';
import { extract } from "https://deno.land/std@0.206.0/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  const raw: string | null = await Deno
    .readTextFile(`./content/posts/${id}.md`);

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    content: render(body),
    date: params.date,
    excerpt: params.excerpt,
  }

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises: any[] = [];

  for await (const entry of Deno.readDir('./content/posts')) {
    const { name } = entry;
    const [id] = name.split('.');
    if (id) promises.push(loadPost(id));
  }

  const posts = await Promise.all(promises) as Post[];

  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  console.log(posts);
  return posts;
}

export async function listPostsSequentially(): Promise<Post[]> {
  const posts: any[] = [];

  for await (const entry of Deno.readDir('./content/posts')) {
    const { name } = entry;
    const [id] = name.split('.');
    const post = await loadPost(id);
    if (!post) continue;
    posts.push(post);
  }
  return posts;
}

// await listPostsSequentially();
// deno run ./utils/posts.ts

// console.log(await loadPost("hello-world"));
// deno check 'utils/posts_test.ts'
