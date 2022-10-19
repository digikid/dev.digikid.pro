<script setup lang="ts">
const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    v-if="props.project.title"
    class="font-bold text-3xl break-words mb-3"
    :class="props.project.large ? '' : 'md:text-xl md:mb-2'"
  >
    {{ props.project.title }}
  </div>
</template>
