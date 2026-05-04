import type { CollectionEntry } from 'astro:content';

export const articleTopics = [
  {
    id: 'pain-injuries',
    label: 'Pain & Injuries',
    title: 'Pain & Injury Articles',
    description: 'Articles on pain, sports injuries, prolotherapy and recovery from Dr. Colin MacLeod ND in Bedford, Nova Scotia.',
    intro: 'Articles on pain, sports injuries, prolotherapy and recovery.',
    focusKeyword: 'pain injury naturopathic articles Halifax Bedford',
  },
  {
    id: 'digestive-health',
    label: 'Digestive Health',
    title: 'Digestive Health Articles',
    description: 'Articles on digestive health, gut health, IBS, IBD and nutrition from Dr. Colin MacLeod ND in Bedford, Nova Scotia.',
    intro: 'Articles on digestive health, gut health, IBS, IBD and nutrition.',
    focusKeyword: 'digestive health naturopathic articles Halifax Bedford',
  },
  {
    id: 'hormones',
    label: 'Hormones',
    title: 'Hormone Health Articles',
    description: 'Articles on hormone health, PCOS, PMS, acne and related naturopathic care from Dr. Colin MacLeod ND.',
    intro: 'Articles on hormone health, PCOS, PMS, acne and related care.',
    focusKeyword: 'hormone health naturopathic articles Halifax Bedford',
  },
  {
    id: 'mental-health',
    label: 'Mental Health',
    title: 'Mental Health Articles',
    description: 'Articles on stress, sleep, anxiety, depression and the gut-brain connection from Dr. Colin MacLeod ND.',
    intro: 'Articles on stress, sleep, mood and the gut-brain connection.',
    focusKeyword: 'mental health naturopathic articles Halifax Bedford',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    title: 'Nutrition Articles',
    description: 'Articles on clinical nutrition, supplements, herbal medicine and evidence-informed natural health from Dr. Colin MacLeod ND.',
    intro: 'Articles on clinical nutrition, supplements, herbal medicine and natural health.',
    focusKeyword: 'clinical nutrition naturopathic articles Halifax Bedford',
  },
  {
    id: 'iv-therapy',
    label: 'IV Therapy',
    title: 'IV Therapy Articles',
    description: 'Articles on IV therapy, vitamin C, glutathione, Myers cocktail and post-viral recovery from Dr. Colin MacLeod ND.',
    intro: 'Articles on IV therapy, vitamin C, glutathione and post-viral recovery.',
    focusKeyword: 'IV therapy articles Halifax Bedford',
  },
  {
    id: 'heart-metabolic',
    label: 'Heart & Metabolic',
    title: 'Heart & Metabolic Health Articles',
    description: 'Articles on blood pressure, blood sugar, weight, cardiovascular and metabolic health from Dr. Colin MacLeod ND.',
    intro: 'Articles on blood pressure, blood sugar, cardiovascular and metabolic health.',
    focusKeyword: 'heart metabolic health naturopathic articles Halifax Bedford',
  },
  {
    id: 'immune-health',
    label: 'Immune Health',
    title: 'Immune Health Articles',
    description: 'Articles on immune health, autoimmune conditions, respiratory health and post-viral recovery from Dr. Colin MacLeod ND.',
    intro: 'Articles on immune health, autoimmune conditions, respiratory health and recovery.',
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
  'nutrition': ['nutrition', 'herbal medicine', 'adaptogens', 'magnesium', 'creatine', 'electrolytes', 'nutrients', 'diet'],
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
