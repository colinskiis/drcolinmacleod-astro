import type { CollectionEntry } from 'astro:content';

export const articleTopics = [
  {
    id: 'pain-injuries',
    label: 'Pain & Injuries',
    title: 'Pain & Injury Articles',
    description: 'Articles on pain, sports injuries, prolotherapy and recovery from Dr. Colin MacLeod, ND in Bedford, Nova Scotia.',
    intro: 'Articles on pain, sports injuries, prolotherapy and recovery.',
    overview: [
      'Pain and injury care often benefits from a clear diagnosis, a realistic recovery plan and attention to the tissues involved. These articles focus on musculoskeletal pain, sports injuries and regenerative approaches such as prolotherapy.',
      'The goal is to help readers understand when conservative care may be appropriate, when a more detailed assessment is useful and how recovery can be supported without unnecessary treatment.'
    ],
    relatedServices: [
      { label: 'Sports Medicine', href: '/sports-medicine/' },
      { label: 'Prolotherapy', href: '/prolotherapy/' },
      { label: 'Prolotherapy for Tendon Injuries', href: '/prolotherapy-for-tendon-injuries/' },
      { label: 'Low Back Pain', href: '/low-back-pain/' },
    ],
    featuredSlugs: [
      'sports-injuries-natural-treatment',
      'natural-treatments-for-arthritis',
      'recovery-enhancement-natural-approaches',
    ],
    focusKeyword: 'pain injury naturopathic articles Halifax Bedford',
  },
  {
    id: 'digestive-health',
    label: 'Digestive Health',
    title: 'Digestive Health Articles',
    description: 'Articles on digestive health, gut health, IBS, IBD and nutrition from Dr. Colin MacLeod, ND in Bedford, Nova Scotia.',
    intro: 'Articles on digestive health, gut health, IBS, IBD and nutrition.',
    overview: [
      'Digestive health can affect comfort, energy, mood and day-to-day quality of life. These articles organize information on gut symptoms, IBS and IBD, parasites, fiber and the gut-brain connection.',
      'The focus is practical and evidence-informed: understanding patterns, using testing when it is helpful and avoiding unnecessary complexity when simpler steps are enough.'
    ],
    relatedServices: [
      { label: 'Digestive Health Testing', href: '/digestive-health-testing/' },
      { label: 'Clinical Nutrition', href: '/clinical-nutrition/' },
      { label: 'Specialized Testing', href: '/specialized-testing/' },
      { label: 'Lab Testing', href: '/lab-testing/' },
    ],
    featuredSlugs: [
      'ibs-ibd-natural-treatment',
      'gut-brain-connection-mental-health',
      'fiber-the-underrated-nutrient',
    ],
    focusKeyword: 'digestive health naturopathic articles Halifax Bedford',
  },
  {
    id: 'hormones',
    label: 'Hormones',
    title: 'Hormone Health Articles',
    description: 'Articles on hormone health, PCOS, PMS, acne and related naturopathic care from Dr. Colin MacLeod, ND.',
    intro: 'Articles on hormone health, PCOS, PMS, acne and related care.',
    overview: [
      'Hormone concerns are often best understood by looking at symptoms, cycle patterns, metabolic health and appropriate lab testing together. These articles cover PCOS, PMS, acne, menopause, testosterone and fertility-related topics.',
      'The aim is to make hormone health easier to understand so care can be more targeted and less guesswork-driven.'
    ],
    relatedServices: [
      { label: 'Hormone Testing', href: '/hormone-testing/' },
      { label: 'Thyroid Testing', href: '/thyroid-testing/' },
      { label: 'Wellness Blood Work', href: '/wellness-blood-work/' },
      { label: 'Specialized Testing', href: '/specialized-testing/' },
    ],
    featuredSlugs: [
      'comprehensive-hormone-testing-halifax',
      'pcos-natural-approaches',
      'menopause-perimenopause-natural-approaches',
    ],
    focusKeyword: 'hormone health naturopathic articles Halifax Bedford',
  },
  {
    id: 'mental-health',
    label: 'Mental Health',
    title: 'Mental Health Articles',
    description: 'Articles on stress, sleep, anxiety, depression and the gut-brain connection from Dr. Colin MacLeod, ND.',
    intro: 'Articles on stress, sleep, mood and the gut-brain connection.',
    overview: [
      'Mental health is influenced by sleep, stress physiology, nutrition, digestion, movement and the broader medical picture. These articles cover anxiety, depression, sleep, stress and the gut-brain connection.',
      'This section is intended as a resource for people looking for grounded, supportive ways to understand factors that may be affecting mood and resilience.'
    ],
    relatedServices: [
      { label: 'Clinical Nutrition', href: '/clinical-nutrition/' },
      { label: 'Wellness Blood Work', href: '/wellness-blood-work/' },
      { label: 'Acupuncture', href: '/acupuncture/' },
      { label: 'Lab Testing', href: '/lab-testing/' },
    ],
    featuredSlugs: [
      'gut-brain-connection-mental-health',
      'natural-anxiety-management',
      'sleep-optimization-evidence-based-strategies',
    ],
    focusKeyword: 'mental health naturopathic articles Halifax Bedford',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    title: 'Nutrition Articles',
    description: 'Articles on clinical nutrition, supplements, herbal medicine and evidence-informed natural health from Dr. Colin MacLeod, ND.',
    intro: 'Articles on clinical nutrition, supplements, herbal medicine and natural health.',
    overview: [
      'Nutrition and natural health recommendations work best when they are specific enough to matter and simple enough to follow. These articles cover food, supplements, herbal medicine, nutrient status and practical prevention.',
      'The emphasis is on useful information that can support better decisions without turning health into a collection of trends.'
    ],
    relatedServices: [
      { label: 'Clinical Nutrition', href: '/clinical-nutrition/' },
      { label: 'Nutrient Testing', href: '/nutrient-testing/' },
      { label: 'Herbal Medicine', href: '/herbal-medicine/' },
      { label: 'Wellness Blood Work', href: '/wellness-blood-work/' },
    ],
    featuredSlugs: [
      'fiber-the-underrated-nutrient',
      'creatine-beyond-muscle-building',
      'herbal-medicine-history-and-uses',
    ],
    focusKeyword: 'clinical nutrition naturopathic articles Halifax Bedford',
  },
  {
    id: 'iv-therapy',
    label: 'IV Therapy',
    title: 'IV Therapy Articles',
    description: 'Articles on IV therapy, vitamin C, glutathione, Myers cocktail and post-viral recovery from Dr. Colin MacLeod, ND.',
    intro: 'Articles on IV therapy, vitamin C, glutathione and post-viral recovery.',
    overview: [
      'IV therapy is sometimes considered when oral nutrition is not enough, when higher nutrient dosing is being considered or when recovery support needs to be individualized. These articles cover IV nutrients, vitamin C, glutathione and post-viral recovery.',
      'The goal is to clarify where IV therapy may fit, what questions are worth asking and how it relates to broader care.'
    ],
    relatedServices: [
      { label: 'IV Therapy', href: '/iv-therapy/' },
      { label: 'IV Vitamin C', href: '/iv-vitamin-c/' },
      { label: 'NAD Therapy', href: '/nad-therapy/' },
      { label: 'Glutathione', href: '/glutathione/' },
    ],
    featuredSlugs: [
      'post-viral-recovery-iv-therapy',
      'chelation-therapy-heart-disease',
      'mistletoe-a-natural-cancer-treatment',
    ],
    focusKeyword: 'IV therapy articles Halifax Bedford',
  },
  {
    id: 'heart-metabolic',
    label: 'Heart & Metabolic',
    title: 'Heart & Metabolic Health Articles',
    description: 'Articles on blood pressure, blood sugar, weight, cardiovascular and metabolic health from Dr. Colin MacLeod, ND.',
    intro: 'Articles on blood pressure, blood sugar, cardiovascular and metabolic health.',
    overview: [
      'Heart and metabolic health are strongly shaped by blood pressure, blood sugar, lipids, inflammation, exercise, nutrition and long-term risk patterns. These articles collect practical information on cardiovascular and metabolic topics.',
      'The focus is prevention, risk reduction and clearer decision-making using both standard markers and broader health context.'
    ],
    relatedServices: [
      { label: 'Wellness Blood Work', href: '/wellness-blood-work/' },
      { label: 'Clinical Nutrition', href: '/clinical-nutrition/' },
      { label: 'Chelation Therapy', href: '/chelation-therapy/' },
      { label: 'Lab Testing', href: '/lab-testing/' },
    ],
    featuredSlugs: [
      'blood-pressure-natural-strategies',
      'diabetes-prevention-blood-sugar-balance',
      'chelation-therapy-heart-disease',
    ],
    focusKeyword: 'heart metabolic health naturopathic articles Halifax Bedford',
  },
  {
    id: 'immune-health',
    label: 'Immune Health',
    title: 'Immune Health Articles',
    description: 'Articles on immune health, autoimmune conditions, respiratory health and post-viral recovery from Dr. Colin MacLeod, ND.',
    intro: 'Articles on immune health, autoimmune conditions, respiratory health and recovery.',
    overview: [
      'Immune health involves infection recovery, inflammation, respiratory health, autoimmune patterns and overall resilience. These articles bring together immune-related topics in a practical, non-alarmist way.',
      'The goal is to help readers understand what can be supported directly, what needs medical assessment and where naturopathic care may fit as part of a broader plan.'
    ],
    relatedServices: [
      { label: 'Lab Testing', href: '/lab-testing/' },
      { label: 'Specialized Testing', href: '/specialized-testing/' },
      { label: 'IV Therapy', href: '/iv-therapy/' },
      { label: 'Clinical Nutrition', href: '/clinical-nutrition/' },
    ],
    featuredSlugs: [
      'autoimmune-conditions-naturopathic-perspective',
      'immune-support-natural-approaches',
      'asthma-respiratory-health-natural',
    ],
    focusKeyword: 'immune health naturopathic articles Halifax Bedford',
  },
] as const;

export const articleTopicFilters = [
  { id: 'all', label: 'All' },
  ...articleTopics.map(({ id, label }) => ({ id, label })),
] as const;

const topicMatchers: Record<string, string[]> = {
  'pain-injuries': ['pain management', 'sports medicine', 'athletic performance', 'sports injuries', 'prolotherapy', 'arthritis', 'injury', 'athletic recovery'],
  'digestive-health': ['digestive health', 'gut', 'ibs', 'ibd', 'fiber', 'parasites'],
  'hormones': ['hormones', 'hormonal health', "women's health", "men's health", 'fertility', 'pcos', 'pms', 'menopause', 'testosterone', 'acne'],
  'mental-health': ['mental health', 'anxiety', 'depression', 'stress', 'sleep'],
  'nutrition': ['nutrition', 'herbal medicine', 'adaptogens', 'magnesium', 'creatine', 'electrolytes', 'nutrients', 'diet', 'peptides'],
  'iv-therapy': ['iv therapy', 'post-viral recovery', 'myers cocktail', 'vitamin c', 'glutathione'],
  'heart-metabolic': ['heart health', 'weight management', 'blood pressure', 'blood sugar', 'diabetes', 'berberine', 'metabolic', 'cardiovascular'],
  'immune-health': ['immune health', 'autoimmune', 'respiratory health', 'asthma', 'post-viral recovery', 'mistletoe'],
};

export function getArticleTopics(article: CollectionEntry<'articles'>) {
  const searchable = [
    article.data.title,
    ...(article.data.categories ?? []),
    ...(article.data.tags ?? []),
  ].join(' ').toLowerCase();

  return articleTopics
    .filter((topic) => topicMatchers[topic.id]?.some((term) => searchable.includes(term)))
    .map((topic) => topic.id);
}

export function getArticleTopic(topicId: string) {
  return articleTopics.find((topic) => topic.id === topicId);
}
