<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import { Float } from '@headlessui-float/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useLocale();
</script>

<template>
  <div
    v-if="props.project.details"
    class="mt-3"
  >
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
          class="inline-flex items-center text-sm font-semibold leading-0 transition-colors text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-5 h-5 mr-1 transitions"
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
            <circle
              cx="12"
              cy="12"
              r="9"
            />
            <line
              x1="12"
              y1="8"
              x2="12.01"
              y2="8"
            />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
          <span class="inline-block">
            {{ t('project.details') }}
          </span>
        </PopoverButton>
        <PopoverPanel>
          <div class="w-[320px] text-sm dark:text-dusky-400 dark:text-neutral-200 bg-white dark:bg-neutral-900 rounded-xl shadow overflow-hidden shadow-neutral-300 dark:shadow-black py-3 px-4">
            <ul class="space-y-1 max-w-md list-inside">
              <li
                v-for="(detail, i) in props.project.details"
                :key="i"
                class="flex mb-2 last:mb-0 "
              >
                <svg
                  class="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                /></svg>
                {{ detail }}
              </li>
            </ul>
          </div>
        </PopoverPanel>
      </Float>
    </Popover>
  </div>
</template>
