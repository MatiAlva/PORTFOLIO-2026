import type { Locale } from './config';

/** Interface copy. Content (projects, bio, experience…) lives in `src/data`. */
const es = {
  skipToContent: 'Saltar al contenido',
  nav: {
    primary: 'Principal',
    mobile: 'Móvil',
    siteMenu: 'Menú del sitio',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    home: (name: string) => `${name} — inicio`,
  },
  theme: {
    toLight: 'Cambiar a tema claro',
    toDark: 'Cambiar a tema oscuro',
  },
  language: {
    label: 'Idioma',
    switchTo: (language: string) => `Cambiar idioma a ${language}`,
  },
  cv: {
    download: 'Descargar CV',
    short: 'CV',
    cursor: 'Bajar',
  },
  preloader: (name: string) => `Cargando ${name}`,
  hero: {
    portfolio: 'Portafolio',
    viewWork: 'Ver proyectos',
    letsTalk: 'Hablemos',
    scroll: 'Scroll',
  },
  manifesto: 'Manifiesto',
  work: {
    eyebrow: 'Proyectos seleccionados',
    title: 'Productos completos, del *backend* a la *interfaz*.',
    caseStudies: (count: number) => `${count} casos de estudio`,
    cursor: 'Ver',
  },
  experience: {
    eyebrow: 'Experiencia',
    title: 'Más de cuatro años construyendo *productos reales*, de la banca a la *Web3*.',
    current: 'Actual',
    present: 'Actualidad',
  },
  stack: {
    eyebrow: 'Herramientas',
    title: 'Herramientas en las que confío para *producción*.',
    hint: 'Pasa el cursor o haz click en una tecnología para ver el detalle.',
  },
  about: {
    eyebrow: 'Sobre mí',
    principles: 'Principios',
  },
  contact: {
    eyebrow: 'Contacto',
    open: 'Abrir',
  },
  email: {
    copy: 'Copiar email',
    copied: 'Copiado',
    write: 'Escribir',
  },
  footer: {
    backToTop: 'Volver arriba',
  },
  easterEgg: {
    unlocked: 'Acento desbloqueado:',
    again: 'Repite el código para cambiarlo.',
  },
  project: {
    allWork: 'Todos los proyectos',
    role: 'Rol',
    client: 'Cliente',
    personal: 'Personal',
    year: 'Año',
    category: 'Categoría',
    problemAndSolution: 'Problema y solución',
    problem: 'El problema',
    solution: 'La solución',
    myRole: 'Mi rol',
    stack: 'Stack',
    process: 'Proceso',
    gallery: 'Galería',
    results: 'Resultados',
    liveDemo: 'Ver demo',
    source: 'Código en GitHub',
    next: 'Siguiente proyecto',
    nextCursor: 'Siguiente',
  },
  notFound: {
    seoTitle: 'No encontrado',
    title: 'Esta página se salió de *órbita*.',
    before: 'La dirección',
    after: 'no existe — quizás nunca existió.',
    back: 'Volver al inicio',
  },
  opensInNewTab: ' (se abre en una pestaña nueva)',
};

export type UiStrings = typeof es;

const en: UiStrings = {
  skipToContent: 'Skip to content',
  nav: {
    primary: 'Primary',
    mobile: 'Mobile',
    siteMenu: 'Site menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: (name) => `${name} — home`,
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  language: {
    label: 'Language',
    switchTo: (language) => `Switch language to ${language}`,
  },
  cv: {
    download: 'Download CV',
    short: 'CV',
    cursor: 'Get',
  },
  preloader: (name) => `Loading ${name}`,
  hero: {
    portfolio: 'Portfolio',
    viewWork: 'View selected work',
    letsTalk: "Let's talk",
    scroll: 'Scroll',
  },
  manifesto: 'Manifesto',
  work: {
    eyebrow: 'Selected work',
    title: 'Complete products, from *backend* to *interface*.',
    caseStudies: (count) => `${count} case studies`,
    cursor: 'View',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Four-plus years building *real products*, from banking to *Web3*.',
    current: 'Current',
    present: 'Present',
  },
  stack: {
    eyebrow: 'Toolkit',
    title: 'Tools I trust with *production*.',
    hint: 'Hover or click a technology to see the details.',
  },
  about: {
    eyebrow: 'About',
    principles: 'Principles',
  },
  contact: {
    eyebrow: 'Contact',
    open: 'Open',
  },
  email: {
    copy: 'Copy email',
    copied: 'Copied',
    write: 'Write',
  },
  footer: {
    backToTop: 'Back to top',
  },
  easterEgg: {
    unlocked: 'Accent unlocked:',
    again: 'Enter the code again to cycle.',
  },
  project: {
    allWork: 'All work',
    role: 'Role',
    client: 'Client',
    personal: 'Personal',
    year: 'Year',
    category: 'Category',
    problemAndSolution: 'Problem and solution',
    problem: 'The problem',
    solution: 'The solution',
    myRole: 'My role',
    stack: 'Stack',
    process: 'Process',
    gallery: 'Gallery',
    results: 'Results',
    liveDemo: 'Live demo',
    source: 'Source on GitHub',
    next: 'Next project',
    nextCursor: 'Next',
  },
  notFound: {
    seoTitle: 'Not found',
    title: 'This page drifted *out of orbit*.',
    before: 'The address',
    after: "doesn't exist — maybe it never did.",
    back: 'Back to base',
  },
  opensInNewTab: ' (opens in a new tab)',
};

export const ui: Record<Locale, UiStrings> = { es, en };
