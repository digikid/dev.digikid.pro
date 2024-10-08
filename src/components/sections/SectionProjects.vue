<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import { useDataStore } from '@stores/data';
import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import { mediaMin } from '@utils/dom';
import { isISODate } from '@utils/date';

import UISection from '@components/ui/UISection.vue';
import GridList from '@components/grid/GridList.vue';
import GridItem from '@components/grid/GridItem.vue';
import GridCategories from '@components/grid/GridCategories.vue';
import GridFilters from '@components/grid/GridFilters.vue';
import GridSearch from '@components/grid/GridSearch.vue';
import UICheckbox from '@components/ui/UICheckbox.vue';
import ProjectsItem from '@components/projects/ProjectsItem.vue';

const dataStore = useDataStore();

const { t, messages } = useLocale();

const activeCategories = ref<string[]>(['*']);
const activeFilters = ref<string[]>([]);
const isSortingActive = ref<boolean>(false);
const query = ref<string>('');

const $filters = ref<HTMLElement>();

const { items } = useData<ProjectsData, ProjectsLocale>('projects', true);

const data = computed<GridData>(() => items.value.filter(({ start }) => {
  return isISODate(start);
}).reduce((acc, {
  id, start, title, categories, stack,
}) => {
  acc[id] = {
    categories,
    filters: stack,
    sort: new Date(start).getTime(),
    title,
  };

  return acc;
}, {} as GridData));

const categories = computed<GridFilter[]>(() => {
  const result: GridFilter[] = [];
  const categories = messages.value.categories as LocaleRecord;

  const ids = [...new Set(items.value.reduce((acc, item) => [...acc, ...item.categories], [] as string[]))];

  if (ids.length) {
    ids.unshift('*');
  }

  Object.entries(categories).forEach(([id, title]) => {
    if (ids.includes(id)) {
      const total = (id === '*') ? items.value.length : items.value.filter((item) => item.categories.includes(id)).length;
      const active = activeCategories.value.includes(id);

      result.push({
        id,
        active,
        title,
        total,
      });
    }
  });

  return result;
});

const selectedItems = computed(() => items.value.filter((item) => {
  if (activeCategories.value.includes('*')) {
    return true;
  }

  return activeCategories.value.every((id) => item.categories.includes(id));
}).filter((item) => {
  if (!activeFilters.value.length) {
    return true;
  }

  return activeFilters.value.every((id) => item.stack.includes(id));
}));

const filters = computed<GridFilter[]>(() => {
  const result: GridFilter[] = [];

  const ids = [...new Set(selectedItems.value.reduce((acc, item) => [...acc, ...item.stack], [] as string[]))];

  dataStore.stack.forEach(({ id, title }) => {
    if (ids.includes(id)) {
      const total = selectedItems.value.filter((item) => item.stack.includes(id)).length;
      const every = selectedItems.value.reduce((acc, item) => acc && item.stack.includes(id), !!total);
      const active = activeFilters.value.includes(id);

      if (!(every && !active)) {
        result.push({
          id,
          active,
          title,
          total,
        });
      }
    }
  });

  return result;
});

watch(() => activeCategories.value, () => {
  if (activeFilters.value.length) {
    activeFilters.value = [];
  }
});

const onCategoriesUpdate = (id: string) => {
  activeCategories.value = [id];
};

const onFiltersUpdate = (id: string) => {
  if (activeFilters.value.includes(id)) {
    activeFilters.value = activeFilters.value.filter((filterId) => filterId !== id);
  } else {
    activeFilters.value.push(id);
  }
};

const onFiltersToggle = (value: boolean) => {
  if (mediaMin(768) || !$filters.value) return;

  const el = $filters.value;
  const duration = 300;

  el.style.setProperty('transition', `opacity ${duration}ms ease-in-out`);

  if (value) {
    el.style.setProperty('opacity', '0');
    el.style.setProperty('display', 'block');

    setTimeout(() => {
      el.style.setProperty('opacity', '1');
    }, 1);
  } else {
    el.style.setProperty('opacity', '0');

    setTimeout(() => {
      el?.removeAttribute('style');
    }, duration);
  }
};

const onSearchChange = (value: string) => {
  query.value = value;
};
</script>

<template>
  <UISection
    id="projects"
  >
    <div
      v-if="items.length"
      class="projects grid"
    >
      <div class="projects__controls">
        <GridCategories
          :items="categories"
          @update="onCategoriesUpdate"
        />
        <GridSearch
          :placeholder="t('project.search')"
          @update="onSearchChange"
        />
      </div>
      <div class="projects__filters">
        <div class="projects__filters-toggle">
          <UICheckbox
            :label="t('controls.filters')"
            @update="onFiltersToggle"
          />
        </div>
        <div
          ref="$filters"
          class="projects__filters-main"
        >
          <GridFilters
            :items="filters"
            @update="onFiltersUpdate"
          />
        </div>
      </div>
      <div class="projects__main">
        <GridList
          :categories="activeCategories"
          :filters="activeFilters"
          :sorting="isSortingActive"
          :query="query"
          :data="data"
        >
          <GridItem
            v-for="item in items"
            :key="item.id"
            :size="item.large ? '1/2' : '1/4'"
            :data-id="item.id"
            rounded
          >
            <ProjectsItem :project="item" />
          </GridItem>
        </GridList>
      </div>
    </div>
  </UISection>
</template>

<style>
.projects {}

.projects__controls {
  @apply grid gap-3 md:gap-6 md:grid-cols-2 2xl:grid-cols-3;
}

.projects__filters {
  @apply mt-4 md:mt-7;
}

.projects__filters-toggle {
  @apply mb-4 md:hidden;
}

.projects__filters-main {
  @apply hidden md:block;
}

.projects__main {
  @apply mt-8;
}
</style>
