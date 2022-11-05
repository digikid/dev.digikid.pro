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
    class="projects__widget"
  >
    <div
      v-if="props.title"
      class="projects__widget-title"
    >
      {{ props.title }}
    </div>
    <div class="projects__widget-content">
      <slot />
    </div>
  </div>
</template>

<style>
.projects__widget {}

.projects__widget-title {
  @apply text-xs font-semibold tracking-wide whitespace-nowrap mb-1 text-neutral-400 dark:text-neutral-600;
}

.projects__widget-content {}
</style>
