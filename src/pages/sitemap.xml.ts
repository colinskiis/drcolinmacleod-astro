import { getCollection } from 'astro:content';

export async function GET() {
  const articles = await getCollection('articles');
  const pages = await getCollection('pages');
  
  const baseUrl = 'https://drcolinmacleod.com';
  
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/services', changefreq: 'monthly', priority: '0.9' },
    { url: '/conditions', changefreq: 'monthly', priority: '0.8' },
    { url: '/articles', changefreq: 'weekly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.6' },
    { url: '/patient-resources', changefreq: 'monthly', priority: '0.7' },
  ];

  const articlePages = articles.map(article => ({
    url: `/articles/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: article.data.modifiedDate || article.data.publishDate
  }));

  const treatmentPages = pages
    .filter(page => !['about.md', 'contact.md', 'services.md'].includes(page.id))
    .map(page => ({
      url: `/${page.slug}`,
      changefreq: 'monthly',
      priority: '0.7'
    }));

  const patientInfoPages = [
    { url: '/patient-info/new-patient-guide', changefreq: 'monthly', priority: '0.6' },
    { url: '/patient-info/iv-therapy-guide', changefreq: 'monthly', priority: '0.6' },
    { url: '/patient-info/prolotherapy-guide', changefreq: 'monthly', priority: '0.6' },
    { url: '/patient-info/lab-testing-guide', changefreq: 'monthly', priority: '0.6' },
  ];

  const allPages = [...staticPages, ...articlePages, ...treatmentPages, ...patientInfoPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}