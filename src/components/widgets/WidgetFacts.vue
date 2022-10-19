<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useGlobalStore } from '@stores/global';

const { messages } = useLocale();

const store = useGlobalStore();

const facts = computed<Facts>(() => messages.value.facts as Facts);
const items = computed<string[]>(() => (facts.value as any)?.items || []);
const fact = computed<string>(() => (items.value.length ? items.value[store.factId] : ''));
</script>

<template>
  <div
    v-if="items.length"
    class="facts relative"
  >
    <div
      v-if="facts.title"
      class="flex flex-wrap items-center text-xl sm:text-[3vw] md:text-[2.5vw] lg:text-base font-bold mb-2"
    >
      <img
        class="inline w-5 h-5 mr-2"
        src="/images/emoji/crazy.png"
      >
      <span class="inline">{{ facts.title }}</span>
    </div>
    <div class="min-h-[60px]">
      <a
        href="#"
        class="block text-sm"
        @click.prevent="store.randomFact"
      >
        {{ fact }}
      </a>
    </div>
  </div>
</template>
