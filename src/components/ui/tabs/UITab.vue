<script setup lang="ts">
import { inject } from 'vue';

const props = withDefaults(defineProps<{
  id: string;
  title?: string;
  active?: boolean;
}>(), {
  title: '',
  active: false,
});

const activeId = inject('activeId');
</script>

<template>
  <div
    :id="`tab-${props.id}`"
    class="tabs__item"
    :class="{
      'tabs__item--active': (activeId === props.id)
    }"
  >
    <slot />
  </div>
</template>

<style>
.tabs__item {
  @apply hidden;
}

.tabs__item--active {
  @apply block opacity-0 fade-in;
}
</style>
