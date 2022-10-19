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
  <ProjectWidget
    v-if="props.project.finish"
    :title="t('project.finish')"
  >
    {{ formatDate(props.project.finish, code) }}
  </ProjectWidget>
</template>
