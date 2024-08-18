import { intervalToDuration, formatDuration } from 'date-fns';
import { Locale, ru } from 'date-fns/locale';
import { capitalize } from '@utils/string';

export const isISODate = (dt: string): boolean => {
  if (
    typeof dt !== 'string' ||
    (dt.includes('T') && !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dt)) ||
    !/\d{4}-\d{2}-\d{2}/.test(dt)
  ) {
    return false;
  }

  try {
    const date: Date = new Date(dt);

    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(dt);
  } catch (e) {}

  return false;
};

export const format = (dt: string, locale = 'en-US'): string => {
  if (!isISODate(dt)) {
    return '';
  }

  const date: Date = new Date(dt);

  return capitalize(date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    // day: '2-digit',
  })).replace(/\s*г\./, '');
};

export const formatInterval = (start: string, end: string, { locale, ...options }: Record<string, any> = {}): string => {
  if (!isISODate(start) || !isISODate(end)) {
    return '';
  }

  const startDate: Date = new Date(start);
  const endDate: Date = new Date(end);
  const minDate: Date = new Date(Math.min(startDate.getTime(), endDate.getTime()));
  const maxDate: Date = new Date(Math.max(startDate.getTime(), endDate.getTime()));

  return formatDuration(intervalToDuration({
    start: minDate,
    end: maxDate,
  }), {
    locale: locale === 'ru-RU' ? ru : undefined,
    ...options,
  });
};
