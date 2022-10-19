<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import WidgetEducation from '@components/widgets/WidgetEducation.vue';

const { items: data } = useData<ExperienceData, ExperienceLocale>('education');

const items = computed(() => {
  const main = data.value.filter((item) => item.id === 'main');
  const courses = data.value.filter((item) => item.id !== 'main').sort((a, b) => b.date - a.date);

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
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-8 sm:mt-12">
      <WidgetEducation
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :text="item.text"
        :date="(new Date(item.date)).getFullYear().toString()"
        :url="item.url"
        :large="(item.id === 'main')"
      >
        <template
          v-if="(item.id === 'main')"
          #logo
        >
          <img :src="`/images/education/logo.svg`">
        </template>
      </WidgetEducation>
    </div>
  </UISection>
</template>
