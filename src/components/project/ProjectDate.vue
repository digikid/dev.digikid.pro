<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import { format as formatDate } from '@utils/date';

import ProjectWidget from '@components/project/ProjectWidget.vue';

const props = defineProps<{
  project: Project;
}>();

const { t, code } = useLocale();
</script>

<template>
  <ProjectWidget :title="t(`project.${props.project.finish ? 'start' : 'date'}`)">
    {{ formatDate(props.project.date, code) }}
  </ProjectWidget>
</template>
