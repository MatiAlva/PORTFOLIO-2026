import { useSyncExternalStore } from 'react';

const TICK_MS = 1000 * 15;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, TICK_MS);
  return () => window.clearInterval(id);
}

/** Formatted wall-clock time in a given IANA timezone, refreshed every few seconds. */
export function useLocalTime(timeZone: string): string {
  return useSyncExternalStore(subscribe, () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(
      new Date(),
    ),
  );
}
