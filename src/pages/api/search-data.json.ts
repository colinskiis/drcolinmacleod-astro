import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    // Get all articles
    const articles = await getCollection('articles');
    
    // Format articles for search
    const searchData = {
      articles: articles.map(article => ({
        type: 'article',
        title: article.data.title,
        description: article.data.description || article.data.excerpt || '',
        url: `/articles/${article.slug}`,
        category: article.data.categories?.[0] || 'Health',
        tags: article.data.tags || [],
        publishDate: article.data.publishDate
      }))
    };

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error generating search data:', error);
    return new Response(JSON.stringify({ articles: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};