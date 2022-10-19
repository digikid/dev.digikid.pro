<script setup lang="ts">
import { useLocale } from '@hooks/locale';

const props = withDefaults(defineProps<{
  items?: GridFilter[]
}>(), {
  items: () => [],
});

const emit = defineEmits<{ (e: 'update', id: string): void }>();

const { t } = useLocale();

const onClick = (id: string) => emit('update', id);
</script>

<template>
  <div
    v-if="props.items.length"
  >
    <div class="font-black text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
      {{ t('filters') }}
    </div>
    <div
      v-for="item in props.items"
      :key="item.id"
      class="inline-flex items-center mr-1.5 md:mr-3 mb-1.5 md:mb-3 text-sm md:text-base font-bold dark:text-dusky-50 overflow-hidden rounded-lg px-3 py-2 md:px-4"
      :class="item.active ? 'bg-sky-600 text-white' : 'bg-white dark:bg-neutral-900'"
    >
      <span
        class="cursor-pointer"
        @click="onClick(item.id)"
      >
        {{ item.title }}
        <span
          v-if="!item.active"
          class="text-sky-600 ml-1"
        >
          {{ item.total }}
        </span>
      </span>
      <button
        v-if="item.active"
        class="inline-flex items-center ml-2 rounded transition-opacity opacity-50 hover:opacity-100"
        aria-label="Remove"
        @click="onClick(item.id)"
      >
        <svg
          aria-hidden="true"
          class="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg>
        <span class="sr-only">Remove</span>
      </button>
    </div>
  </div>
</template>
