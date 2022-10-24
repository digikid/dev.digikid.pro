type BaseData = {
  id: string;
  active: boolean;
};

type ProjectData = BaseData & {
  date: number;
  categories: string[];
  stack: string[];
  repo: string;
  version: string;
  url?: string;
  repo?: string;
  demo?: string;
  finish?: number;
  logo?: string;
  large?: boolean;
};

type ProjectLocale = {
  title: string;
  description?: string;
  details?: string[];
};

type ProjectLink = Record<string, {
  url: string;
  title: string;
}>;

type Project = ProjectData & ProjectLocale;

type ExperienceData = BaseData & {
  date: number;
  finish: number;
  url?: string;
};

type ExperienceLocale = {
  title: string;
  subtitle: string;
  text: string;
};

type Experience = ExperienceData & ExperienceLocale;

type SkillsData = BaseData & {
  categories: string[];
};

type SkillsLocale = {
  title: string;
};

type Skills = SkillsData & SkillsLocale;

type ContactsItem = BaseData & {
  title: string;
  url: string;
};

type ContactData = BaseData & {
  items: ContactsItem[];
};

type ContactsLocalize = {
  title: string;
  text: string;
};

type Contacts = ContactData & ContactsLocalize;

type ToolsData = BaseData & {
  categories: string[];
  url: string;
};

type ToolsLocale = {
  title: string;
  text: string;
};

type Tools = ToolsData & ToolsLocale;

type FactsFallback = {
  text: string;
  button: string;
};

type Facts = {
  title: string;
  button: string;
  fallback: FactsFallback;
  items: string[];
};
