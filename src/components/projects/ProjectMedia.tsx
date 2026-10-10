import type { Media, Palette } from '@/types/content';
import { useExperience } from '@/context/experience';
import { cn } from '@/lib/utils';
import { GenerativeCover } from './GenerativeCover';

interface ProjectMediaProps {
  media: Media;
  palette: Palette;
  title: string;
  className?: string;
  /** Above-the-fold media loads eagerly with high priority. */
  priority?: boolean;
}

export function ProjectMedia({ media, palette, title, className, priority }: ProjectMediaProps) {
  const { reducedMotion } = useExperience();
  const classes = cn(
    'block size-full object-cover [&_img]:size-full [&_img]:object-cover',
    className,
  );

  switch (media.type) {
    case 'image':
      return (
        <picture className={classes}>
          {media.avif && <source srcSet={media.avif} type="image/avif" />}
          {media.webp && <source srcSet={media.webp} type="image/webp" />}
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
      );
    case 'video':
      return (
        <video
          className={classes}
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          preload={priority ? 'auto' : 'none'}
        />
      );
    case 'generative':
      return (
        <GenerativeCover
          className={classes}
          variant={media.variant}
          seed={media.seed}
          palette={palette}
          title={title}
          alt={media.alt}
        />
      );
  }
}
