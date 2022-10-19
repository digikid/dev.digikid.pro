import config from '@src/config';

const withPrefix = (key: string) => `${config.prefix}_${key.toUpperCase().replace(/-/g, '_')}`;

export const get = (key: string) => localStorage.getItem(withPrefix(key));

export const set = (key: string, value: any) => localStorage.setItem(withPrefix(key), value.toString());

export const remove = (key: string) => localStorage.removeItem(withPrefix(key));
