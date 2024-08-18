type BaseData = {
  id: string;
  active: boolean;
};

type ProjectsData = BaseData & {
  start: string;
  finish?: string;
  categories: string[];
  stack: string[];
  repo: string;
  version: string;
  url?: string;
  repo?: string;
  demo?: string;
  logo?: string;
  large?: boolean;
  className?: string;
};

type ProjectsLocale = {
  title: string;
  description?: string;
  details?: string[];
};

type ProjectsItem = ProjectsData & ProjectsLocale;

type EducationData = BaseData & {
  start: string;
  url?: string;
};

type EducationLocale = {
  title: string;
  text: string;
};

type EducationItem = EducationData & EducationLocale;

type ExperienceData = BaseData & {
  start: string;
  finish?: string;
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
