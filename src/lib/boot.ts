/**
 * Tiny external store that tracks what the preloader is waiting for.
 * Kept outside React so any module can report readiness without re-rendering the tree.
 */
export interface BootSnapshot {
  total: number;
  resolved: number;
  booted: boolean;
}

type Listener = () => void;

const tasks = new Map<string, boolean>();
const listeners = new Set<Listener>();
let snapshot: BootSnapshot = { total: 0, resolved: 0, booted: false };

function emit(next: Partial<BootSnapshot>) {
  const resolved = [...tasks.values()].filter(Boolean).length;
  snapshot = { ...snapshot, total: tasks.size, resolved, ...next };
  listeners.forEach((listener) => listener());
}

export const bootStore = {
  register(id: string) {
    if (tasks.has(id)) return;
    tasks.set(id, false);
    emit({});
  },
  resolve(id: string) {
    if (tasks.get(id) !== false) return;
    tasks.set(id, true);
    emit({});
  },
  complete() {
    if (!snapshot.booted) emit({ booted: true });
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot(): BootSnapshot {
    return snapshot;
  },
};
