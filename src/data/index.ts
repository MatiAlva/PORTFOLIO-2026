import type { Locale } from '@/i18n/config';
import { ui, type UiStrings } from '@/i18n/ui';
import type {
  Experience,
  NavItem,
  Project,
  SiteConfig,
  Skill,
  SkillCategoryMeta,
  SocialLink,
} from '@/types/content';
import { experience } from './experience';
import { navigation } from './navigation';
import { projects } from './projects';
import { site } from './site';
import { skillCategories, skills } from './skills';
import { socials } from './socials';

export interface Content {
  locale: Locale;
  site: SiteConfig;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  skillCategories: SkillCategoryMeta[];
  navigation: NavItem[];
  socials: SocialLink[];
  ui: UiStrings;
}

const build = (locale: Locale): Content => ({
  locale,
  site: site[locale],
  projects: projects[locale],
  experience: experience[locale],
  skills: skills[locale],
  skillCategories: skillCategories[locale],
  navigation: navigation[locale],
  socials,
  ui: ui[locale],
});

export const content: Record<Locale, Content> = { es: build('es'), en: build('en') };
