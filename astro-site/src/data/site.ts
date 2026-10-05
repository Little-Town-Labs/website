// Copy lives here so edits do not require touching markup.
// Writing rule: never use em dashes in copy.

export const site = {
  name: 'Little Town Labs',
  url: 'https://littletownlabs.com',
  title: 'Little Town Labs | De-identification, Analytics, and AI for Healthcare and Legal',
  description:
    'Little Town Labs helps healthcare organizations and law firms de-identify data, build privacy-safe analytics, and implement AI gateways and AI tools with the safeguards compliance teams expect.',
  blogUrl: 'https://blog.littletownlabs.site/',
  partnerUrl: 'https://timelesstechs.com/',
  tagline: 'De-identification, analytics, AI gateways, and AI implementation for regulated industries.',
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Benchmarks', href: '/#benchmarks' },
  { label: 'About', href: '/#about' },
];

export type Segment = { t: string; pii?: boolean; masked?: boolean };

export const hero = {
  eyebrow: 'De-identification // Analytics // AI Gateways // AI Implementation',
  title: 'Put AI to work on sensitive data. Without exposing it.',
  subhead:
    'We help healthcare organizations and law firms de-identify data, turn it into reporting they can act on, govern every model call, and roll out AI tools with the safeguards their compliance teams expect.',
  primaryCta: { label: 'Start with a de-identification audit', href: '/#contact' },
  secondaryCta: { label: 'See our services', href: '/#services' },
  promptIn: [
    { t: 'Summarize the visit for ' },
    { t: 'Maria Lopez', pii: true },
    { t: ', DOB ' },
    { t: '03/14/1961', pii: true },
    { t: ', MRN ' },
    { t: '00482913', pii: true },
  ] as Segment[],
  gatewayOut: [
    { t: 'Summarize the visit for ' },
    { t: '[PATIENT_1]', masked: true },
    { t: ', DOB ' },
    { t: '[DATE_1]', masked: true },
    { t: ', MRN ' },
    { t: '[ID_1]', masked: true },
  ] as Segment[],
  demoNote: '3 identifiers masked before the model saw them',
};

export type IconName = 'shield' | 'gateway' | 'ai' | 'chart';

export const servicesIntro = {
  eyebrow: 'What we do',
  title: 'Turn sensitive data into insight, and keep it protected wherever AI touches it.',
};

export const services: { icon: IconName; title: string; body: string; bullets: string[] }[] = [
  {
    icon: 'shield',
    title: 'Data De-identification',
    body: 'Remove PHI and confidential client details from structured, semi-structured, and unstructured data so it can feed reporting, analytics, and AI.',
    bullets: [
      'Validation audits of your current process',
      'Pipelines built on Presidio and Philter',
      'Deploy in your environment or ours (Azure)',
      'Ongoing managed service',
    ],
  },
  {
    icon: 'gateway',
    title: 'AI Gateway Implementation',
    body: 'Put a single, governed front door in front of every model your teams use, with PII guardrails, access control, logging, and cost tracking. Vendor-neutral, on the platform that fits you.',
    bullets: [
      'LiteLLM proxy deployment and configuration',
      'Kong AI Gateway setup and policy design',
      'Portkey / Prisma AIRS AI Gateway implementation',
      'Prompt redaction before data leaves your network',
      'Grafana monitoring for usage, cost, and audit trails',
    ],
  },
  {
    icon: 'ai',
    title: 'AI Implementation',
    body: 'Roll out AI assistants and agents to real teams, with use cases, safeguards, test plans, and training built around how your people actually work.',
    bullets: [
      'Use case discovery and pilot design',
      'Safeguards for document systems and practice tools',
      'Self-hosted agent memory and knowledge bases (OpenViking)',
      'Governance aligned to the NIST AI RMF',
      'Staff training and adoption support',
    ],
  },
  {
    icon: 'chart',
    title: 'Data Analytics and Reporting',
    body: 'Turn operational data into reporting leaders trust, from modern data platforms and BI dashboards to privacy-safe HTML reports built on de-identified snapshots, with no live connection to your source systems.',
    bullets: [
      'Azure data platform design and build',
      'Power BI and Grafana dashboards and data models',
      'Privacy-safe HTML reporting (Observable Framework, Evidence, Quarto)',
      'Data quality, cleansing, and validation',
      'Process improvement analysis',
    ],
  },
];

export const protection = {
  title: 'Protection at rest and in flight',
  body: 'De-identification secures the data you store and analyze. The AI gateway secures what your people send to models. Together they close the gap most organizations leave open.',
  rows: [
    { label: 'At rest', steps: ['EHR / case files', 'De-identification pipeline', 'Dashboards and HTML reports'], highlight: 'ink' },
    { label: 'In flight', steps: ['Staff and apps', 'AI gateway with PII guardrails', 'Claude, OpenAI, Azure, others'], highlight: 'accent' },
  ] as { label: string; steps: string[]; highlight: 'ink' | 'accent' }[],
};

export const industriesIntro = { eyebrow: 'Who we serve', title: 'Built for regulated work' };

export const industries = [
  {
    title: 'Healthcare',
    body: 'Clinics, health systems, and health tech teams that need patient data for analytics and AI without putting PHI at risk.',
    bullets: [
      'HIPAA Safe Harbor and Expert Determination support',
      'EHR data (including eClinicalWorks) to Azure and Power BI',
      'Clinical note de-identification',
      'We sign BAAs',
    ],
    link: { label: 'Healthcare services', href: '/healthcare' },
  },
  {
    title: 'Legal',
    body: 'Law firms adopting AI that must protect privilege, client confidentiality, and sensitive case material.',
    bullets: [
      'Safe AI rollouts inside document management systems',
      'Redaction for discovery and protective orders',
      'Guardrails on what leaves the firm',
      'Practice management integrations',
    ],
    link: { label: 'Legal services', href: '/legal' },
  },
];

export const processTitle = 'How we work together';

export const process = [
  {
    tag: '01 // Validate',
    title: 'De-identification audit',
    body: 'We test your current process against synthetic data with known PHI and show you exactly what leaks and what gets over-redacted.',
  },
  {
    tag: '02 // Implement',
    title: 'Build and deploy',
    body: 'Pipelines, gateways, and AI tooling deployed in your environment, tested, documented, and handed over.',
  },
  {
    tag: '03 // Manage',
    title: 'Managed service',
    body: 'We monitor, tune, and re-validate over time so protection keeps pace with new data and new models.',
  },
];

export const benchmarks = {
  eyebrow: 'Benchmarks',
  title: "We measure de-identification. We don't just promise it.",
  body: 'Our test harness generates realistic synthetic clinical notes with tagged ground-truth PHI, then scores any de-identification tool on recall, precision, and F1.',
  link: { label: 'Read the benchmark report', href: '/benchmarks' },
  // Placeholders stay marked until real results are published. Do not invent numbers.
  metrics: [
    { value: '[RECALL]', label: 'PHI caught' },
    { value: '[PRECISION]', label: 'Redactions correct' },
    { value: '[F1]', label: 'Overall score' },
  ],
};

export const about = {
  eyebrow: 'About',
  title: 'Gary Brown, Founder',
  photo: '/images/gary-profile.jpg',
  photoAlt: 'Portrait of Gary Brown, founder of Little Town Labs',
  body: 'Gary has spent more than 25 years in financial services data and analytics, one of the most regulated data environments there is. He founded Little Town Labs to bring that same discipline to healthcare and legal organizations adopting AI.',
  credentials: [
    'M.S. in Information Technology, Information Security',
    'NIST AI RMF certified',
    'SAFe 6 POPM and SSM, SAFe AI certified',
  ],
};

export const contact = {
  title: 'Talk to us about your data',
  body: "Tell us what you're working with. We'll reply within one business day with next steps, usually starting with a short discovery call.",
  phiNote: "Please don't include patient or client information in this form.",
  industries: ['Healthcare', 'Legal', 'Other'],
};

export const footer = {
  links: [
    { label: 'Blog', href: site.blogUrl },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],
  copyright: '© 2026 Little Town Labs',
};
