<script setup lang="ts">
import {
  useSlots, ref, computed, provide,
} from 'vue';

import { id as randomId } from '@utils/random';

const emit = defineEmits<{ (e: 'update', id: string): void }>();

const slots = useSlots();

const items = computed(() => {
  if (slots.default) {
    return slots?.default().map((item) => {
      const id = item.props?.id || randomId();
      const title = item.props?.title || '';
      const icon = (item.children as any)?.icon;

      const active = [undefined, false].every((value) => (item.props?.active !== value));

      return {
        id,
        title,
        icon,
        active,
      };
    });
  }
  return [];
});

const activeId = ref(items.value.find((item) => item.active)?.id || items.value[0].id);

const onClick = (id: string) => {
  activeId.value = id;

  emit('update', id);
};

provide('activeId', activeId);
</script>

<template>
  <div
    v-if="items.length"
    class="tabs"
  >
    <div class="tabs__outer">
      <div class="tabs__inner">
        <ul class="tabs__nav">
          <li
            v-for="item in items"
            :key="item.id"
            class="tabs__button"
          >
            <a
              class="tabs__link"
              :class="{
                'tabs__link--active': (activeId === item.id)
              }"
              :href="`#tab-${item.id}`"
              @click.prevent="onClick(item.id)"
            >
              <span
                v-if="item.icon"
                class="tabs__icon"
              >
                <component
                  :is="item.icon"
                />
              </span>
              <span class="tabs__title">
                {{ item.title }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<style>
.tabs {}

.tabs__outer {
  @apply overflow-y-auto no-scrollbar snap-x -ml-4 -mr-4;
}

.tabs__inner {
  @apply px-4;
}

.tabs__nav {
  @apply inline-flex;
}

.tabs__button {
  @apply mr-3 mb-3;
}

.tabs__link {
  @apply inline-flex items-center whitespace-nowrap font-bold text-center text-gray-900 text-xl bg-[#F7BE38] transition-colors duration-[0ms] hover:duration-300 focus:outline-none rounded-lg px-5 py-2.5 bg-neutral-300 dark:text-neutral-100 dark:bg-neutral-900;
}

.tabs__link--active {
  @apply bg-[#F7BE38] text-black;
}

.tabs__icon {
  @apply w-5 h-5 mr-3;
}

.tabs__title {}

.tabs__content {
  @apply mt-6 lg:mt-7;
}
</style>
