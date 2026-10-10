import { useSyncExternalStore } from 'react';
import { bootStore, type BootSnapshot } from '@/lib/boot';

export function useBoot(): BootSnapshot {
  return useSyncExternalStore(bootStore.subscribe, bootStore.getSnapshot);
}
