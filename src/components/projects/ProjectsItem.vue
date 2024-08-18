<script setup lang="ts">
import { computed } from 'vue';

import ProjectsHeader from '@components/projects/ProjectsHeader.vue';
import ProjectsFooter from '@components/projects/ProjectsFooter.vue';

const props = defineProps<{
  project: ProjectsItem;
}>();

const className = computed(() => {
  const classNames: string[] = [];

  if (props.project.large) {
    classNames.push('projects__item--large');
  }

  if (props.project.className) {
    classNames.push(props.project.className);
  }

  return classNames.join(' ');
});
</script>

<template>
  <div
    v-if="props.project"
    class="projects__item"
    :class="className"
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
