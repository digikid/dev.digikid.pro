<script setup lang="ts">
import { getHostname } from '@utils/url';

const props = withDefaults(defineProps<{
  items?: TimelineItem[];
}>(), {
  items: () => [],
});
</script>

<template>
  <ol
    v-if="props.items.length"
    class="relative border-l border-white dark:border-neutral-700 ml-6 mt-10 lg:mb-0"
  >
    <li
      v-for="item in props.items"
      :key="item.id"
      class="relative mb-10 last:mb-0 pl-10"
    >
      <span class="flex absolute -left-3.5 top-1 md:top-1.5 justify-center items-center w-6 h-6 bg-neutral-200 rounded-full ring-8 ring-white dark:ring-neutral-900 dark:bg-dusky-900">
        <slot
          v-if="$slots.icon"
          name="icon"
        />
      </span>
      <h3 class="flex items-center text-2xl sm:text-3xl font-black">
        {{ item.title }}<span
          v-if="item.label"
          class="bg-coral-100 text-coral-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-coral-200 dark:text-coral-800 ml-3"
        >
          {{ item.label }}
        </span>
      </h3>
      <div class="flex flex-wrap items-center text-neutral-400 dark:text-neutral-700 mt-2 mb-3">
        <div class="w-full sm:w-auto flex items-center sm:mr-6 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="relative top-1 self-start inline-block w-4 h-4 mr-1.5"
            width="24"
            height="24"
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
            <path d="M6.5 7h11" />
            <path d="M6.5 17h11" />
            <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
            <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
          </svg>
          <div>
            <time v-if="item.date">{{ item.date }}</time><span v-if="item.finish"> — <time class="">{{ item.finish }}</time></span>
          </div>
        </div>
        <div
          v-if="item.subtitle"
          class="w-full sm:w-auto flex items-center mb-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="relative top-1 self-start inline-block w-4 h-4 mr-1.5"
            width="24"
            height="24"
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
              cy="7"
              r="4"
            />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <div>
            {{ item.subtitle }}
          </div>
        </div>
      </div>
      <p
        v-if="item.text"
        class="mb-4 sm:text-lg font-normal xl:max-w-[75%]"
      >
        {{ item.text }}
      </p>
      <div
        v-if="item.url"
        class="mt-6"
      >
        <a
          :href="item.url"
          target="_blank"
          class="inline-flex items-center py-2.5 px-5 text- font-bold text-neutral-900 bg-amber-400 rounded-lg outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z"
              clip-rule="evenodd"
            />
          </svg>

          {{ getHostname(item.url) }}</a>
      </div>
    </li>
  </ol>
</template>
