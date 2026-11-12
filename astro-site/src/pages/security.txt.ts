import type { APIRoute } from 'astro';
import { site } from '../data/site';

// RFC 9116 security contact. Expires is set at build time (about 11 months out) so it never silently lapses
// while the site keeps being deployed. Served at /.well-known/security.txt through public/_redirects.
export const GET: APIRoute = () => {
  const expires = new Date(Date.now() + 330 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${site.url}/.well-known/security.txt`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
