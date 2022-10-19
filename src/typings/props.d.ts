type GridSize = '1/1' | '1/2' | '1/3' | '1/4';

type GridFilter = {
  id: string;
  active: boolean;
  title: string;
  total: number;
};

type GridData = Record<string, {
  categories: string[];
  filters: string[];
  title: string;
  sort: number;
}>;

type NavItem = {
  id: string;
  title: string;
  active?: boolean;

  [key: string]: any;
};

type TimelineItem = {
  id: string;
  date: string;
  finish?: string;
  title: string;
  subtitle?: string;
  label?: string;
  text?: string;
  url?: string;
};
