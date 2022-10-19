<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGlobalStore } from '@stores/global';

const store = useGlobalStore();

const isDarkMode = ref<boolean>(store.colorMode === 'dark');

watch(isDarkMode, (value) => {
  store.colorMode = value ? 'dark' : 'light';
});
</script>

<template>
  <div class="relative flex items-center">
    <label
      for="color-mode"
      class="text-sm text-neutral-900 dark:text-neutral-100 font-medium cursor-pointer mr-2"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-8 lg:h-6"
      ><g><path
        d="m12 17.75a5.75 5.75 0 1 1 5.75-5.75 5.757 5.757 0 0 1 -5.75 5.75zm0-10a4.25 4.25 0 1 0 4.25 4.25 4.255 4.255 0 0 0 -4.25-4.25z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m12 4.75a.75.75 0 0 1 -.75-.75v-2a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1 -.75.75z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m17.657 7.093a.75.75 0 0 1 -.53-1.28l1.414-1.413a.75.75 0 0 1 1.059 1.059l-1.412 1.415a.749.749 0 0 1 -.531.219z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m22 12.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 0 1.5z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m19.071 19.821a.749.749 0 0 1 -.53-.219l-1.414-1.415a.75.75 0 0 1 1.061-1.061l1.412 1.415a.75.75 0 0 1 -.531 1.28z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m12 22.75a.75.75 0 0 1 -.75-.75v-2a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1 -.75.75z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m4.929 19.821a.75.75 0 0 1 -.531-1.28l1.415-1.415a.75.75 0 0 1 1.06 1.061l-1.414 1.413a.747.747 0 0 1 -.53.221z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m4 12.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 0 1.5z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m6.343 7.093a.746.746 0 0 1 -.53-.219l-1.413-1.415a.75.75 0 0 1 1.059-1.059l1.414 1.413a.75.75 0 0 1 -.53 1.28z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m12 17.75a.75.75 0 0 1 -.75-.75v-10a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1 -.75.75z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m12 14.25h-4.78a.75.75 0 1 1 0-1.5h4.78a.75.75 0 0 1 0 1.5z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /><path
        d="m12 11.25h-4.78a.75.75 0 1 1 0-1.5h4.78a.75.75 0 0 1 0 1.5z"
        class="fill-neutral-300 dark:fill-dusky-800"
      /></g></svg>
    </label>
    <label
      class="relative block w-[54px] lg:w-[45px] h-[30px] lg:h-[25px] rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer transition duration-300"
    >
      <input
        id="color-mode"
        v-model="isDarkMode"
        type="checkbox"
        class="peer hidden"
      >
      <span class="block absolute top-[5px] lg:top-[3.5px] left-[5px] lg:left-[3.5px] transition transition duration-300 w-[20px] lg:w-[18px] h-[20px] lg:h-[18px] rounded-full bg-amber-400 peer-checked:bg-sky-400 peer-checked:translate-x-[24px] lg:peer-checked:translate-x-[20px]" />
      <span class="block absolute top-[5px] lg:top-[3.5px] left-[-14.5px] lg:left-[-14.5px] transition duration-300 w-[20px] lg:w-[18px] h-[20px] lg:h-[18px] rounded-full bg-neutral-200 scale-[0.00001] peer-checked:bg-neutral-800 peer-checked:translate-x-[32px] lg:peer-checked:translate-x-[30px] peer-checked:scale-100" />
    </label>
  </div>
</template>
