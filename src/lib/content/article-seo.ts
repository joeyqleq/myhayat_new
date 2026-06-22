export type ArticleSeoEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedTime: string;
  modifiedTime: string;
  keywords: string[];
};

export const ARTICLE_SEO: ArticleSeoEntry[] = [
  {
    slug: "purpose-built-ai",
    title: "Why Purpose-Built AI Outperforms Generic Chatbots in Mental Health",
    description: "Learn why purpose-built AI trained on anonymized clinical data can offer safer, more culturally grounded mental health support for Lebanese users.",
    category: "Clinical Research",
    publishedTime: "2026-06-01T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["purpose-built AI mental health", "Lebanese mental health AI", "clinical AI chatbot"],
  },
  {
    slug: "real-world-outcomes",
    title: "Real-World Outcomes: Symptom Reduction in Lebanese Users",
    description: "Explore outcome data on anxiety and depression symptom improvement among Lebanese users of My Hayat.",
    category: "Clinical Research",
    publishedTime: "2026-05-15T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["mental health outcomes Lebanon", "AI therapy outcomes", "PHQ-9 GAD-7 Lebanon"],
  },
  {
    slug: "dose-response",
    title: "More Engagement, More Improvement: A Dose-Response Analysis",
    description: "See how consistent engagement with My Hayat correlates with stronger mental health outcomes over time.",
    category: "Clinical Research",
    publishedTime: "2026-04-15T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["dose response mental health app", "engagement mental health AI", "Lebanese wellness app"],
  },
  {
    slug: "safety-benchmarks",
    title: "Safety First: How We Benchmark Our AI Against Harmful Responses",
    description: "Understand how My Hayat evaluates harmful-response risk and why safety benchmarking matters for AI mental health tools.",
    category: "Clinical Research",
    publishedTime: "2026-03-20T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["AI safety mental health", "harmful response benchmarks", "safe AI therapy Lebanon"],
  },
  {
    slug: "behavioral-activation",
    title: "Language Signals of Behavioral Activation Predict Real-World Outcomes",
    description: "How language patterns inside conversations can reveal meaningful behavior change and mental health progress.",
    category: "Clinical Research",
    publishedTime: "2026-06-05T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["behavioral activation AI", "NLP mental health", "language signals therapy"],
  },
  {
    slug: "grounding-techniques",
    title: "5 Grounding Techniques That Work in Under 2 Minutes",
    description: "Simple grounding techniques for anxiety and overwhelm that can help you regulate quickly in everyday life.",
    category: "Wellness",
    publishedTime: "2026-06-10T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["grounding techniques", "anxiety help Lebanon", "2 minute calming techniques"],
  },
  {
    slug: "sleep-anxiety-connection",
    title: "The Sleep-Anxiety Connection: Breaking the Cycle",
    description: "Understand how sleep and anxiety reinforce each other, and learn practical ways to interrupt the cycle and rest more safely.",
    category: "Wellness",
    publishedTime: "2026-05-20T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["sleep anxiety connection", "anxiety and insomnia", "sleep mental health Lebanon"],
  },
  {
    slug: "journaling-mental-health",
    title: "Journaling for Mental Health: A Beginner's Guide",
    description: "Learn how a simple journaling practice can support emotional awareness, reduce stress, and complement mental health care.",
    category: "Wellness",
    publishedTime: "2026-05-18T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["journaling mental health", "mental health journaling prompts", "stress journaling guide"],
  },
  {
    slug: "breathwork",
    title: "Breathwork for Beginners: 4-7-8 and Box Breathing Explained",
    description: "A simple guide to beginner-friendly breathing exercises that can help with panic, overwhelm, and daily stress.",
    category: "Wellness",
    publishedTime: "2026-04-20T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["breathwork for anxiety", "box breathing guide", "4-7-8 breathing Lebanon"],
  },
  {
    slug: "digital-detox",
    title: "Digital Detox: When Your Phone Becomes a Source of Anxiety",
    description: "See how doom-scrolling and overstimulation can affect mental health, plus practical ways to build healthier digital habits.",
    category: "Wellness",
    publishedTime: "2026-03-18T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["digital detox anxiety", "phone anxiety mental health", "doomscrolling stress"],
  },
  {
    slug: "mental-health-lebanon-crisis",
    title: "Mental Health in Lebanon: A Crisis Within a Crisis",
    description: "A closer look at Lebanon’s mental health access gap, layered trauma, and why culturally relevant support matters.",
    category: "Lebanese Context",
    publishedTime: "2026-06-08T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["mental health Lebanon", "Lebanon crisis mental health", "Lebanese therapy access"],
  },
  {
    slug: "stigma-lebanese-culture",
    title: "\"Majnoun\": Breaking the Stigma of Mental Health in Lebanese Culture",
    description: "Explore how stigma shapes help-seeking in Lebanon and why private, culturally aware support can lower the barrier to care.",
    category: "Lebanese Context",
    publishedTime: "2026-05-12T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["mental health stigma Lebanon", "Lebanese culture therapy stigma", "private mental health support Lebanon"],
  },
  {
    slug: "diaspora-mental-health",
    title: "The Invisible Weight: Mental Health in the Lebanese Diaspora",
    description: "A look at grief, guilt, identity strain, and long-distance stress affecting Lebanese communities living abroad.",
    category: "Lebanese Context",
    publishedTime: "2026-04-22T00:00:00.000Z",
    modifiedTime: "2026-06-22T00:00:00.000Z",
    keywords: ["Lebanese diaspora mental health", "diaspora grief Lebanon", "identity stress diaspora"],
  },
];

export const ARTICLE_SEO_MAP = Object.fromEntries(ARTICLE_SEO.map((entry) => [entry.slug, entry]));
