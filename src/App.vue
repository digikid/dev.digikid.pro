<script setup lang="ts">
import {
  ref, computed, watch, onMounted, markRaw, inject,
} from 'vue';

import { useGlobalStore } from '@stores/global';
import { useDataStore } from '@stores/data';

import { useLocale } from '@hooks/locale';
import { useRouting } from '@hooks/routing';

import { set as setLocal } from '@utils/localStorage';
import { updateTitle } from '@utils/dom';
import { capitalize } from '@utils/string';
import { print } from '@utils/log';

import config from '@src/config';

import MainLayout from '@layouts/MainLayout.vue';

const { t, locale, messages } = useLocale();
const { route } = useRouting();

const store = useGlobalStore();
const dataStore = useDataStore();

const layout = ref();

const metrika = inject<YandexMetrika.Counter>('metrika');

const greetings = computed(() => {
  const main = messages.value?.main as any;

  return (main.greetings ? main.greetings : []) as string[];
});

const showGreetings = (clear = false) => {
  if (config.prod) {
    if (clear) {
      console.clear();
    }

    print(greetings.value, true);
  }
};

(async () => {
  if (store.colorMode === 'dark') {
    document.documentElement.classList.add('dark');
  }

  showGreetings();

  await dataStore.loadVersions();
})();

onMounted(() => {
  document.fonts.ready.then(() => {
    document.querySelector('#app')?.classList.add('app--ready');
  });
});

watch(
  () => route.meta?.layout as string,
  async (id) => {
    try {
      const path = `@layouts/${capitalize(id)}Layout.vue`;
      const component = await import(/* @vite-ignore */path);

      layout.value = markRaw(component?.default || MainLayout);
    } catch (e) {
      layout.value = markRaw(MainLayout);
    }
  },
  {
    immediate: true,
  },
);

watch(() => store.colorMode, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark');

  setLocal('user-color-mode', value);
});

watch(() => locale.value, (value, prev) => {
  document.documentElement.lang = value;

  setLocal('user-locale', value);

  showGreetings(true);

  if (prev && (prev !== value)) {
    const page = (messages.value.pages as LocaleRecord[]).find((item) => item.id === route.name);
    const title = (page && page.title) ? page.title : t('main.title');
    const description = (page && page.text) ? page.text : t('main.description');

    const args: Parameters<YandexMetrika.Counter['hit']> = [route.path];

    if (page && page.title) {
      args.push({
        title,
      });
    }

    updateTitle(`${title} — ${t('main.title')}`, description);

    metrika?.hit(...args);
  }
});
</script>

<template>
  <div class="wrapper">
    <component :is="layout" />
  </div>
</template>

<style>
html, body, .app, .wrapper {
  @apply w-full h-full;
}

html, body {
  @apply overflow-hidden;
}

body {
  @apply bg-neutral-200 dark:bg-black text-neutral-900 dark:text-dusky-100;
}

.app {
  @apply overflow-auto no-scrollbar opacity-0;
}

.app--ready {
  @apply fade-in;
}
</style>
