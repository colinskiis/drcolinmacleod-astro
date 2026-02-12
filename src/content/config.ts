import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    publishDate: z.date(),
    modifiedDate: z.date().optional(),
    author: z.string().default('Dr. Colin MacLeod ND'),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      focusKeyword: z.string().optional(),
    }).optional(),
  }),
});

const pages = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    modifiedDate: z.date().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      focusKeyword: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  articles,
  pages,
};