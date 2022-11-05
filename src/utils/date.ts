import { capitalize } from '@utils/string';

export const format = (ms?: number, locale = 'en-US'): string => {
  if (typeof ms !== 'number') return '';

  const date = new Date(ms);

  return capitalize(date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    // day: '2-digit',
  })).replace(/\s*г\./, '');
};
