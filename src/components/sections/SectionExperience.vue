<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import { format as formatDate } from '@utils/date';

import UISection from '@components/ui/UISection.vue';
import UITimeline from '@components/ui/UITimeline.vue';
import IconCalendar from '@components/icons/IconCalendar.vue';

const { messages, code } = useLocale();
const { items: data } = useData<ExperienceData, ExperienceLocale>('experience');

const items = computed<TimelineItem[]>(() => [...data.value].sort((a, b) => b.date - a.date).reduce((acc, item) => {
  const now = (typeof messages.value.now === 'string') ? messages.value.now : '';

  const date = formatDate(item.date, code.value);
  const finish = (item.finish === -1) ? now : formatDate(item.finish, code.value);

  acc.push({
    ...item,
    date,
    finish,
  });

  return acc;
}, [] as TimelineItem[]));
</script>

<template>
  <UISection
    id="experience"
  >
    <div class="experience">
      <UITimeline :items="items">
        <template #marker>
          <IconCalendar />
        </template>
      </UITimeline>
    </div>
  </UISection>
</template>
