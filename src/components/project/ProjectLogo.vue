<script setup lang="ts">
const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    v-if="props.project.logo"
    class="w-full mx-auto mb-6 text-center mt-2 md:mt-0"
    :class="props.project.large ? '' : 'md:w-1/4 md:ml-6 md:float-right'"
  >
    <img
      :src="props.project.logo"
      :alt="props.project.title"
      class="dark:mix-blend-exclusion max-w-full max-h-24 mx-auto"
    >
  </div>
</template>
