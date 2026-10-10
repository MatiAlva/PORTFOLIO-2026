import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useSeo } from '@/hooks/useSeo';
import { bootStore } from '@/lib/boot';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Stack } from '@/components/sections/Stack';
// TODO: re-enable once the real projects are ready.
// import { Work } from '@/components/sections/Work';

/**
 * Narrative order: introduction → identity → work → experience → technology →
 * personality → contact. Each section hands off visually to the next.
 */
// const SECTIONS = [Manifesto, Work, Experience, Stack, About, Contact];
const SECTIONS = [Manifesto, Experience, Stack, About, Contact];

/**
 * Mounts the sections below the hero one per frame, so the first render is split into short
 * tasks instead of one long main-thread block. The preloader does not wait for them: the hero
 * reveals as soon as fonts are ready. Deep links (`/#contact`) and later visits mount
 * everything at once so targets exist before scrolling.
 */
function useStagedSections(eager: boolean): number {
  const [count, setCount] = useState(() =>
    eager || bootStore.getSnapshot().booted ? SECTIONS.length : 0,
  );

  useEffect(() => {
    if (count >= SECTIONS.length) return;
    let timer = 0;
    const frame = requestAnimationFrame(() => {
      timer = window.setTimeout(() => setCount((current) => current + 1));
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [count]);

  return count;
}

export function HomePage() {
  const { hash } = useLocation();
  const count = useStagedSections(hash.length > 1);
  useSeo({ path: '/' });
  useHashScroll();

  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      {SECTIONS.slice(0, count).map((Section, index) => (
        <Section key={index} />
      ))}
    </main>
  );
}
