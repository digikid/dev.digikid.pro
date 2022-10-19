<script setup lang="ts">
const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    v-if="props.project.description"
  >
    {{ props.project.description }}
  </div>
</template>
