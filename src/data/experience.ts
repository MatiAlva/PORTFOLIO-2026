import type { Locale } from '@/i18n/config';
import type { Experience } from '@/types/content';

type ExperienceBase = Pick<Experience, 'company' | 'start' | 'end' | 'url'>;

const adviters: ExperienceBase = {
  company: 'Adviters',
  start: '2025-10',
};

const itrock: ExperienceBase = {
  company: 'ITROCK',
  start: '2023-11',
  end: '2025-10',
};

const newbitcrew: ExperienceBase = {
  company: 'NEWBITCREW',
  start: '2023-09',
  end: '2023-11',
};

const makisan: ExperienceBase = {
  company: 'MAKISAN TECH',
  start: '2023-05',
  end: '2023-10',
};

const noCountry: ExperienceBase = {
  company: 'No Country',
  start: '2022-11',
  end: '2023-05',
};

const vivencia: ExperienceBase = {
  company: 'Vivencia Baires',
  start: '2021-08',
  end: '2021-12',
};

/** Ordered from most recent to oldest. Dates use `YYYY-MM`; omit `end` for the current role. */
export const experience: Record<Locale, Experience[]> = {
  es: [
    {
      ...adviters,
      role: 'Software Engineer (Semi Senior)',
      location: 'Buenos Aires',
      description:
        'Desarrollo funcionalidades para soluciones de comunicación bancaria, en entornos de alta criticidad donde la confiabilidad y la experiencia de usuario no son negociables.',
      highlights: [
        'Evolución y mejora continua de la experiencia de usuario en productos bancarios críticos.',
        'Seguimiento funcional de las soluciones implementadas, de la entrega al uso real.',
        'Participación en reuniones de proyecto y demostraciones de producto con el cliente.',
        'Propuesta e implementación de mejoras alineadas a las necesidades del negocio.',
      ],
    },
    {
      ...itrock,
      role: 'Desarrollador Frontend',
      location: 'Buenos Aires',
      description:
        'Desarrollo de aplicaciones web y multiplataforma, con interfaces centradas en el usuario e integradas a APIs y servicios externos, junto a equipos ágiles de UX/UI, Backend y QA.',
      highlights: [
        'Promoví buenas prácticas de desarrollo y testing en el equipo.',
        'Dicté capacitaciones internas sobre tests unitarios.',
        'Optimicé el rendimiento y mantuve plataformas en producción.',
      ],
    },
    {
      ...newbitcrew,
      role: 'Desarrollador Frontend',
      location: 'Buenos Aires',
      description:
        'Soluciones frontend para proyectos estratégicos, gestionando información sensible con foco en seguridad, confiabilidad y usabilidad.',
      highlights: [
        'Wellknows: aplicación específica para el sector petrolero y de acueductos.',
        'Magic Stories: desarrollo de funcionalidades con integración de inteligencia artificial.',
        'Implementación de visualizaciones avanzadas de datos.',
      ],
    },
    {
      ...makisan,
      role: 'Desarrollador Frontend',
      location: 'Buenos Aires',
      description:
        'Desarrollo de sitios web con React: interfaces modernas que priorizan funcionalidad, rendimiento y experiencia de usuario.',
      highlights: [
        'Optimicé la presencia digital de clientes con soluciones visuales y técnicas.',
        'Colaboré con equipos de diseño y desarrollo en productos escalables.',
        'Apliqué criterios de usabilidad y diseño centrado en el usuario en cada entrega.',
      ],
    },
    {
      ...noCountry,
      role: 'Desarrollador Frontend',
      location: 'Buenos Aires',
      description:
        'Desarrollo de interfaces web modernas y responsivas con React, en equipos multidisciplinarios.',
      highlights: [
        'Construí componentes reutilizables e integraciones con servicios backend.',
        'Optimicé el rendimiento de las aplicaciones.',
      ],
    },
    {
      ...vivencia,
      role: 'Desarrollador Frontend',
      location: 'Buenos Aires',
      description: 'Interfaces y funcionalidades para clientes dentro del ecosistema Web3.',
      highlights: ['Integración con billeteras virtuales como MetaMask y Portis.'],
    },
  ],
  en: [
    {
      ...adviters,
      role: 'Software Engineer (Mid-level)',
      location: 'Buenos Aires',
      description:
        'Building features for banking communication solutions, in business-critical environments where reliability and user experience are non-negotiable.',
      highlights: [
        'Continuously evolving the user experience of critical banking products.',
        'Functional follow-up of shipped solutions, from delivery to real-world use.',
        'Taking part in project meetings and product demos with the client.',
        'Proposing and implementing improvements aligned with business needs.',
      ],
    },
    {
      ...itrock,
      role: 'Frontend Developer',
      location: 'Buenos Aires',
      description:
        'Built web and cross-platform applications with user-centered interfaces integrated with APIs and external services, alongside agile UX/UI, Backend and QA teams.',
      highlights: [
        'Promoted good development and testing practices across the team.',
        'Ran internal training sessions on unit testing.',
        'Optimized performance and maintained production platforms.',
      ],
    },
    {
      ...newbitcrew,
      role: 'Frontend Developer',
      location: 'Buenos Aires',
      description:
        'Frontend solutions for strategic projects, handling sensitive information with a focus on security, reliability and usability.',
      highlights: [
        'Wellknows: a purpose-built application for the oil and aqueduct sectors.',
        'Magic Stories: features built on top of artificial intelligence integrations.',
        'Advanced data visualizations.',
      ],
    },
    {
      ...makisan,
      role: 'Frontend Developer',
      location: 'Buenos Aires',
      description:
        'Built websites with React: modern interfaces that put functionality, performance and user experience first.',
      highlights: [
        'Improved clients’ digital presence through visual and technical solutions.',
        'Worked with design and development teams on scalable products.',
        'Applied usability and user-centered design criteria to every delivery.',
      ],
    },
    {
      ...noCountry,
      role: 'Frontend Developer',
      location: 'Buenos Aires',
      description: 'Built modern, responsive web interfaces with React in multidisciplinary teams.',
      highlights: [
        'Built reusable components and integrations with backend services.',
        'Optimized application performance.',
      ],
    },
    {
      ...vivencia,
      role: 'Frontend Developer',
      location: 'Buenos Aires',
      description: 'Interfaces and client features within the Web3 ecosystem.',
      highlights: ['Integrated virtual wallets such as MetaMask and Portis.'],
    },
  ],
};
