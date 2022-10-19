import { createI18n } from 'vue-i18n';

import { get as getLocal } from '@utils/localStorage';
import { locale as osLocale } from '@utils/os';

import en from '@locales/en.json';
import ru from '@locales/ru.json';

export const fallbackLocale = 'en';

export const messages = {
  en,
  ru,
};

const i18n = createI18n({
  locale: getLocal('user-locale') || osLocale,
  fallbackLocale,
  messages,
});

export default i18n;
