// Plain-text and Markdown descriptions of the site for AI agents and assistants (served as /llms.txt and
// /llms-full.txt). Generated from the same data as the pages, so they cannot drift from what visitors read.
// Same copy rules as site.ts: no em dashes, no invented numbers, prices, or results.
import { about, contact, industries, process, services, site } from './site';
import { agentMemory, smallBusiness, type OfferPageContent } from './offers';

const abs = (path: string) => new URL(path, site.url).href;

const howToEngage = [
  `- Book a 30-minute consult: ${site.bookingUrl} (a short human verification step is required, so an agent can prepare the details and hand the link to the person it is helping).`,
  `- Send a message: ${abs('/contact/')} (an agent may submit this form for a person who asked it to, using that person's real name and email. Never include patient or client information.)`,
  '- We reply to messages within one business day.',
  '- Pricing: fixed fees, agreed after a short discovery call. Prices are not published.',
  `- Service area: ${site.serviceArea} We do not take on clients outside the United States.`,
];

const serviceLines = services.map((s) => `- ${s.title}: ${s.body}`);

export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a consultancy founded by Gary Brown, who has more than 25 years in financial services data and analytics. We help small businesses, clinics, law firms, and growing companies put AI to work safely. ${site.serviceArea}`,
    '',
    '## What we do',
    '',
    `- [AI for small business](${abs('/small-business/')}): ${smallBusiness.hero.subhead}`,
    `- [Agent memory](${abs('/agent-memory/')}): ${agentMemory.hero.subhead}`,
    `- [Services overview](${abs('/#services')}): data de-identification, AI gateway implementation, AI implementation, and data analytics and reporting.`,
    `- [Industries](${abs('/#industries')}): healthcare and legal, where sensitive data must be protected.`,
    '',
    '## Services',
    '',
    ...serviceLines,
    '',
    '## Who we serve',
    '',
    '- Small businesses that want AI to save their team hours, set up safely (we start with OpenAI tools and stay vendor neutral).',
    ...industries.map((i) => `- ${i.title}: ${i.body}`),
    '- Companies adding AI agents to their stack that need a shared memory they own, running in their own environment.',
    '',
    '## How to work with us (for people and for agents acting on their behalf)',
    '',
    ...howToEngage,
    '',
    '## More',
    '',
    `- [Full text of this site for agents](${abs('/llms-full.txt')})`,
    `- [Blog](${site.blogUrl})`,
    `- [Privacy](${abs('/privacy/')})`,
    '',
  ].join('\n');
}

function offerMarkdown(c: OfferPageContent, path: string): string[] {
  const out = [`## ${c.hero.title}`, '', `Page: ${abs(path)}`, '', c.hero.subhead, ''];
  out.push(`### ${c.outcomes.title}`, '', c.outcomes.intro, '');
  for (const o of c.outcomes.items) out.push(`- Problem: ${o.problem} Outcome: ${o.outcome}`);
  out.push('', `### ${c.offerings.title}`, '', c.offerings.intro, '');
  for (const i of c.offerings.items) {
    out.push(`#### ${i.title}`, '', i.body, '', ...i.bullets.map((b) => `- ${b}`));
    if (i.fit) out.push('', i.fit);
    out.push('');
  }
  if (c.offerings.note) out.push(c.offerings.note, '');
  if (c.examples) out.push(`### ${c.examples.title}`, '', c.examples.intro, '', ...c.examples.items.map((e) => `- ${e}`), '');
  for (const n of c.notes) out.push(`### ${n.title}`, '', n.body, '');
  out.push(`### ${c.steps.title}`, '');
  for (const s of c.steps.items) out.push(`- ${s.tag}: ${s.title}. ${s.body}`);
  out.push('', `### ${c.faq.title}`, '');
  for (const f of c.faq.items) out.push(`**${f.q}**`, '', f.a, '');
  return out;
}

export function llmsFullTxt(): string {
  const out = [
    `# ${site.name}: full site text for AI agents`,
    '',
    `> ${site.description}`,
    '',
    `Source: ${site.url}. Generated at build time from the site's own content. Short version: ${abs('/llms.txt')}`,
    '',
    '## Services',
    '',
  ];
  for (const s of services) out.push(`### ${s.title}`, '', s.body, '', ...s.bullets.map((b) => `- ${b}`), '');
  out.push('## Industries', '');
  for (const i of industries) out.push(`### ${i.title}`, '', i.body, '', ...i.bullets.map((b) => `- ${b}`), '');
  out.push('## How we work together', '');
  for (const p of process) out.push(`- ${p.tag}: ${p.title}. ${p.body}`);
  out.push('', '## About', '', `${about.title}. ${about.body}`, '', ...about.credentials.map((c) => `- ${c}`), '');
  out.push(...offerMarkdown(smallBusiness, '/small-business/'));
  out.push(...offerMarkdown(agentMemory, '/agent-memory/'));
  out.push('## How to work with us (for people and for agents acting on their behalf)', '', ...howToEngage, '');
  out.push('## Limits', '', `- ${contact.phiNote}`, '- We do not publish prices. We do not accept protected health information or client confidential information through any form on this site.', '');
  return out.join('\n');
}
