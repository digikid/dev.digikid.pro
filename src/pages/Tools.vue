<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';

import UIPage from '@components/ui/UIPage.vue';
import UISection from '@components/ui/UISection.vue';
import WidgetTools from '@components/widgets/WidgetTools.vue';

const { items: data } = useData<ToolsData, ToolsLocale>('tools');

const categories = computed(() => [...new Set(data.value.reduce((acc, item) => ([...acc, ...item.categories]), [] as string[]))]);

const items = computed(() => categories.value.reduce((acc, id) => {
  acc[id] = data.value.filter(({ categories }) => categories.includes(id));

  return acc;
}, {} as Record<string, Tools[]>));
</script>

<template>
  <UIPage bg>
    <UISection
      v-for="id in categories"
      :id="id"
      :key="id"
    >
      <div class="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-8 sm:mt-12">
        <WidgetTools
          v-for="item in items[id]"
          :key="item.id"
          :title="item.title"
          :text="item.text"
          :url="item.url"
          gradient
        />
      </div>
    </UISection>
  </UIPage>
</template>
