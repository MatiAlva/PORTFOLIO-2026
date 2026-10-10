import { useContent } from '@/context/locale';
import { trackEvent } from '@/lib/analytics';
import { MagneticButton } from './MagneticButton';

/** Downloads the résumé matching the active language. */
export function CvButton({ variant = 'solid' }: { variant?: 'solid' | 'outline' }) {
  const { site, ui, locale } = useContent();

  return (
    <MagneticButton
      href={site.cv.href}
      download={site.cv.fileName}
      variant={variant}
      icon="download"
      cursorLabel={ui.cv.cursor}
      onClick={() => trackEvent('cv_download', { locale })}
    >
      {ui.cv.download}
    </MagneticButton>
  );
}
