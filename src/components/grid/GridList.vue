<script setup lang="ts">
import {
  ref, onMounted, onUnmounted, watch, nextTick,
} from 'vue';

import { useLocale } from '@hooks/locale';
import { throttle } from '@utils/decorators';

import Muuri from 'muuri';
import imagesLoaded from 'imagesloaded';

const props = withDefaults(defineProps<{
  options?: Muuri.GridOptions;
  categories?: string[];
  filters?: string[];
  query?: string;
  sorting?: boolean;
  data?: GridData;
}>(), {
  options: () => ({
    containerClass: 'grid__list-inner',
    itemClass: 'grid__item',
    itemVisibleClass: 'grid__item--visible',
    itemHiddenClass: 'grid__item--hidden',
    itemReleasingClass: 'grid__item--releasing',
    itemDraggingClass: 'grid__item--dragging',
    layoutOnResize: true,
    layoutDuration: 150,
  }),
  categories: () => ['*'],
  filters: () => [],
  query: '',
  sorting: false,
  data: () => ({} as GridData),
});

const { locale } = useLocale();

const grid = ref<Muuri>();
const isLoading = ref<boolean>(true);

const $grid = ref<HTMLElement>();

const init = (el: HTMLElement) => {
  try {
    grid.value = new Muuri(el, props.options);

    grid.value.on('layoutEnd', (items) => {
      isLoading.value = false;

      items.forEach((item) => {
        const element = item.getElement() as HTMLElement;

        element.style.setProperty('opacity', '1');
      });
    });
  } catch (e) {}
};

const destroy = () => grid.value?.destroy();

const refresh = () => grid.value?.refreshItems()?.layout();

onMounted(() => {
  if (grid.value) {
    destroy();
  }

  const container = $grid.value;

  if (container instanceof HTMLElement) {
    init(container);

    imagesLoaded(container, refresh);
  }
});

onUnmounted(destroy);

watch([() => props.categories, () => props.filters], () => {
  grid.value?.filter((item) => {
    const id = item.getElement()?.dataset?.id;

    if (id) {
      const { categories, filters } = props.data[id];

      const result = props.filters.reduce((acc, id) => acc && filters.includes(id), true);

      if (props.categories.includes('*')) {
        return result;
      }

      return props.categories.reduce((acc, id) => acc && categories.includes(id), result);
    }

    return true;
  });
}, {
  deep: true,
});

watch(() => props.sorting, (value) => {
  const ids = Object.keys(props.data);

  grid.value?.sort((a, b) => {
    const idA = a.getElement()?.dataset?.id;
    const idB = b.getElement()?.dataset?.id;

    if (idA && idB) {
      const sortA = props.data[idA].sort;
      const sortB = props.data[idB].sort;

      const indexA = ids.findIndex((id) => id === idA);
      const indexB = ids.findIndex((id) => id === idB);

      return value ? sortB - sortA : indexA - indexB;
    }

    return 0;
  });
});

watch(() => props.query, throttle((value) => {
  grid.value?.filter((item) => {
    const id = item.getElement()?.dataset?.id;

    if (id && value) {
      const { title } = props.data[id];
      const query = value.toLowerCase();

      return title.toLowerCase().startsWith(query);
    }

    return true;
  });
}, 300));

watch(() => locale.value, () => {
  nextTick(() => {
    grid.value?.refreshItems().layout();
  });
});
</script>

<template>
  <div
    class="grid__list"
  >
    <div class="grid__list-outer">
      <div
        ref="$grid"
        class="grid__list-inner"
        data-grid
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.grid__list {
  @apply w-full overflow-hidden;
}

.grid__list-outer {
  @apply -mx-3;
}

.grid__list-inner {
  @apply relative flex flex-wrap;
}
</style>
