<script setup lang="ts">
import ProjectVersion from '@components/project/ProjectVersion.vue';
import ProjectDate from '@components/project/ProjectDate.vue';
import ProjectFinish from '@components/project/ProjectFinish.vue';
import ProjectStack from '@components/project/ProjectStack.vue';
import ProjectLinks from '@components/project/ProjectLinks.vue';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="project-footer relative clear-both mt-3 px-4 py-5 md:px-6 md:py-5 bg-neutral-100 dark:bg-dusky-900 rounded-t-xl">
    <div class="flex gap-2">
      <ProjectDate
        class="w-1/2 grow"
        :project="project"
      />
      <ProjectFinish
        class="w-1/2"
        :project="project"
      />
      <ProjectVersion
        v-if="props.project.repo"
        class="w-1/2"
        :project="project"
      />
    </div>
    <ProjectStack
      :project="project"
      class="mt-3"
    />
    <ProjectLinks
      class="mt-3"
      :project="project"
    />
  </div>
</template>
