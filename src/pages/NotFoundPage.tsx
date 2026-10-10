import { useLocation } from 'react-router';
import { useContent } from '@/context/locale';
import { useSeo } from '@/hooks/useSeo';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitReveal } from '@/components/ui/SplitReveal';

export function NotFoundPage() {
  const { pathname } = useLocation();
  const { ui } = useContent();
  useSeo({ title: ui.notFound.seoTitle, path: pathname, noindex: true });

  return (
    <main
      id="main"
      tabIndex={-1}
      className="site-container flex min-h-svh flex-col items-start justify-center gap-8 pt-[calc(var(--spacing-nav)+--spacing(12))] pb-16"
    >
      <p className="label">Error 404</p>
      <SplitReveal
        as="h1"
        text={ui.notFound.title}
        className="max-w-[14ch] text-display leading-tight tracking-[-0.055em]"
      />
      <p className="text-fg-muted">
        {ui.notFound.before} <code className="font-mono text-[0.9em] text-fg">{pathname}</code>{' '}
        {ui.notFound.after}
      </p>
      <MagneticButton to="/" variant="solid" icon="arrowRight">
        {ui.notFound.back}
      </MagneticButton>
    </main>
  );
}
