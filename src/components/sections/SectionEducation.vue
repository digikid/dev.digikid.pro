<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';
import { isISODate } from '@utils/date';

import UISection from '@components/ui/UISection.vue';
import ListEducation from '@components/list/ListEducation.vue';

const { items: data } = useData<ExperienceData, ExperienceLocale>('education');

const items = computed<EducationItem[]>(() => {
  const main = data.value.filter((item) => item.id === 'main');

  const courses = data.value.filter((item) => {
    return isISODate(item.start) && item.id !== 'main';
  }).sort((a, b) => {
    return new Date(b.start).getTime() - new Date(a.start).getTime();
  });

  return [
    ...main,
    ...courses,
  ];
});
</script>

<template>
  <UISection
    id="education"
  >
    <div class="education">
      <ListEducation :items="items" />
    </div>
  </UISection>
</template>
