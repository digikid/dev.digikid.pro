<script setup lang="ts">
import { useGlobalStore } from '@stores/global';

const props = withDefaults(defineProps<{
  id: string;
  title: string;
  logo?: boolean;
  gradient?: boolean;
}>(), {
  logo: false,
  gradient: false,
});

const store = useGlobalStore();
</script>

<template>
  <div
    class="relative overflow-hidden w-full h-full flex flex-col items-center justify-between text-center bg-white dark:bg-neutral-900 rounded-2xl py-4 px-5"
  >
    <div
      v-if="props.logo"
      class="relative w-1/2 pb-[50%] mt-1 mb-4"
    >
      <div class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
        <img
          :src="`/images/skills/${props.id}.svg`"
          :alt="props.title"
          class="max-h-full object-contain object-center"
        >
      </div>
    </div>
    <div
      v-else
      class="w-full pb-[25%] md:pb-[50%]"
    />
    <div
      class="w-full h-full font-black leading-tight sm:text-[3.25vw]"
      :class="[
        (props.logo ? 'relative' : 'absolute top-0 left-0 flex flex-col items-center justify-center py-4 px-5'),
        (props.gradient ? `text-[7vw] md:text-[3.25vw] lg:text-[2.25vw] xl:text-[1.65vw] 2xl:text-[1.35vw] text-transparent bg-clip-text bg-gradient-to-r ${store.getGradient()}`: 'text-[4.5vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[1.15vw]')
      ]"
    >
      {{ props.title }}
    </div>
  </div>
</template>
