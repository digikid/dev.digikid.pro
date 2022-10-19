<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';

const props = withDefaults(defineProps<{
  id?: string;
  title?: string;
  text?: string;
}>(), {
  id: '',
  title: '',
  text: '',
});

const { messages } = useLocale();

const section = computed(() => {
  const { sections } = messages.value;

  if (Array.isArray(sections)) {
    const section = sections.find(({ id }) => id === props.id);

    if (section) {
      const { title, text } = section;

      return {
        title,
        text,
      };
    }
  }

  return {
    title: '',
    text: '',
  };
});

const title = computed<string>(() => props.title || section.value.title);
const text = computed<string>(() => props.text || section.value.text);
</script>

<template>
  <section
    :id="props.id"
    class="section relative pb-10 lg:pb-16 last:pb-4 lg:last:pb-4"
  >
    <div
      v-if="title"
      class="section-header mb-6 lg:mb-8"
    >
      <h2
        v-if="title"
        class="section-title font-black text-[8vw] lg:text-[4vw] lg:leading-none"
      >
        {{ title }}
      </h2>
      <div
        v-if="text"
        class="section-text text-lg md:text-xl dark:text-neutral-500 w-full md:w-4/5 xl:w-3/4 3xl:w-1/2 leading-normal whitespace-pre-line"
        :class="title ? 'mt-4 lg:mt-8' : ''"
      >
        {{ text }}
      </div>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>
