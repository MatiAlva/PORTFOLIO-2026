import type { Locale } from '@/i18n/config';
import type { SiteConfig } from '@/types/content';

/** Language-independent details. Change these once and both languages follow. */
const profile = {
  name: 'Alvarez Matias',
  initials: 'AM',
  url: 'https://your-domain.com',
  email: 'matyy01.ma@gmail.com',
  timezone: 'America/Argentina/Buenos_Aires',
  location: 'Buenos Aires, AR',
} as const;

const role = 'Full Stack Developer / Software Engineer';

const seo = {
  titleTemplate: `%s — ${profile.name}`,
  defaultTitle: `${profile.name} — ${role}`,
};

/**
 * Everything personal lives here, once per language. The hero, SEO, preloader, footer,
 * contact and About sections all read from this object.
 */
export const site: Record<Locale, SiteConfig> = {
  es: {
    ...profile,
    role,
    tagline: {
      text: 'Construyo software de punta a punta: del *dato* a la *interfaz*.',
    },
    description:
      'Software engineer y full stack developer. Construyo aplicaciones web y multiplataforma — interfaces, integraciones y APIs — con React, TypeScript, Angular, Node.js y Java.',
    cv: { href: '/cv/cv-es.pdf', fileName: 'AlvarezMatias-CV-ES.pdf' },
    availability: {
      open: true,
      label: 'Abierto a nuevas oportunidades',
    },
    manifesto:
      'Escribo software que *resuelve problemas reales*. Productos donde la arquitectura, los datos y la experiencia de usuario se piensan juntos: confiables, mantenibles y *listos para escalar*.',
    about: {
      headline: 'Un desarrollador que piensa en el *producto completo*.',
      bio: [
        'Hace más de cuatro años que construyo software: empecé en el frontend con React y hoy trabajo como software engineer en soluciones de comunicación bancaria, donde la confiabilidad y la experiencia de usuario no son negociables. Del lado del servidor trabajo con Node.js, NestJS y Spring Boot.',
        'Pasé por banca, energía, IA y Web3: apps para el sector petrolero, integraciones con billeteras virtuales y aplicaciones multiplataforma. El hilo conductor: código claro, testing como hábito — lo enseño dentro de los equipos — y foco en el impacto para el negocio.',
      ],
      facts: [
        { label: 'Desde', value: 'Buenos Aires' },
        { label: 'Foco', value: 'Aplicaciones web y multiplataforma, APIs, testing' },
        { label: 'Actualmente', value: 'Software Engineer @ Adviters' },
        { label: 'Idiomas', value: 'Español, inglés' },
      ],
      principles: [
        {
          title: 'Simple antes que ingenioso',
          description: 'El mejor código es el que otro entiende a la primera.',
        },
        {
          title: 'Tipos de punta a punta',
          description: 'Un contrato compartido entre base de datos, API y cliente evita sorpresas.',
        },
        {
          title: 'Medir antes de optimizar',
          description: 'Métricas, logs y trazas guían las decisiones, no las intuiciones.',
        },
        {
          title: 'Entregar en pasos pequeños',
          description: 'Deploys frecuentes, tests automatizados y feature flags reducen el riesgo.',
        },
      ],
    },
    contact: {
      eyebrow: '¿Buscas sumar a alguien al equipo?',
      headline: 'Construyamos algo *sólido*.',
      subline:
        'Busco sumarme a una empresa en relación de dependencia, en un puesto full stack o frontend. Suelo responder en dos días hábiles.',
      cvNote: 'Toda mi trayectoria en una página.',
      marquee: [
        'Abierto a nuevas oportunidades',
        'Full stack y frontend',
        'Relación de dependencia',
        'Hablemos',
      ],
    },
    seo,
  },
  en: {
    ...profile,
    role,
    tagline: {
      text: 'I build software end to end: from *data* to *interface*.',
    },
    description:
      'Software engineer and full stack developer. I build web and cross-platform applications — interfaces, integrations and APIs — with React, TypeScript, Angular, Node.js and Java.',
    cv: { href: '/cv/cv-en.pdf', fileName: 'AlvarezMatias-CV-EN.pdf' },
    availability: {
      open: true,
      label: 'Open to new opportunities',
    },
    manifesto:
      'I write software that *solves real problems*. Products where architecture, data and user experience are designed together — reliable, maintainable and *ready to scale*.',
    about: {
      headline: 'A developer who thinks about the *whole product*.',
      bio: [
        'I have been building software for over four years: I started on the frontend with React and today I work as a software engineer on banking communication solutions, where reliability and user experience are non-negotiable. On the server side I work with Node.js, NestJS and Spring Boot.',
        'I have worked across banking, energy, AI and Web3: apps for the oil industry, virtual wallet integrations and cross-platform applications. The common thread: clear code, testing as a habit — I teach it inside my teams — and a focus on business impact.',
      ],
      facts: [
        { label: 'Based in', value: 'Buenos Aires' },
        { label: 'Focus', value: 'Web and cross-platform apps, APIs, testing' },
        { label: 'Currently', value: 'Software Engineer @ Adviters' },
        { label: 'Languages', value: 'Spanish, English' },
      ],
      principles: [
        {
          title: 'Simple over clever',
          description: 'The best code is the code someone else understands on first read.',
        },
        {
          title: 'Types end to end',
          description: 'A shared contract between database, API and client prevents surprises.',
        },
        {
          title: 'Measure before optimizing',
          description: 'Metrics, logs and traces drive decisions, not hunches.',
        },
        {
          title: 'Ship in small steps',
          description: 'Frequent deploys, automated tests and feature flags keep risk low.',
        },
      ],
    },
    contact: {
      eyebrow: 'Looking to grow your team?',
      headline: "Let's build something *solid*.",
      subline:
        'I am looking to join a company as a full-time employee, in a full stack or frontend role. I usually reply within two working days.',
      cvNote: 'My whole track record on one page.',
      marquee: [
        'Open to new opportunities',
        'Full stack & frontend',
        'Full-time employment',
        'Let’s talk',
      ],
    },
    seo,
  },
};
