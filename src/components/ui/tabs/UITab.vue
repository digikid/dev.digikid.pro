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
    class="tabs-item"
    :class="activeId === props.id ? 'block opacity-0 fade-in' : 'hidden'"
  >
    <slot />
  </div>
</template>
