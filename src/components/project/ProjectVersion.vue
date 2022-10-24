<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import ProjectWidget from '@components/project/ProjectWidget.vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useLocale();
</script>

<template>
  <ProjectWidget :title="t('project.version')">
    {{ props.project.version }}
  </ProjectWidget>
</template>
