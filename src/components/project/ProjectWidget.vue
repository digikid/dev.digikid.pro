<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string,
}>(), {
  title: '',
});
</script>

<template>
  <div
    v-if="$slots.default"
    class="project-widget"
  >
    <div
      v-if="props.title"
      class="text-xs font-semibold tracking-wide whitespace-nowrap mb-1 text-neutral-400 dark:text-neutral-600"
    >
      {{ props.title }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
