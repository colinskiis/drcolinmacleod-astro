import Fuse from 'fuse.js';

type ArticleSearchEntry = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
};

class ArticleListSearch {
  fuse: Fuse<ArticleSearchEntry>;
  abortController = new AbortController();
  debounceTimer: ReturnType<typeof setTimeout> | null = null;
  listId: string;
  statusId: string;
  emptyId: string;
  totalCount: number;

  constructor(root: HTMLElement) {
    const configEl = root.querySelector('script[type="application/json"]');
    const entries: ArticleSearchEntry[] = configEl?.textContent
      ? JSON.parse(configEl.textContent)
      : [];

    this.listId = root.dataset.listId || 'article-list';
    this.statusId = root.dataset.statusId || 'article-search-status';
    this.emptyId = root.dataset.emptyId || 'article-search-empty';
    this.totalCount = Number(root.dataset.totalCount || entries.length);

    this.fuse = new Fuse(entries, {
      keys: ['title', 'description', 'tags', 'categories'],
      threshold: 0.35,
      includeScore: true,
    });

    this.cacheSearchableText();
    this.init();
  }

  destroy() {
    this.abortController.abort();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  cacheSearchableText() {
    for (const item of this.getItems()) {
      const titleEl = item.querySelector<HTMLElement>('.article-search-title');
      const descEl = item.querySelector<HTMLElement>('.article-search-description');
      if (titleEl && !titleEl.dataset.searchText) {
        titleEl.dataset.searchText = titleEl.textContent?.trim() ?? '';
      }
      if (descEl && !descEl.dataset.searchText) {
        descEl.dataset.searchText = descEl.textContent?.trim() ?? '';
      }
    }
  }

  init() {
    const signal = this.abortController.signal;
    const input = document.getElementById('article-search-input') as HTMLInputElement | null;
    if (!input) return;

    const initialQuery = this.readQueryFromUrl();
    if (initialQuery) {
      input.value = initialQuery;
      this.applyFilter(initialQuery, false);
    }

    input.addEventListener(
      'input',
      () => {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          const query = input.value.trim();
          this.applyFilter(query, true);
        }, 200);
      },
      { signal }
    );

    document.addEventListener('astro:before-swap', () => this.destroy(), { signal });
  }

  readQueryFromUrl() {
    return new URLSearchParams(window.location.search).get('q')?.trim() ?? '';
  }

  syncQueryToUrl(query: string) {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    history.replaceState({}, '', url);
  }

  getItems() {
    const list = document.getElementById(this.listId);
    if (!list) return [];
    return Array.from(list.querySelectorAll<HTMLElement>('[data-article-search-item]'));
  }

  applyFilter(query: string, syncUrl = true) {
    const items = this.getItems();
    const status = document.getElementById(this.statusId);
    const empty = document.getElementById(this.emptyId);

    if (syncUrl) {
      this.syncQueryToUrl(query);
    }

    if (!query) {
      items.forEach((item) => {
        item.classList.remove('hidden');
        this.clearHighlight(item);
      });
      if (status) status.textContent = `Showing all ${this.totalCount} articles.`;
      empty?.classList.add('hidden');
      return;
    }

    const results = this.fuse.search(query);
    const visibleSlugs = new Set(results.map((result) => result.item.slug));

    items.forEach((item) => {
      const slug = item.getAttribute('data-article-slug');
      const visible = Boolean(slug && visibleSlugs.has(slug));
      if (visible) {
        item.classList.remove('hidden');
        this.applyHighlight(item, query);
      } else {
        item.classList.add('hidden');
        this.clearHighlight(item);
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

  applyHighlight(item: HTMLElement, query: string) {
    const titleEl = item.querySelector<HTMLElement>('.article-search-title');
    const descEl = item.querySelector<HTMLElement>('.article-search-description');
    if (titleEl?.dataset.searchText) {
      titleEl.innerHTML = highlightPlainText(titleEl.dataset.searchText, query);
    }
    if (descEl?.dataset.searchText) {
      descEl.innerHTML = highlightPlainText(descEl.dataset.searchText, query);
    }
  }

  clearHighlight(item: HTMLElement) {
    const titleEl = item.querySelector<HTMLElement>('.article-search-title');
    const descEl = item.querySelector<HTMLElement>('.article-search-description');
    if (titleEl?.dataset.searchText) {
      titleEl.textContent = titleEl.dataset.searchText;
    }
    if (descEl?.dataset.searchText) {
      descEl.textContent = descEl.dataset.searchText;
    }
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightPlainText(text: string, query: string) {
  const escaped = escapeHtml(text);
  const terms = query
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1)
    .map(escapeRegex);

  if (terms.length === 0) {
    return escaped;
  }

  const pattern = new RegExp(`(${terms.join('|')})`, 'gi');
  return escaped.replace(
    pattern,
    '<mark class="rounded bg-emerald-100 px-0.5 text-emerald-950 not-italic">$1</mark>'
  );
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
