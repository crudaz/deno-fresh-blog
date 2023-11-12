import { Post } from "../types.d.ts";
import { loadPost } from "./posts.ts";
import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

Deno.test('loadPost() returns null if the post does not exist', async() => {
    const post: Post | null = await loadPost('non-existed');
    assertEquals(post, null);
});

Deno.test('loadPost() returns a post objects if post does exist', async() => {
    const post: Post | null = await loadPost('hello-world');
    assertEquals(post?.id, 'hello-world');
});
