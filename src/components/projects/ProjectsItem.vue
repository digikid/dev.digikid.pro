<script setup lang="ts">
import ProjectsHeader from '@components/projects/ProjectsHeader.vue';
import ProjectsFooter from '@components/projects/ProjectsFooter.vue';

const props = defineProps<{
  project: ProjectsItem;
}>();
</script>

<template>
  <div
    v-if="props.project"
    class="projects__item"
    :class="{
      'projects__item--large': props.project.large
    }"
  >
    <ProjectsHeader :project="props.project" />
    <ProjectsFooter :project="props.project" />
  </div>
</template>

<style>
.projects__item {
  @apply relative w-full inline-block bg-white dark:bg-neutral-900 text-center md:text-left;
}

.projects__item--large {
  @apply md:text-center;
}
</style>
