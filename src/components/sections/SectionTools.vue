<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import ListTools from '@components/list/ListTools.vue';

const { items: data } = useData<ToolsData, ToolsLocale>('tools');

const categories = computed(() => [...new Set(data.value.reduce((acc, item) => ([...acc, ...item.categories]), [] as string[]))]);

const items = computed(() => categories.value.reduce((acc, id) => {
  acc[id] = data.value.filter(({ categories }) => categories.includes(id));

  return acc;
}, {} as Record<string, ToolsItem[]>));
</script>

<template>
  <div class="tools">
    <UISection
      v-for="id in categories"
      :id="id"
      :key="id"
    >
      <ListTools :items="items[id]" />
    </UISection>
  </div>
</template>
