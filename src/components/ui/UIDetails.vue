<script setup lang="ts">
import { Float } from '@headlessui-float/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

import IconInfo from '@components/icons/IconInfo.vue';
import IconCheck from '@components/icons/IconCheck.vue';

const props = withDefaults(defineProps<{
  title: string;
  items: string[];
}>(), {
  title: '',
  items: () => [],
});
</script>

<template>
  <div
    v-if="items.length"
    class="details"
  >
    <Popover class="details__popover">
      <Float
        placement="bottom-start"
        :offset="{
          mainAxis: 15
        }"
        :shift="6"
        :flip="10"
        portal
        enter="transition duration-200 ease-out"
        enter-from="opacity-0 -translate-y-1"
        enter-to="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 -translate-y-1"
      >
        <PopoverButton
          class="details__button"
        >
          <IconInfo class="details__icon details__icon--info" />
          <span class="details__title">
            {{ props.title }}
          </span>
        </PopoverButton>
        <PopoverPanel>
          <div class="details__dropdown">
            <ul class="details__list">
              <li
                v-for="(item, i) in props.items"
                :key="i"
                class="details__item"
              >
                <IconCheck class="details__icon details__icon--check" />
                {{ item }}
              </li>
            </ul>
          </div>
        </PopoverPanel>
      </Float>
    </Popover>
  </div>
</template>

<style>
.details {}

.details__button {
  @apply inline-flex items-center text-sm font-semibold transition-colors text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 border-transparent focus:border-transparent focus:ring-0 focus:outline-none;
}

.details__title {
  @apply inline-block;
}

.details__dropdown {
  @apply w-[320px] text-sm dark:text-dusky-400 dark:text-neutral-200 bg-white dark:bg-neutral-900 rounded-xl shadow overflow-hidden shadow-neutral-300 dark:shadow-black py-3 px-4;
}

.details__list {
  @apply space-y-1 max-w-md list-inside;
}

.details__item {
  @apply flex mb-2 last:mb-0;
}

.details__icon {}

.details__icon--info {
  @apply inline-block w-5 h-5 mr-1;
}

.details__icon--check {
  @apply w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0;
}
</style>
