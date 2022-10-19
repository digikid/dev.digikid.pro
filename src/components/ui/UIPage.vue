<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';

import { useLocale } from '@hooks/locale';
import { useRouting } from '@hooks/routing';
import { useGlobalStore } from '@stores/global';

const props = withDefaults(defineProps<{
  id?: string;
  title?: string;
  text?: string;
  bg?: boolean;
}>(), {
  id: '',
  title: '',
  text: '',
  bg: false,
});

const store = useGlobalStore();

const { page, route } = useRouting();
const { locale, messages } = useLocale();

const data = computed(() => {
  const id = props.id || page.value?.id || '';
  const title = props.title || page.value?.pageTitle || page.value?.title || '';
  const text = props.text || page.value?.text || '';
  const bg = (props.bg && (typeof route.name === 'string')) ? `/images/bg/${route.name}.png` : '';

  return {
    id,
    title,
    text,
    bg,
  };
});

const updateChapters = () => {
  const sections = document.querySelectorAll('section');

  const ids = sections ? Array.from(sections).map((section) => section.id) : [];

  store.chapters = ids.reduce((acc, id) => {
    const { sections } = messages.value;

    if (Array.isArray(sections)) {
      const section = sections.find((item) => item.id === id);

      if (section) {
        const { title } = section;

        acc.push({
          id,
          title,
        });
      }
    }

    return acc;
  }, [] as NavItem[]);
};

onMounted(() => {
  updateChapters();

  store.randomFact();
});

watch(() => locale.value, updateChapters);
</script>

<template>
  <article
    :id="data.id ? `page-${data.id}` : ''"
    class="page relative w-full h-full grow"
  >
    <div
      v-if="data.bg"
      class="hidden 2xl:block absolute top-5 right-0 w-[30%]"
    >
      <img
        class="max-h-[475px]"
        :src="data.bg"
      >
    </div>
    <div class="page-wrapper w-[1600px] max-w-full mx-auto p-4 sm:p-8 lg:p-8 pb-8 sm:pb-12 lg:pb-12 lg:px-[42px]">
      <div
        v-if="data.title"
        class="page-header mb-8 lg:mb-16"
      >
        <h1
          v-if="data.title"
          class="page-title font-black text-[10vw] lg:text-[8vw] lg:leading-none"
        >
          {{ data.title }}
        </h1>
        <div
          v-if="data.text"
          class="page-text text-lg md:text-xl dark:text-neutral-500 w-full md:w-4/5 xl:w-3/4 3xl:w-1/2 leading-normal whitespace-pre-line"
          :class="data.title ? 'mt-4 lg:mt-8' : ''"
        >
          {{ data.text }}
        </div>
      </div>
      <div class="page-content">
        <slot />
      </div>
    </div>
  </article>
</template>
