import { defineStore } from 'pinia';

import { get as getLocal } from '@utils/localStorage';
import { locale as osLocale, colorMode as osColorMode } from '@utils/os';
import { sample } from '@utils/random';

import config from '@src/config';

import en from '@locales/en.json';

const getGradient = sample(config.gradients);

const facts = en?.facts?.items || [];
const factIds = Array.from(Array(facts.length).keys());
const getFactId = sample(factIds);

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isHeaderActive: false,
    locale: getLocal('user-locale') || osLocale,
    colorMode: getLocal('user-color-mode') || osColorMode,
    chapters: [] as NavItem[],
    factId: getFactId(),
    getGradient,
  }),
  actions: {
    randomFact() {
      this.factId = getFactId();
    },
  },
});
