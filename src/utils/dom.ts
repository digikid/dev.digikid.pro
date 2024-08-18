import { truncate } from '@utils/string';

export const setStyle = (el: HTMLElement | HTMLElement[], prop: string, value?: string): void => {
  const elements = Array.isArray(el) ? el : [el];

  elements.forEach((el) => (value ? el.style.setProperty(prop, value) : el.style.removeProperty(prop)));
};

export const mediaMin = (point: number) => window.matchMedia(`(min-width: ${point}px)`).matches;

export const mediaMax = (point: number) => window.matchMedia(`(max-width: ${point}px)`).matches;

export const loadScript = (scriptSrc: string) => new Promise((resolve, reject) => {
  if (typeof window === 'undefined') {
    reject(new Error('Global window object is not defined.'));
  }

  try {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');

    script.async = true;
    script.charset = 'utf-8';
    script.src = scriptSrc;

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  } catch (e) {}
});

export const updateMeta = (key: string, content = '') => {
  const selector = `meta[${key}]`;
  const el = document.querySelector(selector);

  if (el && (el.getAttribute('content') !== content)) {
    el.setAttribute('content', content);
  }
};

export const updateTitle = (title: string, description = '') => {
  if (document.title !== title) {
    document.title = title;

    [
      'property="og:title"',
      'property="twitter:title"',
    ].forEach((key) => updateMeta(key, title.split(' — ')[0]));
  }

  [
    'name="description"',
    'property="og:description"',
    'property="twitter:description"',
  ].forEach((key) => updateMeta(key, truncate(description.split('. ')[0])));

  [
    'property="og:url"',
    'property="twitter:url"',
  ].forEach((key) => updateMeta(key, window.location.href));
};
