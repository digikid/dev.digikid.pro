type BaseData = {
  id: string;
  active: boolean;
};

type ProjectsData = BaseData & {
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

type ProjectsLocale = {
  title: string;
  description?: string;
  details?: string[];
};

type ProjectsItem = ProjectsData & ProjectsLocale;

type EducationData = BaseData & {
  date: number;
  url?: string;
};

type EducationLocale = {
  title: string;
  text: string;
};

type EducationItem = EducationData & EducationLocale;

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

type ExperienceItem = ExperienceData & ExperienceLocale;

type SkillsData = BaseData & {
  categories: string[];
};

type SkillsLocale = {
  title: string;
};

type SkillsItem = SkillsData & SkillsLocale;

type ContactsSubitem = BaseData & {
  title: string;
  url: string;
};

type ContactData = BaseData & {
  items: ContactsSubitem[];
};

type ContactsLocalize = {
  title: string;
  text: string;
};

type ContactsItem = ContactData & ContactsLocalize;

type ToolsData = BaseData & {
  categories: string[];
  url: string;
};

type ToolsLocale = {
  title: string;
  text: string;
};

type ToolsItem = ToolsData & ToolsLocale;

type FactsFallback = {
  text: string;
  button: string;
};

type FactsItem = {
  title: string;
  button: string;
  fallback: FactsFallback;
  items: string[];
};
