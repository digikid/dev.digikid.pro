<script setup lang="ts">
import ProjectDetails from '@components/project/ProjectDetails.vue';
import ProjectLogo from '@components/project/ProjectLogo.vue';
import ProjectTitle from '@components/project/ProjectTitle.vue';
import ProjectDescription from '@components/project/ProjectDescription.vue';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    class="project-header relative px-4 pt-4 pb-1 md:px-6"
    :class="props.project.large ? 'md:pt-6' : 'md:pt-4'"
  >
    <ProjectLogo :project="props.project" />
    <div>
      <ProjectTitle :project="props.project" />
      <ProjectDescription :project="props.project" />
      <ProjectDetails :project="props.project" />
    </div>
  </div>
</template>
