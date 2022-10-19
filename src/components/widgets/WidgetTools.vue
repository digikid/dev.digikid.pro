<script setup lang="ts">
import { useGlobalStore } from '@stores/global';

const props = withDefaults(defineProps<{
  title: string;
  text?: string;
  url?: string;
  large?: boolean;
  gradient?: boolean;
}>(), {
  text: '',
  url: '',
  large: false,
  gradient: false,
});

const store = useGlobalStore();
</script>

<template>
  <div
    class="relative"
    :class="(props.large ? '2xl:col-span-2' : '')"
  >
    <component
      :is="props.url ? 'a' : 'div'"
      :href="props.url || null"
      :target="props.url ? '_blank' : null"
      class="relative flex flex-col w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl py-4 px-5 transition-transform duration-400 hover:scale-[97%]"
    >
      <div>
        <div
          v-if="$slots.logo"
          class="w-1/2 mb-6"
        >
          <slot name="logo" />
        </div>
        <div
          class="font-black leading-tight sm:text-[3.25vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.5vw] pr-12"
          :class="[
            (props.large ? 'text-[7.5vw] 2xl:text-[1.75vw]' : 'text-[6vw] xs:text-[5.25vw] 2xl:text-[1.25vw]'),
            (props.gradient ? `text-transparent bg-clip-text bg-gradient-to-r ${store.getGradient()}` : '')
          ]"
        >
          {{ props.title }}
        </div>
      </div>
      <div
        v-if="props.text"
        class="text-neutral-400 dark:text-neutral-600 mt-2"
      >
        {{ props.text }}
      </div>
    </component>
  </div>
</template>
