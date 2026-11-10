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
    title: 'AI for Small Business | Little Town Labs',
    description:
      'We set up OpenAI tools safely, build the few workflows that save your team hours, and keep them tuned. No big IT project.',
  },
  hero: {
    eyebrow: 'AI for small business',
    title: 'AI that saves your team hours, set up safely.',
    subhead:
      'We set up OpenAI tools the right way, build the few workflows that pay for themselves, and keep them tuned. No big IT project, no jargon.',
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
          'Logging and spending limits built in',
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
        q: 'What happens if someone pastes something they should not?',
        a: 'The policy and settings reduce the risk, and for sensitive work we can add automatic redaction before data reaches a model.',
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
    title: 'Agent Memory | Little Town Labs',
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
