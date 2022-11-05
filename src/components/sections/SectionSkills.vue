<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import UITabs from '@components/ui/tabs/UITabs.vue';
import UITab from '@components/ui/tabs/UITab.vue';
import ListSkills from '@components/list/ListSkills.vue';
import IconHard from '@components/icons/IconHard.vue';
import IconSoft from '@components/icons/IconSoft.vue';

const { t } = useLocale();
const { items: data } = useData<SkillsData, SkillsLocale>('skills');

const items = computed(() => (['hard', 'soft'] as const).reduce((acc, key) => {
  acc[key] = data.value.filter((item) => item.categories.includes(key));

  return acc;
}, {
  hard: [],
  soft: [],
} as Record<'hard' | 'soft', SkillsItem[]>));
</script>

<template>
  <UISection
    id="skills"
  >
    <div class="skills">
      <UITabs>
        <UITab
          id="hard-skills"
          :title="t('hard-skills')"
        >
          <template #icon>
            <IconHard />
          </template>
          <ListSkills
            type="hard"
            :items="items.hard"
          />
        </UITab>
        <UITab
          id="soft-skills"
          :title="t('soft-skills')"
        >
          <template #icon>
            <IconSoft />
          </template>
          <ListSkills
            type="soft"
            :items="items.soft"
          />
        </UITab>
      </UITabs>
    </div>
  </UISection>
</template>
