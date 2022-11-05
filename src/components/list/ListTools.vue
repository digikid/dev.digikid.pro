<script setup lang="ts">
import { useGlobalStore } from '@stores/global';

const props = withDefaults(defineProps<{
  items?: ToolsItem[],
}>(), {
  items: () => [],
});

const store = useGlobalStore();
</script>

<template>
  <div
    v-if="props.items.length"
    class="tools__list"
  >
    <div
      v-for="item in props.items"
      :key="item.id"
      class="tools__item"
    >
      <component
        :is="item.url ? 'a' : 'div'"
        :href="item.url || null"
        :target="item.url ? '_blank' : null"
        class="tools__wrapper"
      >
        <div class="tools__header">
          <div
            v-if="$slots.logo"
            class="tools__logo"
          >
            <slot name="logo" />
          </div>
          <div
            class="tools__title"
            :class="store.getGradient()"
          >
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="item.text"
          class="tools__text"
        >
          {{ item.text }}
        </div>
      </component>
    </div>
  </div>
</template>

<style>
.tools__list {
  @apply grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-8 sm:mt-12;
}

.tools__item {
  @apply relative;
}

.tools__wrapper {
  @apply relative flex flex-col w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl py-4 px-5 transition-transform hover:scale-[97%];
}

.tools__logo {
  @apply w-1/2 mb-6;
}

.tools__title {
  @apply font-black leading-tight sm:text-[3.25vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.5vw] pr-12 text-[6vw] xs:text-[5.25vw] 2xl:text-[1.25vw] text-transparent bg-clip-text bg-gradient-to-r;
}

.tools__text {
  @apply text-neutral-400 dark:text-neutral-600 mt-2;
}
</style>
