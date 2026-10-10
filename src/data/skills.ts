import type { Locale } from '@/i18n/config';
import type { Skill, SkillCategory, SkillCategoryMeta } from '@/types/content';

/** Ring order in the orbit visualization goes from inner to outer. */
export const skillCategories: Record<Locale, SkillCategoryMeta[]> = {
  es: [
    { id: 'platform', label: 'Testing y herramientas' },
    { id: 'backend', label: 'Backend y datos' },
    { id: 'frontend', label: 'Frontend' },
  ],
  en: [
    { id: 'platform', label: 'Testing & tooling' },
    { id: 'backend', label: 'Backend & data' },
    { id: 'frontend', label: 'Frontend' },
  ],
};

type SkillEntry = [name: string, category: SkillCategory, note: Record<Locale, string>];

const entries: SkillEntry[] = [
  [
    'React',
    'frontend',
    {
      es: 'Mi herramienta principal: componentes, hooks y aplicaciones de punta a punta.',
      en: 'My main tool: components, hooks and full applications.',
    },
  ],
  [
    'Next.js',
    'frontend',
    {
      es: 'Renderizado en servidor, rutas y SEO para productos web.',
      en: 'Server rendering, routing and SEO for web products.',
    },
  ],
  [
    'TypeScript',
    'frontend',
    {
      es: 'Tipado estricto para código que escala y se mantiene.',
      en: 'Strict typing for code that scales and stays maintainable.',
    },
  ],
  [
    'JavaScript',
    'frontend',
    {
      es: 'La base de todo: ES moderno, asincronía y el DOM.',
      en: 'The foundation: modern ES, async and the DOM.',
    },
  ],
  [
    'Angular',
    'frontend',
    {
      es: 'Aplicaciones empresariales con módulos, servicios y RxJS.',
      en: 'Enterprise applications with modules, services and RxJS.',
    },
  ],
  [
    'Vue',
    'frontend',
    {
      es: 'Interfaces reactivas con una curva de entrada amable.',
      en: 'Reactive interfaces with a gentle learning curve.',
    },
  ],
  [
    'React Native',
    'frontend',
    {
      es: 'Apps móviles nativas que comparten lógica con la web.',
      en: 'Native mobile apps that share logic with the web.',
    },
  ],
  [
    'Ionic',
    'frontend',
    {
      es: 'Ionic y Capacitor: una sola base de código para web, iOS y Android.',
      en: 'Ionic and Capacitor: one codebase for web, iOS and Android.',
    },
  ],
  [
    'Redux / Zustand',
    'frontend',
    {
      es: 'Estado global predecible, del store clásico al minimalista.',
      en: 'Predictable global state, from the classic store to the minimalist one.',
    },
  ],
  [
    'React Query',
    'frontend',
    {
      es: 'Datos del servidor con caché y sincronización, sobre Axios y APIs REST.',
      en: 'Server data with caching and syncing, on top of Axios and REST APIs.',
    },
  ],
  [
    'Tailwind',
    'frontend',
    {
      es: 'Sistemas de diseño consistentes sin salir del marcado.',
      en: 'Consistent design systems without leaving the markup.',
    },
  ],
  [
    'Sass / CSS',
    'frontend',
    {
      es: 'Layouts responsivos y arquitectura de estilos, también con Styled Components.',
      en: 'Responsive layouts and style architecture, also with Styled Components.',
    },
  ],
  [
    'Material UI',
    'frontend',
    {
      es: 'Interfaces accesibles y consistentes a partir de una librería sólida.',
      en: 'Accessible, consistent interfaces built on a solid library.',
    },
  ],
  [
    'Node.js',
    'backend',
    {
      es: 'APIs y servicios en JavaScript del lado del servidor.',
      en: 'Server-side APIs and services in JavaScript.',
    },
  ],
  [
    'Express',
    'backend',
    {
      es: 'APIs REST livianas y middlewares a medida.',
      en: 'Lightweight REST APIs and custom middleware.',
    },
  ],
  [
    'NestJS',
    'backend',
    {
      es: 'Arquitectura modular y tipada para backends que crecen.',
      en: 'Modular, typed architecture for growing backends.',
    },
  ],
  [
    'Java',
    'backend',
    {
      es: 'Programación orientada a objetos para sistemas robustos.',
      en: 'Object-oriented programming for robust systems.',
    },
  ],
  [
    'Spring Boot',
    'backend',
    {
      es: 'Servicios REST en el ecosistema Java.',
      en: 'REST services in the Java ecosystem.',
    },
  ],
  [
    'MySQL',
    'backend',
    {
      es: 'Modelado relacional y consultas SQL.',
      en: 'Relational modeling and SQL queries.',
    },
  ],
  [
    'MongoDB',
    'backend',
    {
      es: 'Documentos flexibles para datos que cambian rápido.',
      en: 'Flexible documents for fast-changing data.',
    },
  ],
  [
    'Jest',
    'platform',
    {
      es: 'Tests unitarios y de componentes; también los enseño en equipo.',
      en: 'Unit and component tests — I also teach them to my team.',
    },
  ],
  [
    'Vitest',
    'platform',
    {
      es: 'Tests rápidos integrados al ecosistema Vite.',
      en: 'Fast tests built into the Vite ecosystem.',
    },
  ],
  [
    'Storybook',
    'platform',
    {
      es: 'Componentes documentados y probados de forma aislada.',
      en: 'Components documented and tested in isolation.',
    },
  ],
  [
    'Git',
    'platform',
    {
      es: 'Commits pequeños e historial limpio en GitHub, GitLab y Bitbucket.',
      en: 'Small commits and a clean history on GitHub, GitLab and Bitbucket.',
    },
  ],
  [
    'CI/CD',
    'platform',
    {
      es: 'Pipelines que corren tests y despliegan automáticamente en cada cambio.',
      en: 'Pipelines that run tests and deploy automatically on every change.',
    },
  ],
];

const toSkills = (locale: Locale): Skill[] =>
  entries.map(([name, category, note]) => ({ name, category, note: note[locale] }));

export const skills: Record<Locale, Skill[]> = { es: toSkills('es'), en: toSkills('en') };
