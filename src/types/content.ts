export type GenerativeVariant = 'terrain' | 'orbits' | 'interface' | 'type';

export interface Palette {
  background: string;
  foreground: string;
  accent: string;
}

interface MediaBase {
  alt: string;
}

export interface ImageMedia extends MediaBase {
  type: 'image';
  /** Fallback source (jpg/png/webp). Put files in /public/projects/<slug>/. */
  src: string;
  avif?: string;
  webp?: string;
  width: number;
  height: number;
}

export interface VideoMedia extends MediaBase {
  type: 'video';
  src: string;
  poster: string;
}

export interface GenerativeMedia extends MediaBase {
  type: 'generative';
  variant: GenerativeVariant;
  seed: number;
}

export type Media = ImageMedia | VideoMedia | GenerativeMedia;

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  responsibilities: string[];
  process: ProcessStep[];
  gallery: Media[];
  results: ProjectMetric[];
}

export interface Project {
  slug: string;
  title: string;
  /** One-liner used in lists and meta descriptions. */
  summary: string;
  description: string;
  category: string;
  year: number;
  role: string;
  client?: string;
  stack: string[];
  palette: Palette;
  cover: Media;
  links: {
    live?: string;
    github?: string;
  };
  caseStudy?: CaseStudy;
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  /** Omit for current positions. */
  end?: string;
  location: string;
  description: string;
  highlights: string[];
  url?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'platform';

export interface Skill {
  name: string;
  category: SkillCategory;
  note: string;
}

export interface SkillCategoryMeta {
  id: SkillCategory;
  label: string;
}

export type SocialPlatform = 'github' | 'linkedin' | 'x' | 'dribbble' | 'instagram' | 'read.cv';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  handle: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  /** Used by the logo mark and preloader. */
  initials: string;
  role: string;
  tagline: {
    /** Words wrapped in *asterisks* render as the serif accent. */
    text: string;
  };
  description: string;
  url: string;
  email: string;
  /** Downloadable résumé for this language. Put the files in /public/cv/. */
  cv: {
    href: string;
    fileName: string;
  };
  location: string;
  timezone: string;
  availability: {
    open: boolean;
    label: string;
  };
  manifesto: string;
  about: {
    headline: string;
    bio: string[];
    portrait?: ImageMedia;
    facts: Fact[];
    principles: Principle[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    subline: string;
    /** Short prompt next to the résumé download. */
    cvNote: string;
    /** Phrases looping in the marquee that opens the contact section. */
    marquee: string[];
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    twitterHandle?: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
}
