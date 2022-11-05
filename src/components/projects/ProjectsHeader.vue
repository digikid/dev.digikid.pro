<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import UIDetails from '@components/ui/UIDetails.vue';

const { t } = useLocale();

const props = defineProps<{
  project: ProjectsItem;
}>();
</script>

<template>
  <div
    class="projects__header"
    :class="{
      'projects__header--large': props.project.large
    }"
  >
    <div
      v-if="props.project.logo"
      class="projects__logo"
    >
      <img
        :src="props.project.logo"
        :alt="props.project.title"
      >
    </div>
    <div class="projects__heading">
      <div
        v-if="props.project.title"
        class="projects__title"
      >
        {{ props.project.title }}
      </div>
      <div
        v-if="props.project.description"
        class="projects__description"
      >
        {{ props.project.description }}
      </div>
      <div
        v-if="props.project.details"
        class="projects__details"
      >
        <UIDetails
          :title="t('project.details')"
          :items="project.details"
        />
      </div>
    </div>
  </div>
</template>

<style>
.projects__header {
  @apply relative px-4 pt-4 pb-1 md:px-6 md:pt-4;
}

.projects__header--large {
  @apply md:pt-6;
}

.projects__details {
  @apply mt-3;
}

.projects__logo {
  @apply w-full mx-auto mb-6 text-center mt-2 md:mt-0 md:w-1/4 md:ml-6 md:float-right;
}

.projects__logo img {
  @apply dark:mix-blend-exclusion max-w-full max-h-24 mx-auto;
}

.projects__header--large .projects__logo {
  @apply md:w-full md:float-none md:mx-auto;
}

.projects__heading {}

.projects__title {
  @apply font-bold text-3xl break-words mb-3 md:text-xl md:mb-2;
}

.projects__header--large .projects__title {
  @apply md:text-3xl;
}
</style>
