import type { CollectionEntry } from 'astro:content';

export type ArticleSearchEntry = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
};

export function toArticleSearchIndex(
  articles: CollectionEntry<'articles'>[]
): ArticleSearchEntry[] {
  return articles.map((article) => ({
    slug: article.slug,
    title: article.data.title,
    description: article.data.description,
    tags: article.data.tags ?? [],
    categories: article.data.categories ?? [],
  }));
}
