<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import { isISODate, format as formatDate, formatInterval } from '@utils/date';

import UISection from '@components/ui/UISection.vue';
import UITimeline from '@components/ui/UITimeline.vue';
import IconCalendar from '@components/icons/IconCalendar.vue';

const { messages, code } = useLocale();
const { items: data } = useData<ExperienceData, ExperienceLocale>('experience');

const items = computed<TimelineItem[]>(() => [...data.value].filter(item => {
  return isISODate(item.start);
}).sort((a, b) => {
  const startA: number = new Date(a.start).getTime();
  const startB: number = new Date(b.start).getTime();

  return startB - startA;
}).reduce((acc, item) => {
  const now = (typeof messages.value.now === 'string') ? messages.value.now : '';

  const date = formatDate(item.start, code.value);
  const finish = item.finish ? formatDate(item.finish, code.value) : now;

  const period = formatInterval(item.start, item.finish || new Date().toISOString(), {
    locale: code.value,
    format: ['years', 'months'],
  });

  acc.push({
    ...item,
    date,
    finish,
    period,
  });

  return acc;
}, [] as TimelineItem[]));
</script>

<template>
  <UISection id="experience">
    <div class="experience">
      <UITimeline :items="items">
        <template #marker>
          <IconCalendar />
        </template>
      </UITimeline>
    </div>
  </UISection>
</template>
