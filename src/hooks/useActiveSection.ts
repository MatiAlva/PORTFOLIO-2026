import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/** Tracks which section crosses the middle band of the viewport on the current page. */
export function useActiveSection(ids: string[]): string | null {
  const { pathname } = useLocation();
  // Tagged with the pathname so a value observed on another page is never reported.
  const [active, setActive] = useState<{ pathname: string; id: string } | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive({ pathname, id: visible.target.id });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    const observeSections = () => {
      for (const id of key.split('|')) {
        const element = document.getElementById(id);
        if (element && !observed.has(element)) {
          observed.add(element);
          observer.observe(element);
        }
      }
    };
    observeSections();

    // Sections mount progressively and page transitions swap <main> after a route change.
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [key, pathname]);

  return active?.pathname === pathname ? active.id : null;
}
