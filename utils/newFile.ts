import type { Post } from "../types.d.ts";
import { loadPost } from "./posts.ts";
import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

Deno.test('loadPost() returns null if the post does not exist', async (): Promise<Post | null> => {
  const post: string | null = await loadPost('non-existed');
  assertEquals(post, null);
});
