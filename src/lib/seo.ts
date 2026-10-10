import type { SiteConfig } from '@/types/content';

export interface SeoInput {
  title?: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * Keeps head tags in sync during client-side navigation and language changes. The initial
 * HTML for every route is already generated at build time by `scripts/seo-plugin.ts`.
 */
export function applySeo(
  site: SiteConfig,
  { title, description = site.description, path, type = 'website', noindex = false }: SeoInput,
) {
  const fullTitle = title ? site.seo.titleTemplate.replace('%s', title) : site.seo.defaultTitle;
  const url = new URL(path, import.meta.env.VITE_SITE_URL || site.url).toString();

  document.title = fullTitle;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:type', type);
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', description);
  upsertCanonical(url);
  upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
}
