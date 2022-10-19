<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import { format as formatDate } from '@utils/date';

import UISection from '@components/ui/UISection.vue';
import UITimeline from '@components/ui/UITimeline.vue';

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
    <UITimeline :items="items">
      <template #icon>
        <svg
          aria-hidden="true"
          class="w-3 h-3 text-coral-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clip-rule="evenodd"
        /></svg>
      </template>
    </UITimeline>
  </UISection>
</template>
