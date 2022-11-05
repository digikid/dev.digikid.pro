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
    class="section"
  >
    <div
      v-if="title"
      class="section__header"
    >
      <h2
        v-if="title"
        class="section__title"
      >
        {{ title }}
      </h2>
      <div
        v-if="text"
        class="section__text"
      >
        {{ text }}
      </div>
    </div>
    <div class="section__content">
      <slot />
    </div>
  </section>
</template>

<style>
.section {
  @apply relative pb-10 lg:pb-16 last:pb-4 lg:last:pb-4;
}

.section__header {
  @apply mb-6 lg:mb-8;
}

.section__title {
  @apply font-black text-[8vw] lg:text-[4vw] lg:leading-none mb-4 lg:mb-8;
}

.section__text {
  @apply text-lg md:text-xl dark:text-neutral-500 w-full md:w-4/5 xl:w-3/4 3xl:w-1/2 leading-normal whitespace-pre-line;
}

.section__content {}
</style>
