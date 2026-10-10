import { useEffect, useState } from 'react';
import { useContent } from '@/context/locale';
import { trackEvent } from '@/lib/analytics';
import { Icon } from '@/components/ui/Icon';
const RESET_MS = 2200;

export function EmailCopy({ email }: { email: string }) {
  const { ui } = useContent();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackEvent('email_copy');
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${email}`}
        className="relative bg-[linear-gradient(currentColor,currentColor)] bg-size-[100%_1px] bg-position-[0_100%] bg-no-repeat text-[length:clamp(1.5rem,1rem+2.2vw,2.75rem)] font-medium tracking-[-0.03em] [overflow-wrap:anywhere] transition-[color] duration-420 ease-out hover:text-accent"
        data-cursor="label"
        data-cursor-label={ui.email.write}
      >
        {email}
      </a>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full px-[0.9rem] py-2 font-mono text-xs tracking-label uppercase shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color] duration-420 ease-out hover:bg-fg hover:text-bg data-[copied=true]:bg-fg data-[copied=true]:text-bg"
        onClick={copy}
        data-copied={copied}
      >
        <Icon name={copied ? 'check' : 'copy'} size={14} />
        <span aria-live="polite">{copied ? ui.email.copied : ui.email.copy}</span>
      </button>
    </div>
  );
}
