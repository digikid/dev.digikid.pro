<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import UITabs from '@components/ui/tabs/UITabs.vue';
import UITab from '@components/ui/tabs/UITab.vue';
import WidgetSkills from '@components/widgets/WidgetSkills.vue';

const { t } = useLocale();
const { items: data } = useData<SkillsData, SkillsLocale>('skills');

const items = computed(() => (['hard', 'soft'] as const).reduce((acc, key) => {
  acc[key] = data.value.filter((item) => item.categories.includes(key));

  return acc;
}, {
  hard: [],
  soft: [],
} as Record<'hard' | 'soft', Skills[]>));
</script>

<template>
  <UISection
    id="skills"
  >
    <UITabs>
      <UITab
        id="hard-skills"
        :title="t('hard-skills')"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          <WidgetSkills
            v-for="item in items.hard"
            :id="item.id"
            :key="item.id"
            :title="item.title"
            logo
          />
        </div>
      </UITab>
      <UITab
        id="soft-skills"
        :title="t('soft-skills')"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clip-rule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
        </template>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          <WidgetSkills
            v-for="item in items.soft"
            :id="item.id"
            :key="item.id"
            :title="item.title"
            gradient
          />
        </div>
      </UITab>
    </UITabs>
  </UISection>
</template>
