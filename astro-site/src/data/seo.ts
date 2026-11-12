// Structured data (schema.org JSON-LD) for search engines and AI agents.
// Built from the same data that drives the pages, so it cannot drift from what visitors read.
// Only facts that are visible on the site go in here. No prices, addresses, or reviews are invented.
import { about, services, site } from './site';
import type { OfferPageContent } from './offers';

const abs = (path: string) => new URL(path, site.url).href;
const ORG_ID = `${abs('/')}#organization`;
const SITE_ID = `${abs('/')}#website`;

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/images/logo.png'), width: 192, height: 192 },
  image: abs('/images/og-image.png'),
  description: site.description,
  areaServed: { '@type': 'Country', name: 'United States' },
  founder: {
    '@type': 'Person',
    name: 'Gary Brown',
    jobTitle: 'Founder',
    description: about.body,
    image: abs(about.photo),
  },
  knowsAbout: [
    'AI implementation for small business',
    'Data de-identification',
    'HIPAA Safe Harbor and Expert Determination',
    'AI gateways',
    'Agent memory',
    'Data analytics and reporting',
    'NIST AI Risk Management Framework',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: abs('/contact/'),
    availableLanguage: 'English',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Little Town Labs services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.body },
    })),
  },
};

export const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: abs('/'),
  name: site.name,
  description: site.description,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

export const globalGraph = [organization, website];

export const breadcrumb = (name: string, path: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
    { '@type': 'ListItem', position: 2, name, item: abs(path) },
  ],
});

// Graph for an offer page (small business, agent memory): the service, its packages, the FAQ, the breadcrumb.
export function offerGraph(c: OfferPageContent, path: string, opts: { name: string; serviceType: string; audience: string }) {
  const url = abs(path);
  return [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: opts.name,
      serviceType: opts.serviceType,
      url,
      description: c.hero.subhead,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'United States' },
      audience: { '@type': 'Audience', audienceType: opts.audience },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: c.offerings.title,
        itemListElement: c.offerings.items.map((i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: i.title, description: i.body },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: c.faq.items.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: { '@type': 'Answer', text: q.a },
      })),
    },
    breadcrumb(opts.name, path),
  ];
}

// JSON for a <script type="application/ld+json"> block. "<" is escaped so the data can never close the tag.
export const jsonLd = (graph: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
