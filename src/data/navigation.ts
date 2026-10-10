import type { Locale } from '@/i18n/config';
import type { NavItem } from '@/types/content';

/** `id` must match the `id` of the section element on the home page. */
export const navigation: Record<Locale, NavItem[]> = {
  es: [
    // TODO: re-enable once the real projects are ready.
    // { id: 'work', label: 'Proyectos' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'contact', label: 'Contacto' },
  ],
  en: [
    // { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ],
};

export const SECTION_IDS = navigation.es.map((item) => item.id);
