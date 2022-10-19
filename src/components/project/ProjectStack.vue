<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useDataStore } from '@stores/data';

import ProjectWidget from '@components/project/ProjectWidget.vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useLocale();

const dataStore = useDataStore();

const stack = computed<Record<string, string>>(() => dataStore.stack.reduce((acc, { id, title }) => {
  if (props.project.stack.includes(id)) {
    acc[id] = title;
  }

  return acc;
}, {} as Record<string, string>));
</script>

<template>
  <ProjectWidget :title="t('project.stack')">
    <div class="mt-1.5">
      <span
        v-for="(title, id) in stack"
        :key="id"
        class="text-sm inline-block px-2 py-1 text-center whitespace-nowrap align-baseline font-bold bg-sky-600 text-white rounded mr-2 mb-2 last:mr-0"
      >
        {{ title }}
      </span>
    </div>
  </ProjectWidget>
</template>
