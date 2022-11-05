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
      class="socials__header"
    >
      <div
        v-if="data.title"
        class="socials__heading"
      >
        <img
          class="socials__icon"
          src="/images/emoji/write.png"
        >
        <span class="socials__title">{{ data.title }}</span>
      </div>
      <div
        v-if="data.text"
        class="socials__text"
      >
        {{ data.text }}
      </div>
    </div>
    <div class="socials__main">
      <div class="socials__list">
        <a
          v-for="item in items"
          :key="item.id"
          :href="item.url"
          target="_blank"
          class="socials__item"
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

<style>
.socials {}

.socials__heading {
  @apply inline-flex flex-wrap items-center text-xl sm:text-[3vw] md:text-[2.5vw] lg:text-base font-bold mb-2;
}

.socials__icon {
  @apply inline w-5 h-5 mr-3;
}

.socials__title {
  @apply inline;
}

.socials__text {
  @apply text-base lg:text-sm text-neutral-400 dark:text-neutral-700;
}

.socials__main {
  @apply mt-4;
}

.socials__list {
  @apply inline-flex flex-wrap gap-6 lg:gap-3;
}

.socials__item {
  @apply block w-10 h-10 lg:w-6 lg:h-6 opacity-20 dark:opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0;
}
</style>
