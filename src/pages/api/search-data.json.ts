import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Static services data (from src/pages/*.astro service pages)
const services = [
  {
    type: 'service',
    title: 'IV Therapy',
    description: 'High-dose intravenous vitamin and mineral therapy for rapid nutrient delivery, energy support, and immune function.',
    url: '/iv-therapy',
    category: 'Injectable Therapies'
  },
  {
    type: 'service',
    title: 'IV Vitamin C',
    description: 'High-dose intravenous vitamin C therapy for immune support, antioxidant protection, and overall wellness.',
    url: '/iv-vitamin-c',
    category: 'Injectable Therapies'
  },
  {
    type: 'service',
    title: 'NAD+ Therapy',
    description: 'NAD+ infusions for cellular energy, anti-aging support, cognitive function, and metabolic health.',
    url: '/nad-therapy',
    category: 'Injectable Therapies'
  },
  {
    type: 'service',
    title: 'Prolotherapy',
    description: 'Regenerative injection therapy to strengthen ligaments, tendons, and joints for lasting pain relief.',
    url: '/prolotherapy',
    category: 'Pain Management'
  },
  {
    type: 'service',
    title: 'Prolozone Therapy',
    description: 'Ozone injection therapy combining prolotherapy with medical ozone for enhanced tissue healing.',
    url: '/prolozone',
    category: 'Pain Management'
  },
  {
    type: 'service',
    title: 'Acupuncture',
    description: 'Traditional Chinese medicine acupuncture for pain relief, stress reduction, and overall wellness.',
    url: '/acupuncture',
    category: 'Pain Management'
  },
  {
    type: 'service',
    title: 'Clinical Nutrition',
    description: 'Evidence-based nutritional counseling and dietary planning for optimal health and disease prevention.',
    url: '/clinical-nutrition',
    category: 'Naturopathic Medicine'
  },
  {
    type: 'service',
    title: 'Herbal Medicine',
    description: 'Traditional and modern herbal medicine for natural treatment of various health conditions.',
    url: '/herbal-medicine',
    category: 'Naturopathic Medicine'
  },
  {
    type: 'service',
    title: 'Laboratory Testing',
    description: 'Comprehensive lab testing including blood work, hormone panels, and nutritional assessments.',
    url: '/lab-testing',
    category: 'Diagnostic Services'
  },
  {
    type: 'service',
    title: 'Thyroid Testing',
    description: 'Comprehensive thyroid panel testing for optimal thyroid function assessment.',
    url: '/thyroid-testing',
    category: 'Diagnostic Services'
  },
  {
    type: 'service',
    title: 'Chelation Therapy',
    description: 'EDTA chelation therapy for heavy metal detoxification and cardiovascular support.',
    url: '/chelation-therapy',
    category: 'Injectable Therapies'
  }
];

// Static conditions data (from src/pages/*.astro condition pages)
const conditions = [
  {
    type: 'condition',
    title: 'Low Back Pain',
    description: 'Comprehensive treatment for acute and chronic lower back pain using prolotherapy, acupuncture, and natural therapies.',
    url: '/low-back-pain',
    category: 'Musculoskeletal'
  },
  {
    type: 'condition',
    title: 'Fibromyalgia',
    description: 'Holistic approach to fibromyalgia management including IV therapy, nutrition, and pain management strategies.',
    url: '/fibromyalgia',
    category: 'Pain Conditions'
  },
  {
    type: 'condition',
    title: 'Chronic Fatigue Syndrome',
    description: 'Natural treatment approaches for chronic fatigue syndrome including IV therapy and nutritional support.',
    url: '/chronic-fatigue-syndrome',
    category: 'Fatigue Conditions'
  },
  {
    type: 'condition',
    title: 'Sports Medicine',
    description: 'Natural sports medicine approaches for injury recovery, performance optimization, and athletic health.',
    url: '/sports-medicine',
    category: 'Sports & Performance'
  },
  {
    type: 'condition',
    title: 'Prolotherapy for Arthritis',
    description: 'Regenerative prolotherapy treatment for osteoarthritis and joint pain relief.',
    url: '/prolotherapy-for-arthritis',
    category: 'Musculoskeletal'
  },
  {
    type: 'condition',
    title: 'Prolotherapy for Back Pain',
    description: 'Prolotherapy injections for chronic back pain, disc problems, and spinal instability.',
    url: '/prolotherapy-for-back-pain',
    category: 'Musculoskeletal'
  },
  {
    type: 'condition',
    title: 'Prolotherapy for Tendon Injuries',
    description: 'Regenerative injection therapy for tendon injuries, tendinitis, and tendinopathy.',
    url: '/prolotherapy-for-tendon-injuries',
    category: 'Musculoskeletal'
  },
  {
    type: 'condition',
    title: 'Osgood-Schlatter Disease',
    description: 'Prolotherapy treatment for Osgood-Schlatter disease and knee pain in young athletes.',
    url: '/prolotherapy-for-osgood-schlatter',
    category: 'Musculoskeletal'
  }
];

export const GET: APIRoute = async () => {
  try {
    // Get all articles (exclude drafts)
    const articles = await getCollection('articles', ({ data }) => {
      return data.draft !== true;
    });

    // Get all content collection pages
    const pages = await getCollection('pages');

    // Format articles for search
    const articleData = articles.map(article => ({
      type: 'article',
      title: article.data.title,
      description: article.data.description || '',
      url: `/articles/${article.slug}`,
      category: article.data.categories?.[0] || 'Health',
      tags: article.data.tags || [],
      publishDate: article.data.publishDate
    }));

    // Format content collection pages (these are additional conditions/treatments)
    const pageData = pages.map(page => ({
      type: 'condition',
      title: page.data.title,
      description: page.data.description || '',
      url: `/${page.slug}`,
      category: 'Conditions & Treatments'
    }));

    const searchData = {
      articles: articleData,
      services: services,
      conditions: [...conditions, ...pageData]
    };

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error generating search data:', error);
    return new Response(JSON.stringify({ articles: [], services: [], conditions: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
