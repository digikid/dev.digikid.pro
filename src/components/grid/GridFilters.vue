<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import IconRemove from '@components/icons/IconRemove.vue';

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
    class="grid__filters"
  >
    <div class="grid__filters-heading">
      {{ t('filters') }}
    </div>
    <div class="grid__filters-list">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="grid__filters-item"
        :class="{
          'grid__filters-item--active': item.active
        }"
      >
        <span
          class="grid__filters-title"
          @click="onClick(item.id)"
        >
          {{ item.title }}
          <span
            v-if="!item.active"
            class="grid__filters-counter"
          >
            {{ item.total }}
          </span>
        </span>
        <button
          v-if="item.active"
          class="grid__filters-remove"
          aria-label="Remove"
          @click="onClick(item.id)"
        >
          <IconRemove class="grid__filters-icon" />
          <span class="sr-only">{{ t('controls.remove') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.grid__filters {}

.grid__filters-heading {
  @apply font-black text-2xl text-neutral-900 dark:text-neutral-100 mb-4;
}

.grid__filters-list {}

.grid__filters-item {
  @apply inline-flex items-center text-sm md:text-base font-bold dark:text-dusky-50 overflow-hidden rounded-lg px-3 py-2 md:px-4 mr-1.5 md:mr-3 mb-1.5 md:mb-3 bg-white dark:bg-neutral-900;
}

.grid__filters-item--active {
  @apply bg-sky-600 text-white;
}

.grid__filters-title {
  @apply cursor-pointer;
}

.grid__filters-counter {
  @apply text-sky-600 ml-1;
}

.grid__filters-remove {
  @apply inline-flex items-center ml-2 rounded transition-opacity opacity-50 hover:opacity-100;
}

.grid__filters-icon {
  @apply w-3.5 h-3.5;
}
</style>
