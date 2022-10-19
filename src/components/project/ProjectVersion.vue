<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useLocale } from '@hooks/locale';

import config from '@src/config';

import ProjectWidget from '@components/project/ProjectWidget.vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useLocale();

const version = ref<string>('1.0.0');

onMounted(async () => {
  const { id, repo } = props.project;

  if (config.prod && repo.includes('github')) {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/digikid/${id}/main/package.json`);

      if (response.ok) {
        const data = await response.json();

        if (data.version) {
          version.value = data.version;
        }
      }
    } catch (e) {}
  }
});
</script>

<template>
  <ProjectWidget :title="t('project.version')">
    {{ version }}
  </ProjectWidget>
</template>
