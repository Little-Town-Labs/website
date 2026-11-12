import type { APIRoute } from 'astro';
import { getPosts, postPath } from '../../data/blog';
import { site } from '../../data/site';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${site.url}${postPath(p)}</link>
      <guid isPermaLink="true">${site.url}${postPath(p)}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${esc(p.data.description)}</description>
    </item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} blog</title>
    <link>${site.url}/blog/</link>
    <description>Practical guidance on HIPAA de-identification, safe AI for law firms and small businesses, and agent memory.</description>
    <language>en-us</language>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
