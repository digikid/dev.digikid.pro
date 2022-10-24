<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '@hooks/locale';

import { Float } from '@headlessui-float/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const props = withDefaults(defineProps<{
  items?: GridFilter[],
}>(), {
  items: () => [],
});

const emit = defineEmits<{ (e: 'update', id: string): void }>();

const { t } = useLocale();

const current = computed<string>(() => {
  const id = props.items.find(({ active }) => active)?.id;

  return t(`categories.${id}`);
});

const onClick = (id: string, cb?: CallbackFunction) => {
  emit('update', id);

  if (typeof cb === 'function') {
    cb();
  }
};
</script>

<template>
  <div v-if="props.items.length">
    <Popover v-slot="{ open }">
      <Float
        placement="bottom-start"
        :offset="{
          mainAxis: 15
        }"
        :shift="6"
        :flip="10"
        portal
        enter="transition duration-200 ease-out"
        enter-from="opacity-0 -translate-y-1"
        enter-to="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 -translate-y-1"
      >
        <PopoverButton
          class="w-full text-left text-lg dark:text-dusky-50 xl:text-2xl font-bold outline-none cursor-pointer pl-4 md:pl-5 pr-2 md:pr-3 py-3 bg-white dark:bg-neutral-900 rounded-xl border-2"
          :class="open ? 'border-sky-600' : 'border-transparent'"
        >
          <div class="flex items-center justify-between">
            <span class="leading-0 whitespace-none">
              {{ current }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="translate-y-0.5 w-7 stroke-neutral-200 dark:stroke-dusky-700 ml-3"
              :class="open ? 'stroke-sky-600 dark:stroke-sky-600': ''"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none"
              />
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </PopoverButton>
        <PopoverPanel
          v-slot="{ close }"
          class="bg-white dark:bg-neutral-900 rounded-xl shadow overflow-hidden shadow-neutral-300 dark:shadow-black"
        >
          <ul class="block list-none">
            <li
              v-for="item in props.items"
              :key="item.id"
              class="group"
            >
              <a
                href="#"
                class="group block py-1.5 px-4 md:text-lg hover:bg-neutral-100 dark:text-dusky-400 dark:hover:bg-neutral-800 dark:hover:text-white transition"
                role="menuitem"
                @click.prevent="onClick(item.id, close)"
              >
                <div class="flex items-center whitespace-nowrap">
                  {{ item.title }}
                  <span class="inline-flex justify-center items-center ml-2 w-5 h-5 text-[12px] font-semibold text-sky-600 dark:text-sky-400 bg-neutral-200 dark:bg-neutral-800 rounded-full">{{ item.total }}</span>
                </div>
              </a>
            </li>
          </ul>
        </PopoverPanel>
      </Float>
    </Popover>
  </div>
</template>
