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
    <div class="tabs-wrapper overflow-y-auto no-scrollbar snap-x -ml-4 -mr-4">
      <div class="px-4">
        <ul class="tabs-nav inline-flex">
          <li
            v-for="item in items"
            :key="item.id"
            class="tabs-link mr-3 mb-3"
          >
            <a
              class="inline-flex items-center whitespace-nowrap font-bold text-center text-gray-900 text-xl bg-[#F7BE38] transition-colors duration-[0ms] hover:duration-300 focus:outline-none rounded-lg px-5 py-2.5"
              :class="(activeId === item.id) ? 'bg-[#F7BE38] text-black' : 'bg-neutral-300 dark:text-neutral-100 dark:bg-neutral-900'"
              :href="`#tab-${item.id}`"
              @click.prevent="onClick(item.id)"
            >
              <span
                v-if="item.icon"
                class="w-5 h-5 mr-3"
              >
                <component
                  :is="item.icon"
                />
              </span>
              <span>
                {{ item.title }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tabs-content mt-6 lg:mt-7">
      <slot />
    </div>
  </div>
</template>
