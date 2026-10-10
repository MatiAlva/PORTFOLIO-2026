import { useEffect } from 'react';
import { useContent } from '@/context/locale';
import { applySeo, type SeoInput } from '@/lib/seo';

export function useSeo({ title, description, path, type, noindex }: SeoInput): void {
  const { site } = useContent();
  useEffect(() => {
    applySeo(site, { title, description, path, type, noindex });
  }, [site, title, description, path, type, noindex]);
}
