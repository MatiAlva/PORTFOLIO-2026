import { Fragment } from 'react';
import type { TextSegment } from '@/lib/utils';

/** Renders one word whose parts may switch between the sans and the serif accent. */
export function WordParts({ parts }: { parts: TextSegment[] }) {
  return parts.map((part, index) =>
    part.emphasis ? (
      <span key={index} className="serif-accent">
        {part.text}
      </span>
    ) : (
      <Fragment key={index}>{part.text}</Fragment>
    ),
  );
}
