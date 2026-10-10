import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scrolls to `#section` on load and on every in-app navigation to a hash. */
export function useHashScroll(): void {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash, key]);
}
