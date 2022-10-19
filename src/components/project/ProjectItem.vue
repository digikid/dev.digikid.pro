<script setup lang="ts">
import ProjectHeader from '@components/project/ProjectHeader.vue';
import ProjectFooter from '@components/project/ProjectFooter.vue';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    v-if="props.project"
    class="project relative w-full inline-block bg-white text-center dark:bg-neutral-900"
    :class="props.project.large ? '' : 'md:text-left'"
  >
    <ProjectHeader :project="props.project" />
    <ProjectFooter :project="props.project" />
  </div>
</template>
