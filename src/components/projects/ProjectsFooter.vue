<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useDataStore } from '@stores/data';
import { format as formatDate } from '@utils/date';

import ProjectsWidget from '@components/projects/ProjectsWidget.vue';
import UIStack from '@components/ui/UIStack.vue';
import UILinks from '@components/ui/UILinks.vue';

const props = defineProps<{
  project: ProjectsItem;
}>();

const { t, code } = useLocale();

const dataStore = useDataStore();

const stack = computed<StackItem[]>(() => dataStore.stack.reduce((acc, { id, title }) => {
  if (props.project.stack.includes(id)) {
    acc.push({
      id,
      title,
    });
  }

  return acc;
}, [] as StackItem[]));

const links = computed<LinkItem[]>(() => (['repo', 'demo', 'url'] as const).reduce((acc, id) => {
  const url = props.project[id];

  if (url) {
    acc.push({
      id,
      url,
      title: t(`project.${id}`),
    });
  }

  return acc;
}, [] as LinkItem[]));
</script>

<template>
  <div class="projects__footer">
    <div class="projects__info">
      <div class="projects__date">
        <ProjectsWidget :title="t(`project.${props.project.finish ? 'start' : 'date'}`)">
          {{ formatDate(props.project.date, code) }}
        </ProjectsWidget>
      </div>
      <div
        v-if="project.finish"
        class="projects__finish"
      >
        <ProjectsWidget :title="t('project.finish')">
          {{ formatDate(props.project.finish, code) }}
        </ProjectsWidget>
      </div>
      <div class="projects__version">
        <ProjectsWidget :title="t('project.version')">
          {{ props.project.version }}
        </ProjectsWidget>
      </div>
    </div>
    <div
      v-if="stack.length"
      class="projects__stack"
    >
      <ProjectsWidget :title="t('project.stack')">
        <UIStack :items="stack" />
      </ProjectsWidget>
    </div>
    <div
      v-if="Object.keys(links).length"
      class="projects__links"
    >
      <ProjectsWidget>
        <UILinks :items="links" />
      </ProjectsWidget>
    </div>
  </div>
</template>

<style>
.projects__footer {
  @apply relative clear-both mt-3 px-4 py-5 md:px-6 md:py-5 bg-neutral-100 dark:bg-dusky-900 rounded-t-xl;
}

.projects__info {
  @apply flex gap-2;
}

.projects__date,
.projects__version,
.projects__finish {
  @apply w-1/2;
}

.projects__date {
  @apply grow;
}

.projects__stack,
.projects__links {
  @apply mt-3;
}
</style>
