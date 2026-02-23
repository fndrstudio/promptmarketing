import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'pbui2f8s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const posts = [
  {
    _type: 'blogPost',
    title: 'What is AI Search Visibility (and How to Measure It)',
    slug: { _type: 'slug', current: 'ai-search-visibility' },
    author: 'Arjan ter Huurne',
    pubDate: '2026-01-10T05:00:00.000Z',
    category: 'ai-search-visibility',
    seoDescription: 'In generative AI experiences, users don\'t click ten blue links. They ask AI systems a question and get an answer. This shift demands a new way of understanding visibility.',
    content: [
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'When marketers talk about "search visibility," most of us instinctively think of classic search engines - rankings, impressions, click-throughs. But in 2026, search visibility means something fundamentally different.' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'AI Search Visibility: the new frontier' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'In classic search, visibility was relatively straightforward: How high does my page rank for target queries? In AI-mediated search, visibility means something like: How often, and in what way, does an AI system reference my brand when generating answers?' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Sampling, not tracking: our approach' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: 'At PromptMarketing, we believe the only way to measure AI Search Visibility meaningfully is to embrace the probabilistic nature of AI systems. Rather than querying one prompt once and calling it a day, we define robust prompts, sample AI responses at scale, and analyse patterns and probabilities.' }],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'blogPost',
    title: 'The Rise of Agentic Commerce: What Brands Need to Know',
    slug: { _type: 'slug', current: 'agentic-commerce' },
    author: 'Thomas Huijsmans',
    pubDate: '2026-01-15T05:00:00.000Z',
    category: 'agentic-commerce',
    seoDescription: 'AI agents are beginning to make purchase decisions on behalf of consumers. Here is what that means for brand strategy and how to prepare.',
    content: [
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'The next wave of e-commerce will not be driven by humans browsing websites. It will be driven by AI agents making purchase decisions on behalf of consumers. This shift - what we call Agentic Commerce - represents a fundamental change in how brands must think about discoverability, trust, and conversion.' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'What is Agentic Commerce?' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Agentic Commerce describes a market where AI agents - not humans - evaluate, compare, and select products and services. These agents parse structured data, assess trust signals, and make recommendations based on machine-readable evidence rather than emotional appeals.' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'How to prepare your brand' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: 'Start with structured data. Ensure your products, services, and expertise are described in machine-readable formats. Schema.org markup, clean APIs, and consistent entity definitions are the foundation of agentic discoverability.' }],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'blogPost',
    title: 'Why Rankings No Longer Matter (and What Does)',
    slug: { _type: 'slug', current: 'why-rankings-no-longer-matter' },
    author: 'Arjan ter Huurne',
    pubDate: '2026-01-20T05:00:00.000Z',
    category: 'relevance-engineering',
    seoDescription: 'Traditional SEO rankings are becoming less relevant as AI systems synthesize answers. The new metric is machine trust - and earning it requires a different approach.',
    content: [
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'For two decades, digital marketing revolved around one question: where do we rank? Position one was the holy grail. But in an era where AI systems synthesize answers from multiple sources, the concept of a single ranking position is becoming obsolete.' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'The end of position-based thinking' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'When a user asks ChatGPT or Perplexity a question, there is no page one. There is no position three. There is an answer - a synthesized response that may reference your brand, your competitor, or neither. The game has changed from ranking to relevance.' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Machine trust: the new currency' }],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: 'What matters now is whether AI systems trust your content enough to cite it. This trust is built through consistent structured data, authoritative content, clear entity definitions, and technical excellence. We call this Relevance Engineering - the practice of making your brand legible, trustworthy, and citable to machines.' }],
        markDefs: [],
      },
    ],
  },
]

for (const post of posts) {
  const result = await client.create(post)
  console.log(`Created: ${result._id} - ${post.title}`)
}

console.log('Seeding complete!')
