<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useGlobalStore } from '@stores/global';

const { messages } = useLocale();

const store = useGlobalStore();

const facts = computed<FactsItem>(() => messages.value.facts as FactsItem);
const items = computed<string[]>(() => (facts.value as any)?.items || []);
const fact = computed<string>(() => (items.value.length ? items.value[store.factId] : ''));
</script>

<template>
  <div
    v-if="items.length"
    class="facts"
  >
    <div
      v-if="facts.title"
      class="facts__header"
    >
      <img
        class="facts__icon"
        src="/images/emoji/crazy.png"
      >
      <span class="facts__title">{{ facts.title }}</span>
    </div>
    <div class="facts__main">
      <a
        href="#"
        class="facts__text"
        @click.prevent="store.randomFact"
      >
        {{ fact }}
      </a>
    </div>
  </div>
</template>

<style>
.facts {
  @apply relative;
}

.facts__header {
  @apply flex flex-wrap items-center text-xl sm:text-[3vw] md:text-[2.5vw] lg:text-base font-bold mb-2;
}

.facts__icon {
  @apply inline w-5 h-5 mr-2;
}

.facts__title {
  @apply inline;
}

.facts__main {
  @apply min-h-[60px];
}

.facts__text {
  @apply block text-sm cursor-pointer;
}
</style>
