import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

/** False while the tab is hidden, so expensive loops can pause. */
export function usePageVisible(): boolean {
  return useSyncExternalStore(subscribe, () => document.visibilityState === 'visible');
}
