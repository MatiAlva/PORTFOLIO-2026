import { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { useExperience } from '@/context/experience';
import { useContent } from '@/context/locale';
import { trackPageview } from '@/lib/analytics';
import { Navbar } from '@/components/navigation/Navbar';
import { Cursor } from '@/components/ui/Cursor';
import { CursorAurora } from '@/components/ui/CursorAurora';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { EasterEgg } from './EasterEgg';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { Preloader } from './Preloader';

export function RootLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { finePointer, reducedMotion } = useExperience();
  const { ui } = useContent();
  const desktopPointer = finePointer && !reducedMotion;

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <a
        className="fixed top-4 left-4 z-100 -translate-y-[200%] rounded-sm bg-fg px-4 py-3 font-mono text-xs tracking-label text-bg uppercase transition-transform duration-180 ease-out focus-visible:translate-y-0"
        href="#main"
      >
        {ui.skipToContent}
      </a>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      {desktopPointer && <CursorAurora />}
      {desktopPointer && <Cursor />}
      <EasterEgg />

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      >
        <PageTransition key={location.pathname}>
          {outlet}
          <Footer />
        </PageTransition>
      </AnimatePresence>
    </>
  );
}
