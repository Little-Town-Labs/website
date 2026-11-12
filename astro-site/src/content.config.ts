import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts are Markdown files in src/content/blog. Set `draft: true` to keep a post off the live site:
// drafts are built only on local and Netlify deploy previews, never on production.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Gary Brown'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
