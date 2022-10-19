<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  text?: string;
  large?: boolean;
}>(), {
  text: '',
  large: false,
});
</script>

<template>
  <div
    class="relative text-center flex flex-col justify-between w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl"
    :class="props.large ? 'md:col-span-2 lg:col-auto xl:col-span-2 2xl:row-span-2 2xl:col-span-1' : '2xl:col-span-1 2xl:row-span-1'"
  >
    <div class="px-4 py-6 sm:px-6 sm:py-8">
      <div class="font-black text-[6.5vw] sm:text-[4.75vw] md:text-[3.5vw] lg:text-3xl 2xl:text-4xl mb-3">
        {{ props.title }}
      </div>
      <div class="2xl:max-w-[75%] mx-auto text-lg text-neutral-400">
        {{ props.text }}
      </div>
    </div>
    <div
      class="grow flex flex-col items-center justify-center bg-neutral-100 dark:bg-dusky-900 rounded-t-3xl px-5 py-8 mt-2"
      :class="props.large ? 'lg:pb-8' : ''"
    >
      <slot />
    </div>
  </div>
</template>
