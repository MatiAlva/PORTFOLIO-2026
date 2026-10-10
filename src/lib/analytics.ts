/**
 * Privacy-first analytics adapter. Nothing loads unless VITE_ANALYTICS_PROVIDER is set.
 *
 * Supported providers:
 *  - plausible → VITE_ANALYTICS_ID = your domain
 *  - umami     → VITE_ANALYTICS_ID = website id
 *  - ga4       → VITE_ANALYTICS_ID = measurement id (consider a consent banner first)
 *
 * To add another provider, extend `providers` with a `load`, `pageview` and `event` triple.
 */
type EventProps = Record<string, string | number | boolean>;

interface Provider {
  load: (id: string, src?: string) => void;
  pageview: (path: string) => void;
  event: (name: string, props?: EventProps) => void;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string; props?: EventProps }) => void;
    umami?: { track: (event?: string, props?: EventProps) => void };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function injectScript(src: string, attributes: Record<string, string> = {}) {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

const providers: Record<string, Provider> = {
  plausible: {
    load: (id, src = 'https://plausible.io/js/script.manual.js') =>
      injectScript(src, { 'data-domain': id }),
    pageview: (path) => window.plausible?.('pageview', { u: location.origin + path }),
    event: (name, props) => window.plausible?.(name, { props }),
  },
  umami: {
    load: (id, src = 'https://cloud.umami.is/script.js') =>
      injectScript(src, { 'data-website-id': id, 'data-auto-track': 'false' }),
    pageview: () => window.umami?.track(),
    event: (name, props) => window.umami?.track(name, props),
  },
  ga4: {
    load: (id) => {
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag('js', new Date());
      window.gtag('config', id, { send_page_view: false });
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
    },
    pageview: (path) => window.gtag?.('event', 'page_view', { page_path: path }),
    event: (name, props) => window.gtag?.('event', name, props),
  },
};

const providerName = import.meta.env.VITE_ANALYTICS_PROVIDER;
const providerId = import.meta.env.VITE_ANALYTICS_ID;
const provider = providerName && providerId ? providers[providerName] : undefined;

let loaded = false;

export function initAnalytics(): void {
  if (!provider || !providerId || loaded) return;
  loaded = true;
  const load = () => provider.load(providerId, import.meta.env.VITE_ANALYTICS_SRC || undefined);
  if ('requestIdleCallback' in window) window.requestIdleCallback(load);
  else setTimeout(load, 1);
}

export function trackPageview(path: string): void {
  provider?.pageview(path);
}

export function trackEvent(name: string, props?: EventProps): void {
  provider?.event(name, props);
}
