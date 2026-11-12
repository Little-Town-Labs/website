// Helpers for the blog. Drafts are visible only in local development and on Netlify deploy previews
// (PUBLIC_SHOW_DRAFTS=true, set in netlify.toml), so they can be reviewed without ever going live.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const showDrafts = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => showDrafts || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postPath = (post: Post) => `/blog/${post.id}/`;

export const readingMinutes = (post: Post) => Math.max(1, Math.round((post.body ?? '').split(/\s+/).filter(Boolean).length / 220));

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
