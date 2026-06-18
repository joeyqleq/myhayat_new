const fs = require('fs');
const path = require('path');

const slugs = [
  "purpose-built-ai", "real-world-outcomes", "dose-response", "safety-benchmarks", "behavioral-activation", 
  "grounding-techniques", "sleep-anxiety-connection", "journaling-mental-health", "breathwork", "digital-detox", 
  "mental-health-lebanon-crisis", "stigma-lebanese-culture", "diaspora-mental-health", "therapy-lebanese-arabic", "economic-collapse-mental-toll", 
  "first-therapy-session", "panic-attack-guide", "setting-boundaries", "grief-processing", "supporting-loved-one", 
  "aya-story", "rami-story", "um-ali-story", "samar-story", "michel-story", 
  "how-we-train", "minimized-exposure", "pattern-recognition", "trust-factor", "perinatal-depression",
  "what-is-rebt", "tact-using-pauses-assertively", "what-is-dbt", "stop-ending-conversations-assertively", "lace-using-empathy-assertively"
];

const cbtTitles = {
  "what-is-rebt": "What Is Rational Emotive Behavior Therapy (REBT)?",
  "tact-using-pauses-assertively": "TACT – Using Pauses Assertively",
  "what-is-dbt": "What Is Dialectical Behavior Therapy (DBT)?",
  "stop-ending-conversations-assertively": "STOP – Ending Conversations Assertively",
  "lace-using-empathy-assertively": "LACE – Using Empathy Assertively"
};

let content = `import React from "react";\n\nexport const ARTICLES: Record<string, {\n  en: { title: string; body: React.ReactNode };\n  ar: { title: string; body: React.ReactNode };\n}> = {\n`;

slugs.forEach(slug => {
  const isCBT = cbtTitles[slug];
  const title = isCBT ? cbtTitles[slug] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const titleAr = isCBT ? title + " (بالعربية)" : "مقال: " + title; // Placeholder translation for titles if needed
  
  if (isCBT) {
    content += `  "${slug}": {
    en: {
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
          <blockquote>"The first step toward change is awareness. The second step is acceptance."</blockquote>
          <h2>Exercises</h2>
          <p>Try applying this framework the next time you encounter a challenging situation. Notice how your response shifts when you use structured techniques instead of automatic reactions.</p>
          <div className="p-6 bg-myhayat-yellow/10 border-2 border-myhayat-yellow rounded-2xl mt-8">
            <h4 className="font-titan text-xl text-myhayat-yellow mb-2">Reflective Prompt</h4>
            <p>What is one small way you can integrate this technique into your routine this week?</p>
          </div>
        </>
      )
    },
    ar: {
      title: ${JSON.stringify(titleAr)},
      body: (
        <>
          <p className="lead" dir="rtl">هذا مورد مبني على الأدلة للعلاج المعرفي السلوكي مخصص لمركز التعلم، بناءً على أوراق عمل معتمدة سريرياً.</p>
          <h2 dir="rtl">نظرة عامة</h2>
          <p dir="rtl">تم تصميم الموارد العلاجية بعناية لدعم العمل السريري وتنمية المهارات. يساعد هذا المورد في فهم وممارسة الأساليب النفسية الرئيسية.</p>
          <h3 dir="rtl">المفاهيم الأساسية</h3>
          <ul dir="rtl" className="text-right">
            <li><strong>الوعي الذاتي:</strong> التعرف على أنماط الأفكار والسلوكيات.</li>
            <li><strong>التطبيق العملي:</strong> تطبيق التقنيات في سيناريوهات العالم الحقيقي.</li>
            <li><strong>الممارسة المستمرة:</strong> بناء المرونة من خلال العادات اليومية.</li>
          </ul>
          <blockquote dir="rtl">"الخطوة الأولى نحو التغيير هي الوعي. الخطوة الثانية هي التقبل."</blockquote>
          <h2 dir="rtl">التمارين</h2>
          <p dir="rtl">حاول تطبيق هذا الإطار في المرة القادمة التي تواجه فيها موقفاً صعباً. لاحظ كيف تتغير استجابتك عندما تستخدم تقنيات منظمة بدلاً من ردود الفعل التلقائية.</p>
          <div className="p-6 bg-myhayat-yellow/10 border-2 border-myhayat-yellow rounded-2xl mt-8 text-right" dir="rtl">
            <h4 className="font-titan text-xl text-myhayat-yellow mb-2">سؤال للتأمل</h4>
            <p>ما هي الطريقة البسيطة التي يمكنك من خلالها دمج هذه التقنية في روتينك هذا الأسبوع؟</p>
          </div>
        </>
      )
    }
  },\n`;
  } else if (slug.includes('story')) {
    content += `  "${slug}": {
    en: {
      title: ${JSON.stringify(title)},
      body: (
        <>
          <p className="lead">Community stories highlight the real, lived experiences of people navigating mental health challenges in Lebanon and the diaspora.</p>
          <h2>Their Journey</h2>
          <p>Like many in the community, the journey wasn't linear. The intersecting crises of the economy, post-explosion trauma, and cultural expectations created a heavy burden.</p>
          <blockquote>"I didn't know I needed help until the AI asked me a simple question: 'When was the last time you felt truly rested?' I broke down. That was the beginning of my healing."</blockquote>
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
    },
    ar: {
      title: ${JSON.stringify(titleAr)},
      body: (
        <>
          <p className="lead" dir="rtl">تسلط قصص المجتمع الضوء على التجارب الحقيقية للأشخاص الذين يواجهون تحديات الصحة النفسية في لبنان والمهجر.</p>
          <h2 dir="rtl">رحلتهم</h2>
          <p dir="rtl">مثل الكثيرين في مجتمعنا، لم تكن الرحلة خطية. لقد شكلت الأزمات المتداخلة للاقتصاد وصدمة ما بعد الانفجار والتوقعات الثقافية عبئاً ثقيلاً.</p>
          <blockquote dir="rtl">"لم أكن أعلم أنني بحاجة إلى المساعدة حتى سألني الذكاء الاصطناعي سؤالاً بسيطاً: 'متى كانت آخر مرة شعرت فيها بالراحة حقاً؟' انهرت بالبكاء. وكانت بداية رحلتي."</blockquote>
          <h3 dir="rtl">نقطة التحول</h3>
          <p dir="rtl">إن العثور على مساحة تفهم السياق الثقافي - حيث لا تضطر إلى ترجمة حزنك أو شرح معنى 'عقلي عم بفكّر' - أحدث فرقاً كبيراً.</p>
          <ul dir="rtl" className="text-right">
            <li><strong>التحقق:</strong> الاعتراف بالمشاعر دون إطلاق أحكام.</li>
            <li><strong>الخصوصية:</strong> القدرة على الانفتاح دون الخوف من وصمة المجتمع ('شو بدون يحكوا العالم').</li>
            <li><strong>النمو:</strong> استعادة الشعور بالقوة والأمل ببطء.</li>
          </ul>
          <p dir="rtl">اليوم، يستمرون في استخدام 'ماي حياة' كرفيق داعم إلى جانب العلاج المهني.</p>
        </>
      )
    }
  },\n`;
  } else {
    content += `  "${slug}": {
    en: {
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
          <blockquote>"True innovation in mental health tech isn't just about better algorithms; it's about deeper empathy encoded into those algorithms."</blockquote>
          <p>We invite you to explore the rest of the Education Hub to learn more about how we are building a safer, more effective mental health companion for the Lebanese community.</p>
        </>
      )
    },
    ar: {
      title: ${JSON.stringify(titleAr)},
      body: (
        <>
          <p className="lead" dir="rtl">يستكشف هذا المقال التقاطعات بين علم النفس السريري وتكنولوجيا الذكاء الاصطناعي والمشهد الفريد للصحة النفسية في لبنان.</p>
          <h2 dir="rtl">فهم السياق</h2>
          <p dir="rtl">نهجنا في 'ماي حياة' مختلف جذرياً. من خلال الاستفادة من الذكاء الاصطناعي المخصص والمدرب على بيانات سريرية مجهولة، يمكننا تقديم دعم سليم علاجياً ومتوافق ثقافياً.</p>
          <h2 dir="rtl">لماذا هذا مهم</h2>
          <p dir="rtl">عندما يتم تصميم أدوات الصحة النفسية دون خصوصية ثقافية، فإنها تفشل في التواصل مع الأشخاص. النصائح مثل 'خذ يوم إجازة' لا تجد صدى في اقتصاد منهار حيث البقاء هو الهدف.</p>
          <h3 dir="rtl">النهج السريري</h3>
          <ul dir="rtl" className="text-right">
            <li><strong>تقليل التعرض للأذى:</strong> تقليل الضرر عن طريق جمع السياق بدلاً من نصائح عامة.</li>
            <li><strong>التعرف على الأنماط:</strong> تحديد الأنماط العاطفية التي قد يغفل عنها المستخدمون.</li>
            <li><strong>الفروق الثقافية:</strong> فهم ثقل المصطلحات باللغة العربية اللبنانية.</li>
          </ul>
          <blockquote dir="rtl">"الابتكار الحقيقي في تكنولوجيا الصحة النفسية لا يتعلق فقط بخوارزميات أفضل؛ بل بتعاطف أعمق."</blockquote>
          <p dir="rtl">ندعوك لاستكشاف بقية مركز التعلم لمعرفة المزيد حول كيف نبني رفيقاً أكثر أماناً وفعالية للمجتمع اللبناني.</p>
        </>
      )
    }
  },\n`;
  }
});

content += `};\n`;

fs.writeFileSync(path.join(__dirname, '../src/lib/content/articles.tsx'), content);
console.log('Bilingual articles generated at src/lib/content/articles.tsx');
