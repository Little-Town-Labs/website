// Copy for the AI offer pages. Same rules as site.ts: copy lives here so edits do not touch markup,
// never use em dashes, and no invented numbers, prices, or results.
import { site } from './site';

export type Cta = { label: string; href: string };

export type OfferPageContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; subhead: string; primaryCta: Cta; secondaryCta: Cta };
  outcomes: { eyebrow: string; title: string; intro: string; items: { problem: string; outcome: string }[] };
  offerings: {
    id: string;
    eyebrow: string;
    title: string;
    intro: string;
    note?: string;
    items: { title: string; body: string; bullets: string[]; fit?: string }[];
  };
  examples?: { title: string; intro: string; items: string[] };
  notes: { title: string; body: string; link?: Cta }[];
  steps: { title: string; items: { tag: string; title: string; body: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  closing: { title: string; body: string; cta: Cta };
};

const book: Cta = { label: 'Book a consult', href: site.bookingUrl };

export const smallBusiness: OfferPageContent = {
  seo: {
    title: 'AI Setup and Automation for Small Business | Little Town Labs',
    description:
      'We set up ChatGPT and OpenAI tools safely, build the few workflows and automations that save your team hours, and keep them tuned.',
  },
  hero: {
    eyebrow: 'AI for small business',
    title: 'AI that saves your team hours, set up safely.',
    subhead:
      'We set up OpenAI tools the right way, build the few workflows and automations that pay for themselves, and keep them tuned. No big IT project, no jargon.',
    primaryCta: book,
    secondaryCta: { label: 'See the packages', href: '#packages' },
  },
  outcomes: {
    eyebrow: 'What changes',
    title: 'What changes for your team',
    intro: 'Most small teams buy AI seats and leave every setting on its default. Here is what a proper setup gets you.',
    items: [
      {
        problem: 'Staff spend hours on emails, quotes, and summaries.',
        outcome: 'Drafts that are ready to review, so people spend their time deciding instead of typing.',
      },
      {
        problem: 'Nobody is sure what is safe to paste into AI.',
        outcome: 'Clear rules, sensible settings, and a one-page policy your team can actually follow.',
      },
      {
        problem: 'AI lives in a browser tab, apart from the tools you use.',
        outcome: 'Workflows connected to your email, calendar, documents, and customer records.',
      },
      {
        problem: 'The bill and the usage are a mystery.',
        outcome: 'Usage and cost you can see, with spending limits that protect your budget.',
      },
    ],
  },
  offerings: {
    id: 'packages',
    eyebrow: 'Packages',
    title: 'Three ways to work with us',
    intro: 'Start small. Each package stands alone, and each one leads naturally to the next.',
    note: 'Fixed fees, agreed after a short discovery call.',
    items: [
      {
        title: 'Safe-start setup',
        body: 'For teams that have bought, or are about to buy, ChatGPT and want it set up properly.',
        bullets: [
          'ChatGPT workspace configured with sensible data and sharing settings',
          'A one-page AI use policy written for your business',
          'A shortlist of the best first use cases',
          'A live training session for your team',
        ],
        fit: 'Best for teams just getting started.',
      },
      {
        title: 'Workflow builds',
        body: 'For repeat tasks that eat time every week. We build them on the OpenAI API and connect them to your tools.',
        bullets: [
          'A fixed scope agreed up front',
          'Connected to your email, documents, or customer records',
          'Every run logged, spending limits set, and a person approves anything that goes outside the company',
          'Tested with your real examples, then handed over with documentation',
        ],
        fit: 'Best for the one or two tasks you repeat every day.',
      },
      {
        title: 'Care plan',
        body: 'For teams that want it to keep working as tools and models change.',
        bullets: [
          'A monthly review of usage and cost',
          'Prompt and workflow tuning',
          'Updates when models or settings change',
          'A quarterly check-in on what to build next',
        ],
        fit: 'Best for teams who want a partner, not a project.',
      },
    ],
  },
  examples: {
    title: 'Workflows we build most',
    intro: 'Examples of what small teams ask for. Your list will differ, and the first call is where we find it.',
    items: [
      'Sort incoming email and web inquiries, and draft the replies',
      'Turn a call or intake form into a clean summary and next steps',
      'Draft quotes, proposals, and follow-ups from your own templates',
      'Answer staff questions from your handbook, price lists, and procedures',
      'Update your customer records after every booking or call',
      'Prepare weekly reports from the numbers you already collect',
    ],
  },
  notes: [
    {
      title: 'Handling client or patient information?',
      body: 'Some small businesses, such as clinics and law practices, cannot paste sensitive details into any AI tool. We add protections that remove identifying details before anything reaches a model, using the same approach we use for larger organizations.',
      link: { label: 'See how we protect sensitive data', href: '/#services' },
    },
  ],
  steps: {
    title: 'How it works',
    items: [
      { tag: '01 // Talk', title: 'A 30-minute call', body: 'We learn how your team works and where the hours go.' },
      {
        tag: '02 // Pilot',
        title: 'One workflow, done well',
        body: 'We set up one workflow with your real examples, and your team tries it.',
      },
      {
        tag: '03 // Keep going',
        title: 'Keep what works',
        body: 'Keep what works, add what is next, and keep it all tuned over time.',
      },
    ],
  },
  faq: {
    title: 'Questions we hear',
    items: [
      {
        q: 'Why start with OpenAI?',
        a: 'It is the tool most small teams already know, and it works well for everyday business tasks. We stay vendor neutral underneath, so we can use other models when they fit your needs better.',
      },
      {
        q: 'Will OpenAI use our data to train its models?',
        a: 'OpenAI states that content from its business plans and API is not used for training by default. Terms change, so we confirm the current terms and your settings with you during setup.',
      },
      {
        q: 'Do we have to change the tools we use?',
        a: 'No. We connect to the email, documents, and customer tools you already have.',
      },
      {
        q: 'Why not just buy an all-in-one AI agent platform?',
        a: 'For simple tasks with non-sensitive data, a platform can be a good fit, and we will say so. We help when your data is sensitive, your systems are tangled, or you need to know exactly where your information goes and who can delete it. We also set up and tune whichever tools you choose, so you are not left to work it out alone.',
      },
      {
        q: 'What happens if someone pastes something they should not?',
        a: 'The policy and settings reduce the risk, and for sensitive work we can add automatic redaction before data reaches a model.',
      },
      {
        q: 'Do you work with businesses outside the United States?',
        a: 'We work with companies and organizations in the United States only.',
      },
      {
        q: 'What does it cost?',
        a: 'The packages are fixed fees. We agree the scope and the price after a short discovery call, so there are no surprises.',
      },
    ],
  },
  closing: {
    title: 'Find the hours your team can get back.',
    body: 'Book a 30-minute consult. We will tell you honestly whether AI fits, and where to start.',
    cta: book,
  },
};

export const agentMemory: OfferPageContent = {
  seo: {
    title: 'AI Agent Memory Layer for Companies | Little Town Labs',
    description:
      'A shared AI memory layer that runs in your environment, so every assistant and agent knows what your company knows, and you can see, correct, and delete it.',
  },
  hero: {
    eyebrow: 'Agent memory',
    title: 'Give your AI a memory your company owns.',
    subhead:
      'As teams add assistants and agents, each tool forgets between sessions and keeps its own silo. We set up a shared memory layer in your environment, so every agent knows what your company knows, and you can see, correct, and delete it.',
    primaryCta: book,
    secondaryCta: { label: 'See what you get', href: '#deliverables' },
  },
  outcomes: {
    eyebrow: 'What changes',
    title: 'What changes',
    intro: 'Problems we hear from teams adding AI to their stack, and what they get instead.',
    items: [
      {
        problem: 'Our AI forgets us. Every conversation starts from zero.',
        outcome: 'Assistants that remember customers, preferences, and past decisions, so people stop repeating themselves.',
      },
      {
        problem: 'Each AI tool keeps its own silo.',
        outcome: 'One shared memory that every agent reads and writes, so the whole stack learns together.',
      },
      {
        problem: 'We cannot put client data into a model.',
        outcome: 'Sensitive details removed before anything is remembered, with the memory running in your own environment.',
      },
      {
        problem: 'AI costs keep creeping up.',
        outcome: 'Only the relevant memories sent to the model each time, so prompts stay short.',
      },
      {
        problem: 'We do not know what it remembers.',
        outcome: 'A dashboard where you can see, correct, and delete memories, with an audit trail.',
      },
    ],
  },
  offerings: {
    id: 'deliverables',
    eyebrow: 'What we deliver',
    title: 'A working memory layer, not a slide deck',
    intro: 'We design it, deploy it in your environment, make it safe, and connect it to your agents.',
    items: [
      {
        title: 'Assessment and design',
        body: 'We start with how your team works and what your agents need to know.',
        bullets: [
          'Where your agents and tools live today',
          'What should be remembered, and for how long',
          'Which memory tool fits your needs and your legal policy',
          'A plan with a clear scope',
        ],
      },
      {
        title: 'Deployment in your environment',
        body: 'The memory runs where your data already lives.',
        bullets: [
          'Cloud or on premises, on private networking',
          'Hardened, documented, and handed over',
          'Backups and an upgrade process',
          'Monitoring for usage and cost',
        ],
      },
      {
        title: 'Safe ingestion',
        body: 'What goes in matters as much as what comes out.',
        bullets: [
          'De-identification before anything is stored',
          'Rules for what is never remembered',
          'Per-user access and an audit trail',
          'Deletion on request',
        ],
      },
      {
        title: 'Connected to your agents',
        body: 'The memory is only useful if your agents can use it.',
        bullets: [
          'OpenAI, Claude, and other models',
          'Your internal assistants and coding agents',
          'Connected through the memory layer API',
          'Approval steps and run logs for consequential actions',
          'Training for the people who run it',
        ],
      },
    ],
  },
  notes: [
    {
      title: 'We pick the tool that fits you',
      body: 'Our default is Mem0, an open-source memory layer under the Apache 2.0 license that runs in your environment on Postgres. Where something else fits better, we use it: OpenViking when you want memory and documents in one browsable hierarchy, or plain document search when that is all you need. We check each license against your legal policy before we recommend it.',
    },
    {
      title: 'We run it ourselves',
      body: 'Little Town Labs runs a self-hosted agent memory system for its own work. We have already been through the setup, the security, and the upkeep, and we only recommend what we are willing to operate.',
    },
    {
      title: 'Measured, not promised',
      body: 'We are measuring memory tools on synthetic data, the same way we measure de-identification. Results will be published here.',
    },
  ],
  steps: {
    title: 'How it works',
    items: [
      { tag: '01 // Assess', title: 'A short call and a review', body: 'We look at your agents, your data, and your policies.' },
      {
        tag: '02 // Pilot',
        title: 'One team or one agent',
        body: 'We deploy the memory layer for one team or one agent, on synthetic or approved data.',
      },
      {
        tag: '03 // Roll out',
        title: 'Connect, monitor, hand over',
        body: 'We connect more agents, add monitoring, and hand it over or manage it for you.',
      },
    ],
  },
  faq: {
    title: 'Questions we hear',
    items: [
      {
        q: 'Where does the data live?',
        a: 'In your environment. If you use a hosted model to process memories, that text goes to the provider you choose, so we help you pick providers and settings that match your policy, including local models where needed.',
      },
      {
        q: 'Can people delete what it remembers?',
        a: 'Yes. Memories can be viewed, corrected, and deleted, and deletion requests can be handled on demand.',
      },
      {
        q: 'Which agents does it work with?',
        a: 'Anything that can call an API. We connect OpenAI and Claude based assistants, internal tools, and coding agents.',
      },
      {
        q: 'Why not use an AI platform that has memory built in?',
        a: 'Built-in memory is convenient, but it often lives inside one vendor\'s product, and basics like where it is stored, who can delete it, and whether you can take it with you are not always clear. A memory layer you own answers those questions up front.',
      },
      {
        q: 'Do you work with companies outside the United States?',
        a: 'We work with companies and organizations in the United States only.',
      },
      {
        q: 'Is it open source, and who supports it?',
        a: 'The tools we recommend are open source, so you are not locked in. We deploy, secure, and support them, and you keep full ownership of your data.',
      },
      {
        q: 'Do we need this, or is a vector database enough?',
        a: 'If you only need to search documents, simple vector search is often enough, and we will say so. A memory layer matters when agents need to remember people, decisions, and context over time.',
      },
    ],
  },
  closing: {
    title: 'Make your AI remember what matters.',
    body: 'Book a 30-minute consult. We will tell you honestly whether a memory layer fits, and what the simplest version looks like.',
    cta: book,
  },
};

export const healthcare: OfferPageContent = {
  seo: {
    title: 'HIPAA De-identification for Healthcare | Little Town Labs',
    description:
      'De-identify clinical data, analyze it safely, and put AI to work in clinics and health systems with HIPAA-aware safeguards. We sign BAAs.',
  },
  hero: {
    eyebrow: 'Healthcare',
    title: 'Use your patient data for analytics and AI without exposing PHI.',
    subhead:
      'We de-identify clinical data, turn it into reporting your team can act on, and put guardrails around every AI tool, so clinics, health systems, and health tech teams can move faster without putting patient information at risk.',
    primaryCta: book,
    secondaryCta: { label: 'See what we deliver', href: '#deliverables' },
  },
  outcomes: {
    eyebrow: 'What changes',
    title: 'What changes for your organization',
    intro: 'Problems we hear from clinics, health systems, and health tech teams, and what they get instead.',
    items: [
      {
        problem: 'You hold valuable patient data, but nobody is sure it is safe to use for analytics or AI.',
        outcome: 'De-identified data that feeds reporting, analytics, and AI, built on tested tools and checked against known examples.',
      },
      {
        problem: 'Your current de-identification process has never been properly tested.',
        outcome: 'A validation audit that shows exactly what leaks and what gets over-redacted, using synthetic data with known PHI.',
      },
      {
        problem: 'Staff are already pasting notes into AI tools.',
        outcome: 'A governed front door for every model, with identifying details removed before anything leaves your network, and a log of what was sent.',
      },
      {
        problem: 'Your EHR data is hard to turn into reports leaders trust.',
        outcome: 'EHR data, including eClinicalWorks, flowing into Azure and Power BI dashboards your team can act on.',
      },
      {
        problem: 'Your compliance team needs evidence, not promises.',
        outcome: 'Measured results for your own process and clear documentation they can review.',
      },
    ],
  },
  offerings: {
    id: 'deliverables',
    eyebrow: 'What we deliver',
    title: 'From raw data to safe analytics and AI',
    intro: 'We start by testing what you have, then build, deploy, and look after what you need.',
    items: [
      {
        title: 'De-identification audit',
        body: 'We test your current process against synthetic data with known PHI and show you exactly what leaks and what gets over-redacted.',
        bullets: [
          'Validation audits of your current process',
          'Support for HIPAA Safe Harbor and Expert Determination',
          'Clinical note de-identification',
        ],
      },
      {
        title: 'De-identification pipelines',
        body: 'Pipelines built on Presidio and Philter that remove PHI from the data feeding your reporting, analytics, and AI.',
        bullets: [
          'Structured, semi-structured, and unstructured data',
          'Deployed in your environment or ours (Azure)',
          'Ongoing managed service',
        ],
      },
      {
        title: 'AI gateway and safe AI rollout',
        body: 'One governed front door for every model your teams use, with the safeguards your compliance team expects.',
        bullets: [
          'Prompt redaction before data leaves your network',
          'Access control, logging, and cost tracking',
          'LiteLLM, Kong, Portkey, or Prisma AIRS, whichever fits',
          'Grafana monitoring for usage, cost, and audit trails',
        ],
      },
      {
        title: 'Analytics and reporting',
        body: 'Reporting leaders trust, built on de-identified data.',
        bullets: [
          'EHR data (including eClinicalWorks) to Azure and Power BI',
          'Privacy-safe HTML reports built on de-identified snapshots, with no live connection to your source systems',
          'Data quality, cleansing, and validation',
        ],
      },
    ],
  },
  notes: [
    {
      title: 'Two ways to de-identify under HIPAA',
      body: 'HIPAA describes two methods. Safe Harbor removes 18 types of identifiers, such as names, small geographic areas, and most dates, and requires that you have no actual knowledge that what remains could identify someone. Expert Determination relies on a qualified expert who applies statistical methods and documents that the risk of re-identification is very small. We support both, and we help you choose the one that fits your data and your risk.',
    },
    {
      title: 'We sign BAAs',
      body: 'Where our work involves protected health information, we sign business associate agreements. Please do not send patient information through this website.',
    },
    {
      title: 'Measured, not promised',
      body: 'Our test harness generates realistic synthetic clinical notes with tagged ground-truth PHI, then scores any de-identification tool on recall, precision, and F1. We use it to show you what your current process catches and what it misses.',
    },
  ],
  steps: {
    title: 'How we work together',
    items: [
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
    ],
  },
  faq: {
    title: 'Questions we hear',
    items: [
      {
        q: 'What is the difference between Safe Harbor and Expert Determination?',
        a: 'Safe Harbor is a checklist method: you remove 18 types of identifiers and have no actual knowledge that the remaining information could identify a person. Expert Determination is a risk-based method: a qualified expert applies statistical methods and documents that the risk of re-identification is very small. Which one fits depends on your data and how it will be used.',
      },
      {
        q: 'Is ChatGPT HIPAA compliant?',
        a: 'No tool is compliant on its own. What matters is the vendor agreement you have, how the tool is configured, and what data you send. Using AI with protected health information generally requires a business associate agreement with the vendor and the right settings. The most reliable safeguard is to remove identifiers before data reaches any model, which is what we build. Check current vendor terms and your compliance officer\'s guidance.',
      },
      {
        q: 'Do we need to de-identify data before using AI?',
        a: 'Not always, but it reduces risk and often simplifies approvals. If a model never sees identifiers, there is far less to protect. We help you decide what to remove and where.',
      },
      {
        q: 'Can you work inside our environment?',
        a: 'Yes. We deploy in your environment or ours (Azure).',
      },
      {
        q: 'Do you sign BAAs?',
        a: 'Yes. Where our work involves protected health information, we sign business associate agreements.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. We are a technology consultancy. Your compliance officer and counsel decide what your obligations are. We build the technical safeguards.',
      },
      {
        q: 'Do you work with organizations outside the United States?',
        a: 'We work with companies and organizations in the United States only.',
      },
    ],
  },
  closing: {
    title: 'Make your patient data safe to use.',
    body: 'Book a 30-minute consult. We will walk through your data, your tools, and where to start.',
    cta: book,
  },
};

export const legal: OfferPageContent = {
  seo: {
    title: 'Safe AI for Law Firms | Little Town Labs',
    description:
      'Use AI without risking privilege or client confidentiality: redaction, guardrails on what leaves the firm, and safe rollouts inside your document systems.',
  },
  hero: {
    eyebrow: 'Legal',
    title: 'Use AI in your firm without risking privilege or client confidentiality.',
    subhead:
      'We help law firms roll out AI tools with guardrails on what leaves the firm, redaction for sensitive material, and training so your people use them well.',
    primaryCta: book,
    secondaryCta: { label: 'See what we deliver', href: '#deliverables' },
  },
  outcomes: {
    eyebrow: 'What changes',
    title: 'What changes for your firm',
    intro: 'Problems we hear from law firms adopting AI, and what they get instead.',
    items: [
      {
        problem: 'Lawyers and staff are already trying AI tools, with no firm-wide rules.',
        outcome: 'A clear policy, guardrails, and training, so people know what is allowed and the firm can see what is used.',
      },
      {
        problem: 'You worry what happens to client information once it reaches a model.',
        outcome: 'Prompt redaction and a governed gateway, so sensitive details are removed before they leave the firm.',
      },
      {
        problem: 'Discovery and protective orders mean heavy redaction work.',
        outcome: 'Redaction support built around how your matters actually run.',
      },
      {
        problem: 'AI tools sit apart from the systems your firm uses every day.',
        outcome: 'Safe rollouts inside your document management and practice management systems.',
      },
    ],
  },
  offerings: {
    id: 'deliverables',
    eyebrow: 'What we deliver',
    title: 'Safe AI, from first pilot to firm-wide use',
    intro: 'We design the safeguards, put them in place, and train your people.',
    items: [
      {
        title: 'Safe AI rollout',
        body: 'Roll out AI assistants to real teams, with use cases, safeguards, and training built around how your people work.',
        bullets: [
          'Use case discovery and pilot design',
          'Safeguards for document systems and practice tools',
          'Governance aligned to the NIST AI RMF',
          'Staff training and adoption support',
        ],
      },
      {
        title: 'AI gateway and guardrails',
        body: 'One governed front door for every model your firm uses.',
        bullets: [
          'Guardrails on what leaves the firm',
          'Prompt redaction before data leaves your network',
          'Access control, logging, and cost tracking',
          'LiteLLM, Kong, Portkey, or Prisma AIRS, whichever fits',
        ],
      },
      {
        title: 'Redaction and de-identification',
        body: 'Remove confidential client details from documents and data so they can be used safely.',
        bullets: [
          'Redaction for discovery and protective orders',
          'Deployed in your environment or ours (Azure)',
          'Validated against known examples',
        ],
      },
    ],
  },
  notes: [
    {
      title: 'Technology safeguards, not legal advice',
      body: 'Professional duties around confidentiality and competence apply when lawyers use AI, and guidance is still evolving. We build the technical safeguards. Your counsel and ethics advisers decide what is permitted for your firm.',
    },
  ],
  steps: {
    title: 'How it works',
    items: [
      { tag: '01 // Talk', title: 'A 30-minute call', body: 'We learn how your firm works, which tools people are already using, and what worries you most.' },
      {
        tag: '02 // Pilot',
        title: 'One team, with safeguards',
        body: 'We set up guardrails and redaction for one practice group and try them on real workflows.',
      },
      {
        tag: '03 // Roll out',
        title: 'Firm-wide, with training',
        body: 'We extend what works, add monitoring, and train your people.',
      },
    ],
  },
  faq: {
    title: 'Questions we hear',
    items: [
      {
        q: 'Can lawyers use ChatGPT and similar tools?',
        a: 'Many firms do, with care. The questions are what client information goes in, what the provider does with it, and what your jurisdiction\'s rules and your clients\' agreements allow. We build the safeguards, and your counsel decides what is permitted.',
      },
      {
        q: 'What should a firm AI policy cover?',
        a: 'At a minimum: which tools are approved, what information may never be entered, who reviews AI output before it is used, and how use is logged. We help you turn that into settings and training, not just a document.',
      },
      {
        q: 'What happens to our client data?',
        a: 'With a gateway and redaction in front of the model, identifying details are removed before data leaves your network, and every request is logged. We can also deploy in your environment.',
      },
      {
        q: 'Does this protect privilege?',
        a: 'No technology can guarantee privilege. Our safeguards reduce what is exposed and give you a record of what was sent. Questions about privilege belong with your counsel.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. We are a technology consultancy. Your counsel and ethics advisers decide what your obligations are. We build the technical safeguards.',
      },
      {
        q: 'Do you work with firms outside the United States?',
        a: 'We work with companies and organizations in the United States only.',
      },
    ],
  },
  closing: {
    title: 'Use AI without putting client trust at risk.',
    body: 'Book a 30-minute consult. We will talk through how your firm works and where to start.',
    cta: book,
  },
};
