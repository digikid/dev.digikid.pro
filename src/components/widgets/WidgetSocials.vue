<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';

const { items: contacts } = useData<ContactData, ContactsLocalize>('contacts');

const data = computed(() => contacts.value.find((item) => item.id === 'socials') || {
  title: '',
  text: '',
  items: [],
});
const items = computed(() => (data.value ? data.value.items : []));
</script>

<template>
  <div
    v-if="items.length"
    class="socials"
  >
    <div
      v-if="data.title || data.text"
      class="socials-header"
    >
      <div
        v-if="data.title"
        class="inline-flex flex-wrap items-center text-xl sm:text-[3vw] md:text-[2.5vw] lg:text-base font-bold mb-2"
      >
        <img
          class="inline w-5 h-5 mr-3"
          src="/images/emoji/write.png"
        >
        <span class="inline">{{ data.title }}</span>
      </div>
      <div
        v-if="data.text"
        class="text-base lg:text-sm text-neutral-400 dark:text-neutral-700"
      >
        {{ data.text }}
      </div>
    </div>
    <div class="socials-content mt-4">
      <div class="inline-flex flex-wrap gap-6 lg:gap-3">
        <a
          v-for="item in items"
          :key="item.id"
          :href="item.url"
          target="_blank"
          class="block w-10 h-10 lg:w-6 lg:h-6 opacity-20 dark:opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
        >
          <img
            :src="`/images/socials/${item.id}-colored.svg`"
            :alt="item.title"
          >
        </a>
      </div>
    </div>
  </div>
</template>
