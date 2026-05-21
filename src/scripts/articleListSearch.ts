import Fuse from 'fuse.js';

class ArticleListSearch {
  fuse: Fuse<{ slug: string; title: string; description: string; tags: string[]; categories: string[] }>;
  abortController = new AbortController();
  debounceTimer: ReturnType<typeof setTimeout> | null = null;
  listId: string;
  statusId: string;
  emptyId: string;
  totalCount: number;

  constructor(root: HTMLElement) {
    const configEl = root.querySelector('script[type="application/json"]');
    const entries = configEl?.textContent ? JSON.parse(configEl.textContent) : [];

    this.listId = root.dataset.listId || 'article-list';
    this.statusId = root.dataset.statusId || 'article-search-status';
    this.emptyId = root.dataset.emptyId || 'article-search-empty';
    this.totalCount = Number(root.dataset.totalCount || entries.length);

    this.fuse = new Fuse(entries, {
      keys: ['title', 'description', 'tags', 'categories'],
      threshold: 0.35,
      includeScore: true,
    });

    this.init();
  }

  destroy() {
    this.abortController.abort();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  init() {
    const signal = this.abortController.signal;
    const input = document.getElementById('article-search-input');
    input?.addEventListener('input', () => {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.applyFilter(input.value.trim()), 200);
    }, { signal });
    document.addEventListener('astro:before-swap', () => this.destroy(), { signal });
  }

  getItems() {
    const list = document.getElementById(this.listId);
    if (!list) return [];
    return Array.from(list.querySelectorAll<HTMLElement>('[data-article-search-item]'));
  }

  applyFilter(query: string) {
    const items = this.getItems();
    const status = document.getElementById(this.statusId);
    const empty = document.getElementById(this.emptyId);

    if (!query) {
      items.forEach((item) => item.classList.remove('hidden'));
      if (status) status.textContent = `Showing all ${this.totalCount} articles.`;
      empty?.classList.add('hidden');
      return;
    }

    const results = this.fuse.search(query);
    const visibleSlugs = new Set(results.map((result) => result.item.slug));

    items.forEach((item) => {
      const slug = item.getAttribute('data-article-slug');
      if (slug && visibleSlugs.has(slug)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    const visibleCount = items.filter((item) => !item.classList.contains('hidden')).length;

    if (status) {
      status.textContent =
        visibleCount === 0
          ? 'No articles match your search.'
          : `Showing ${visibleCount} of ${this.totalCount} articles.`;
    }

    if (empty) {
      if (visibleCount === 0) {
        empty.classList.remove('hidden');
      } else {
        empty.classList.add('hidden');
      }
    }
  }
}

declare global {
  interface Window {
    __articleListSearch?: ArticleListSearch;
  }
}

function boot() {
  const root = document.querySelector<HTMLElement>('[data-article-search-root]');
  const list = document.getElementById('article-list');
  if (!root || !document.getElementById('article-search-input') || !list) return;

  window.__articleListSearch?.destroy();
  window.__articleListSearch = new ArticleListSearch(root);
}

let bootAttempts = 0;

function scheduleBoot() {
  if (!document.querySelector('[data-article-search-root]')) return;
  if (document.getElementById('article-list')) {
    boot();
    bootAttempts = 0;
    return;
  }
  if (bootAttempts < 30) {
    bootAttempts += 1;
    requestAnimationFrame(scheduleBoot);
  }
}

scheduleBoot();
document.addEventListener('astro:page-load', scheduleBoot);
