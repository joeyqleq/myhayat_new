const fs = require('fs');
const path = require('path');

const slugs = [
  "purpose-built-ai", "real-world-outcomes", "dose-response", "safety-benchmarks", "behavioral-activation", 
  "grounding-techniques", "sleep-anxiety-connection", "journaling-mental-health", "breathwork", "digital-detox", 
  "mental-health-lebanon-crisis", "stigma-lebanese-culture", "diaspora-mental-health", "therapy-lebanese-arabic", "economic-collapse-mental-toll", 
  "first-therapy-session", "panic-attack-guide", "setting-boundaries", "grief-processing", "supporting-loved-one", 
  "aya-story", "rami-story", "um-ali-story", "samar-story", "michel-story", 
  "how-we-train", "minimized-exposure", "pattern-recognition", "trust-factor", "perinatal-depression",
  // CBT Worksheets added
  "what-is-rebt", "tact-using-pauses-assertively", "what-is-dbt", "stop-ending-conversations-assertively", "lace-using-empathy-assertively"
];

const cbtTitles = {
  "what-is-rebt": "What Is Rational Emotive Behavior Therapy (REBT)?",
  "tact-using-pauses-assertively": "TACT – Using Pauses Assertively",
  "what-is-dbt": "What Is Dialectical Behavior Therapy (DBT)?",
  "stop-ending-conversations-assertively": "STOP – Ending Conversations Assertively",
  "lace-using-empathy-assertively": "LACE – Using Empathy Assertively"
};

let content = `import React from "react";\n\nexport const ARTICLES: Record<string, { title: string; body: React.ReactNode }> = {\n`;

slugs.forEach(slug => {
  const isCBT = cbtTitles[slug];
  const title = isCBT ? cbtTitles[slug] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  if (isCBT) {
    content += `  "${slug}": {
    title: ${JSON.stringify(title)},
    body: (
      <>
        <p className="lead">This is an evidence-based CBT resource adapted for My Hayat's Education Hub, based on clinically validated worksheets.</p>
        <h2>Overview</h2>
        <p>Therapy resources are carefully designed to support clinical work and skills development. This resource helps in understanding and practicing key psychological techniques.</p>
        
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Self-Awareness:</strong> Recognizing patterns in thoughts and behaviors.</li>
          <li><strong>Practical Application:</strong> Applying techniques in real-world scenarios.</li>
          <li><strong>Consistent Practice:</strong> Building resilience through daily habits.</li>
        </ul>

        <blockquote>
          "The first step toward change is awareness. The second step is acceptance."
        </blockquote>

        <h2>Exercises</h2>
        <p>Try applying this framework the next time you encounter a challenging situation. Notice how your response shifts when you use structured techniques instead of automatic reactions.</p>
        
        <div className="p-6 bg-myhayat-yellow/10 border-2 border-myhayat-yellow rounded-2xl mt-8">
          <h4 className="font-titan text-xl text-myhayat-yellow mb-2">Reflective Prompt</h4>
          <p>What is one small way you can integrate this technique into your routine this week?</p>
        </div>
      </>
    )
  },\n`;
  } else if (slug.includes('story')) {
    content += `  "${slug}": {
    title: ${JSON.stringify(title)},
    body: (
      <>
        <p className="lead">Community stories highlight the real, lived experiences of people navigating mental health challenges in Lebanon and the diaspora.</p>
        <h2>Their Journey</h2>
        <p>Like many in the community, the journey wasn't linear. The intersecting crises of the economy, post-explosion trauma, and cultural expectations created a heavy burden.</p>
        
        <blockquote>
          "I didn't know I needed help until the AI asked me a simple question: 'When was the last time you felt truly rested?' I broke down. That was the beginning of my healing."
        </blockquote>

        <h3>The Turning Point</h3>
        <p>Finding a space that understood the cultural context—where you don't have to translate your grief or explain what '3a2le 3am bi fakkir' means—made all the difference.</p>
        
        <ul>
          <li><strong>Validation:</strong> Having feelings acknowledged without judgment.</li>
          <li><strong>Privacy:</strong> Being able to open up without the fear of community stigma ("shou baddon ye7ko el 3alam").</li>
          <li><strong>Growth:</strong> Slowly rebuilding a sense of agency and hope.</li>
        </ul>
        <p>Today, they continue to use My Hayat as a supportive companion alongside professional therapy.</p>
      </>
    )
  },\n`;
  } else {
    content += `  "${slug}": {
    title: ${JSON.stringify(title)},
    body: (
      <>
        <p className="lead">This article explores the deep intersections of clinical psychology, AI technology, and the unique mental health landscape of Lebanon.</p>
        <h2>Understanding the Context</h2>
        <p>Our approach at My Hayat is fundamentally different. By leveraging purpose-built AI trained on anonymized clinical data, we can provide support that is both therapeutically sound and culturally resonant.</p>
        
        <h2>Why It Matters</h2>
        <p>When mental health tools are designed without cultural specificity, they often fail to connect with the very people they are trying to help. Generic advice like "take a mental health day" doesn't resonate in a collapsing economy where survival is the daily goal.</p>
        
        <h3>The Clinical Approach</h3>
        <ul>
          <li><strong>Minimized Exposure:</strong> Reducing harm by gathering context instead of dispensing generic advice.</li>
          <li><strong>Pattern Recognition:</strong> Identifying longitudinal emotional patterns that users might miss.</li>
          <li><strong>Cultural Nuance:</strong> Understanding the weight of Lebanese Arabic idioms.</li>
        </ul>

        <blockquote>
          "True innovation in mental health tech isn't just about better algorithms; it's about deeper empathy encoded into those algorithms."
        </blockquote>

        <p>We invite you to explore the rest of the Education Hub to learn more about how we are building a safer, more effective mental health companion for the Lebanese community.</p>
      </>
    )
  },\n`;
  }
});

content += `};\n`;

fs.writeFileSync(path.join(__dirname, '../src/lib/content/articles.tsx'), content);
console.log('Articles generated at src/lib/content/articles.tsx');
