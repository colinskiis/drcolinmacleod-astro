import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    publishDate: z.date(),
    modifiedDate: z.date().optional(),
    author: z.string().default('Dr. Colin MacLeod, ND'),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      focusKeyword: z.string().optional(),
    }).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const pages = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['condition', 'treatment']).default('condition'),
    pageTemplate: z.enum(['legacy', 'clinical']).default('legacy'),
    modifiedDate: z.date().optional(),
    relatedLinks: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    cta: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      focusKeyword: z.string().optional(),
    }).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  articles,
  pages,
};
