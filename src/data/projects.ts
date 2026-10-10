import type { Locale } from '@/i18n/config';
import type { GenerativeMedia, Project } from '@/types/content';

/**
 * Selected work, in display order. Each project has a language-independent `base`
 * (slug, year, stack, palette, links) plus its copy in every language. Routes, sitemap,
 * SEO pages and "next project" links are derived automatically.
 *
 * `cover` accepts `image`, `video` or `generative` media. Generative covers are procedural
 * SVG artwork (zero bytes over the network) meant as placeholders until real assets exist.
 */

type ProjectBase = Pick<Project, 'slug' | 'year' | 'client' | 'stack' | 'palette' | 'links'>;
type Art = Omit<GenerativeMedia, 'alt'>;

const art = (variant: Art['variant'], seed: number): Art => ({ type: 'generative', variant, seed });

const atlas: ProjectBase = {
  slug: 'atlas-observatory',
  year: 2026,
  client: 'Nordic Climate Institute',
  stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'AWS'],
  palette: { background: '#0d1512', foreground: '#d8f3e6', accent: '#38f2a5' },
  links: { live: 'https://example.com', github: 'https://github.com/your-handle/atlas' },
};

const monolith: ProjectBase = {
  slug: 'monolith-commerce',
  year: 2025,
  client: 'Monolith Studio',
  stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
  palette: { background: '#171411', foreground: '#efe6da', accent: '#ff6a3d' },
  links: { live: 'https://example.com' },
};

const pulse: ProjectBase = {
  slug: 'pulse-saas',
  year: 2024,
  stack: ['React', 'GraphQL', 'Node.js', 'PostgreSQL', 'Docker'],
  palette: { background: '#0f1117', foreground: '#e3e8f5', accent: '#5b8cff' },
  links: { live: 'https://example.com', github: 'https://github.com/your-handle/pulse' },
};

const relay: ProjectBase = {
  slug: 'relay-logistics',
  year: 2023,
  client: 'Relay Logistics',
  stack: ['React Native', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL'],
  palette: { background: '#120d10', foreground: '#f3e3ea', accent: '#ff3d7f' },
  links: { live: 'https://example.com' },
};

const es: Project[] = [
  {
    ...atlas,
    title: 'Atlas Observatory',
    summary: 'Plataforma de datos climáticos: API, pipeline de ingesta y visualización.',
    description:
      'Una plataforma completa para un instituto de investigación climática: ingesta de mediciones satelitales, una API pública documentada y una aplicación web donde científicos y público general exploran décadas de datos.',
    category: 'Plataforma de datos',
    role: 'Lead Full Stack Developer',
    cover: {
      ...art('orbits', 12),
      alt: 'Anillos orbitales abstractos que representan datos satelitales alrededor de un globo',
    },
    caseStudy: {
      problem:
        'Décadas de mediciones vivían en exportaciones CSV dispersas que solo los especialistas podían procesar. El instituto necesitaba centralizar los datos y abrirlos al público sin perder precisión científica.',
      solution:
        'Un pipeline de ingesta que normaliza y valida los datos en PostgreSQL, una API REST con caché y paginación por tiles, y un frontend en React que carga la información de forma progresiva.',
      responsibilities: [
        'Arquitectura y dirección técnica',
        'Modelado de datos y pipeline de ingesta',
        'API pública y documentación OpenAPI',
        'Frontend e infraestructura en AWS',
      ],
      process: [
        {
          title: 'Descubrimiento',
          description: 'Entrevistas con científicos para mapear las consultas reales.',
        },
        {
          title: 'Modelado',
          description: 'Esquema relacional e índices diseñados a partir de esas consultas.',
        },
        {
          title: 'Desarrollo',
          description: 'Jobs de ingesta, API con caché y una interfaz navegable por teclado.',
        },
        {
          title: 'Operación',
          description: 'Monitoreo, alertas y despliegues automatizados en cada merge.',
        },
      ],
      gallery: [
        { ...art('terrain', 31), alt: 'Relieve de anomalías de temperatura' },
        { ...art('interface', 7), alt: 'Panel de consulta de datos' },
      ],
      results: [
        { value: '2M', label: 'registros ingeridos por día' },
        { value: '120ms', label: 'tiempo de respuesta p95 de la API' },
        { value: '+340%', label: 'consultas vs. la herramienta anterior' },
      ],
    },
  },
  {
    ...monolith,
    title: 'Monolith',
    summary: 'E-commerce a medida con pagos, inventario y panel de administración.',
    description:
      'Una tienda online construida desde cero para una marca de mobiliario: catálogo, checkout con Stripe, gestión de inventario y un panel interno para el equipo de operaciones.',
    category: 'E-commerce',
    role: 'Full Stack Lead',
    cover: {
      ...art('type', 4),
      alt: 'Composición tipográfica monumental para la marca Monolith',
    },
    caseStudy: {
      problem:
        'La marca vendía con una plantilla genérica y gestionaba el stock en planillas, lo que generaba ventas de productos agotados y mucho trabajo manual.',
      solution:
        'Un backend propio en Node.js con inventario en tiempo real, pagos con Stripe y webhooks idempotentes, un frontend en Next.js optimizado para SEO y un panel de administración para operaciones.',
      responsibilities: [
        'Arquitectura full stack',
        'Integración de pagos y webhooks',
        'Panel de administración',
        'Rendimiento y SEO',
      ],
      process: [
        {
          title: 'Auditoría',
          description: 'El análisis del embudo reveló un 70% de abandono en el checkout.',
        },
        {
          title: 'Diseño técnico',
          description: 'Modelo de pedidos e inventario consistente ante pagos concurrentes.',
        },
        {
          title: 'Lanzamiento',
          description: 'Despliegue incremental con feature flags y tests A/B.',
        },
      ],
      gallery: [
        { ...art('interface', 18), alt: 'Panel de administración de pedidos' },
        { ...art('orbits', 44), alt: 'Flujo de checkout' },
      ],
      results: [
        { value: '+62%', label: 'tasa de conversión' },
        { value: '0', label: 'ventas sin stock desde el lanzamiento' },
        { value: '-15h', label: 'trabajo manual por semana' },
      ],
    },
  },
  {
    ...pulse,
    title: 'Pulse',
    summary: 'SaaS multi-tenant de gestión de turnos y equipos.',
    description:
      'Una plataforma SaaS para que empresas de servicios organicen turnos, equipos y facturación. Incluye API GraphQL, roles y permisos, suscripciones y una app web en React.',
    category: 'SaaS',
    role: 'Creador y desarrollador full stack',
    cover: {
      ...art('interface', 23),
      alt: 'Componentes de interfaz ordenados sobre una grilla',
    },
    caseStudy: {
      problem:
        'Las empresas coordinaban turnos con hojas de cálculo y grupos de chat, con errores frecuentes y sin visibilidad de horas trabajadas.',
      solution:
        'Una arquitectura multi-tenant con aislamiento por fila en PostgreSQL, una API GraphQL tipada de punta a punta y notificaciones en segundo plano con colas.',
      responsibilities: ['Diseño de producto', 'Backend y API', 'Frontend', 'Infraestructura'],
      process: [
        {
          title: 'Validación',
          description: 'Prototipo con cinco clientes piloto antes de escribir el backend.',
        },
        { title: 'Construcción', description: 'Releases semanales guiados por métricas de uso.' },
        {
          title: 'Escala',
          description: 'Colas, caché y réplicas de lectura a medida que creció la carga.',
        },
      ],
      gallery: [{ ...art('terrain', 9), alt: 'Visualización de la carga por equipo' }],
      results: [
        { value: '120+', label: 'empresas activas' },
        { value: '99.95%', label: 'disponibilidad' },
        { value: '-80%', label: 'errores de planificación' },
      ],
    },
  },
  {
    ...relay,
    title: 'Relay',
    summary: 'Seguimiento de envíos en tiempo real: app móvil, backend y panel web.',
    description:
      'Un sistema de logística para una empresa de entregas: app para repartidores, seguimiento en vivo para clientes y un panel de control para la operación.',
    category: 'Tiempo real',
    role: 'Full Stack Developer',
    cover: {
      ...art('terrain', 58),
      alt: 'Líneas de paisaje que representan rutas de entrega',
    },
    caseStudy: {
      problem:
        'Los clientes no sabían cuándo llegaba su pedido y el centro de operaciones coordinaba a los repartidores por teléfono.',
      solution:
        'Una app en React Native que envía la ubicación de cada repartidor, un backend con WebSockets y Redis que distribuye las actualizaciones, y un panel web con el estado de la flota en vivo.',
      responsibilities: ['Backend en tiempo real', 'App móvil', 'Panel de operaciones'],
      process: [
        {
          title: 'Mapear',
          description: 'Acompañar a repartidores y operadores para entender el flujo real.',
        },
        {
          title: 'Construir',
          description: 'Eventos en tiempo real con reconexión y modo sin conexión.',
        },
        {
          title: 'Afinar',
          description: 'Pruebas de carga para sostener miles de conexiones simultáneas.',
        },
      ],
      gallery: [{ ...art('orbits', 77), alt: 'Mapa abstracto de rutas' }],
      results: [
        { value: '5k', label: 'conexiones simultáneas' },
        { value: '-60%', label: 'llamadas al centro de soporte' },
        { value: '<1s', label: 'latencia de actualización' },
      ],
    },
  },
];

const en: Project[] = [
  {
    ...atlas,
    title: 'Atlas Observatory',
    summary: 'Climate data platform: API, ingestion pipeline and visualization.',
    description:
      'A complete platform for a climate research institute: satellite data ingestion, a documented public API and a web app where scientists and the public explore decades of measurements.',
    category: 'Data Platform',
    role: 'Lead Full Stack Developer',
    cover: {
      ...art('orbits', 12),
      alt: 'Abstract orbital rings representing satellite data around a globe',
    },
    caseStudy: {
      problem:
        'Decades of measurements lived in scattered CSV exports that only specialists could process. The institute needed to centralize the data and open it to the public without losing scientific accuracy.',
      solution:
        'An ingestion pipeline that normalizes and validates data into PostgreSQL, a cached REST API with tile-based pagination, and a React frontend that loads information progressively.',
      responsibilities: [
        'Architecture and technical direction',
        'Data modeling and ingestion pipeline',
        'Public API and OpenAPI documentation',
        'Frontend and AWS infrastructure',
      ],
      process: [
        {
          title: 'Discovery',
          description: 'Interviews with scientists to map the queries they actually run.',
        },
        {
          title: 'Modeling',
          description: 'Relational schema and indexes designed around those queries.',
        },
        {
          title: 'Build',
          description: 'Ingestion jobs, a cached API and a fully keyboard-driven UI.',
        },
        {
          title: 'Operate',
          description: 'Monitoring, alerting and automated deploys on every merge.',
        },
      ],
      gallery: [
        { ...art('terrain', 31), alt: 'Temperature anomaly terrain' },
        { ...art('interface', 7), alt: 'Data query dashboard' },
      ],
      results: [
        { value: '2M', label: 'records ingested per day' },
        { value: '120ms', label: 'API p95 response time' },
        { value: '+340%', label: 'queries vs. previous tool' },
      ],
    },
  },
  {
    ...monolith,
    title: 'Monolith',
    summary: 'Custom e-commerce with payments, inventory and an admin dashboard.',
    description:
      'An online store built from scratch for a furniture brand: catalog, Stripe checkout, inventory management and an internal dashboard for the operations team.',
    category: 'E-commerce',
    role: 'Full Stack Lead',
    cover: {
      ...art('type', 4),
      alt: 'Monumental typographic composition for the Monolith brand',
    },
    caseStudy: {
      problem:
        'The brand sold through a generic template and tracked stock in spreadsheets, leading to out-of-stock sales and a lot of manual work.',
      solution:
        'A custom Node.js backend with real-time inventory, Stripe payments and idempotent webhooks, an SEO-optimized Next.js frontend and an admin dashboard for operations.',
      responsibilities: [
        'Full stack architecture',
        'Payments and webhook integration',
        'Admin dashboard',
        'Performance and SEO',
      ],
      process: [
        {
          title: 'Audit',
          description: 'Funnel analysis surfaced a 70% drop-off at checkout.',
        },
        {
          title: 'Technical design',
          description: 'An order and inventory model consistent under concurrent payments.',
        },
        { title: 'Ship', description: 'Incremental rollout behind feature flags, A/B tested.' },
      ],
      gallery: [
        { ...art('interface', 18), alt: 'Order management dashboard' },
        { ...art('orbits', 44), alt: 'Checkout flow' },
      ],
      results: [
        { value: '+62%', label: 'conversion rate' },
        { value: '0', label: 'out-of-stock sales since launch' },
        { value: '-15h', label: 'manual work per week' },
      ],
    },
  },
  {
    ...pulse,
    title: 'Pulse',
    summary: 'Multi-tenant SaaS for shift and team management.',
    description:
      'A SaaS platform that helps service companies organize shifts, teams and billing. It includes a GraphQL API, roles and permissions, subscriptions and a React web app.',
    category: 'SaaS',
    role: 'Creator & Full Stack Developer',
    cover: {
      ...art('interface', 23),
      alt: 'Interface components arranged on a grid',
    },
    caseStudy: {
      problem:
        'Companies coordinated shifts through spreadsheets and chat groups, with frequent mistakes and no visibility into hours worked.',
      solution:
        'A multi-tenant architecture with row-level isolation in PostgreSQL, an end-to-end typed GraphQL API and queue-based background notifications.',
      responsibilities: ['Product design', 'Backend and API', 'Frontend', 'Infrastructure'],
      process: [
        {
          title: 'Validate',
          description: 'Prototype with five pilot customers before writing the backend.',
        },
        { title: 'Build', description: 'Weekly releases guided by usage metrics.' },
        { title: 'Scale', description: 'Queues, caching and read replicas as load grew.' },
      ],
      gallery: [{ ...art('terrain', 9), alt: 'Team workload visualization' }],
      results: [
        { value: '120+', label: 'active companies' },
        { value: '99.95%', label: 'uptime' },
        { value: '-80%', label: 'scheduling errors' },
      ],
    },
  },
  {
    ...relay,
    title: 'Relay',
    summary: 'Real-time delivery tracking: mobile app, backend and web dashboard.',
    description:
      'A logistics system for a delivery company: an app for couriers, live tracking for customers and a control dashboard for operations.',
    category: 'Real-time',
    role: 'Full Stack Developer',
    cover: {
      ...art('terrain', 58),
      alt: 'Landscape lines representing delivery routes',
    },
    caseStudy: {
      problem:
        'Customers had no idea when their order would arrive, and the operations center coordinated couriers over the phone.',
      solution:
        'A React Native app that streams each courier’s location, a WebSocket and Redis backend that fans out updates, and a web dashboard showing the live state of the fleet.',
      responsibilities: ['Real-time backend', 'Mobile app', 'Operations dashboard'],
      process: [
        {
          title: 'Map',
          description: 'Shadowing couriers and operators to understand the real workflow.',
        },
        { title: 'Build', description: 'Real-time events with reconnection and offline mode.' },
        {
          title: 'Tune',
          description: 'Load testing to sustain thousands of concurrent connections.',
        },
      ],
      gallery: [{ ...art('orbits', 77), alt: 'Abstract route map' }],
      results: [
        { value: '5k', label: 'concurrent connections' },
        { value: '-60%', label: 'support center calls' },
        { value: '<1s', label: 'update latency' },
      ],
    },
  },
];

export const projects: Record<Locale, Project[]> = { es, en };

export function getProjectBySlug(list: Project[], slug: string): Project | undefined {
  return list.find((project) => project.slug === slug);
}

export function getNextProject(list: Project[], slug: string): Project {
  const index = list.findIndex((project) => project.slug === slug);
  const next = list[(index + 1) % list.length];
  if (!next) throw new Error('projects list must not be empty');
  return next;
}
