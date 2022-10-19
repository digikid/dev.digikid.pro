<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';

import ProjectWidget from '@components/project/ProjectWidget.vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useLocale();

const links = computed<ProjectLink>(() => (['repo', 'demo', 'url'] as const).reduce((acc, id) => {
  const url = props.project[id];

  if (url) {
    acc[id] = {
      url,
      title: t(`project.${id}`),
    };
  }

  return acc;
}, {} as ProjectLink));
</script>

<template>
  <ProjectWidget v-if="Object.keys(links).length">
    <div class="text-lg lg:text-base">
      <span
        v-for="(link, id, i) in links"
        :key="id"
        class="align-middle"
      >
        <span
          v-if="i"
          class="inline-block mx-2 text-neutral-200 dark:text-neutral-800"
        > | </span>
        <a
          :href="link.url"
          class="inline text-coral-600 hover:text-coral-500 dark:text-red-600 dark:hover:text-red-600"
          target="_blank"
        >
          {{ link.title }}
        </a>
      </span>
    </div>
  </ProjectWidget>
</template>
