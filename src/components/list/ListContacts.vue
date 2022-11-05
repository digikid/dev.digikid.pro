<script setup lang="ts">
import { useLocale } from '@hooks/locale';
import { useGlobalStore } from '@stores/global';

import IconLocation from '@components/icons/IconLocation.vue';

const props = withDefaults(defineProps<{
  items?: ContactsItem[],
}>(), {
  items: () => [],
});

const { t } = useLocale();

const store = useGlobalStore();

const isLocation = (item: ContactsItem) => (item.id === 'location');
</script>

<template>
  <div
    v-if="props.items.length"
    class="contacts__list"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="contacts__item"
      :class="{
        'contacts__item--location': isLocation(item)
      }"
    >
      <div class="contacts__header">
        <div class="contacts__title">
          {{ item.title }}
        </div>
        <div class="contacts__text">
          {{ item.text }}
        </div>
      </div>
      <div class="contacts__main">
        <div
          v-if="isLocation(item)"
          class="contacts__visual"
        >
          <IconLocation class="contacts__icon" />
        </div>
        <component
          :is="isLocation(item) ? 'div' : 'a'"
          v-for="subitem in item.items"
          :key="subitem.id"
          class="contacts__tile"
          :class="store.getGradient()"
          :href="subitem.url"
          :target="(subitem.url && !subitem.url.includes('mailto')) ? '_blank' : null"
        >
          {{ isLocation(item) ? t('location') : subitem.title }}
        </component>
      </div>
    </div>
  </div>
</template>

<style>
.contacts__list {
  @apply grid md:grid-cols-2 lg:grid-cols-none xl:grid-cols-2 2xl:grid-rows-2 2xl:grid-flow-col gap-4 md:gap-6;
}

.contacts__item {
  @apply relative text-center flex flex-col justify-between w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl 2xl:col-span-1 2xl:row-span-1;
}

.contacts__item--location {
  @apply md:col-span-2 lg:col-auto xl:col-span-2 2xl:row-span-2 2xl:col-span-1;
}

.contacts__header {
  @apply px-4 py-6 sm:px-6 sm:py-8;
}

.contacts__main {
  @apply grow flex flex-col items-center justify-center bg-neutral-100 dark:bg-dusky-900 rounded-t-3xl px-5 py-8 mt-2;
}

.contacts__item--location .contacts__main {
  @apply lg:pb-8;
}

.contacts__title {
  @apply font-black text-[6.5vw] sm:text-[4.75vw] md:text-[3.5vw] lg:text-3xl 2xl:text-4xl mb-3;
}

.contacts__text {
  @apply 2xl:max-w-[75%] mx-auto text-lg text-neutral-400;
}

.contacts__visual {
  @apply w-full text-center text-neutral-200 dark:text-neutral-800 mb-6 2xl:mb-16;
}

.contacts__icon {
  @apply inline-block w-20 h-20;
}

.contacts__tile {
  @apply block font-black 2xl:max-w-[90%] mx-auto mb-1 last:mb-0;
}

div.contacts__tile {
  @apply text-4xl xs:text-5xl xl:text-7xl;
  line-height: 1.15 !important;
}

a.contacts__tile {
  @apply cursor-pointer text-transparent bg-clip-text bg-gradient-to-r text-3xl xs:text-4xl;
  line-height: 1.25 !important;
}
</style>
