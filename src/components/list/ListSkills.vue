<script setup lang="ts">
import { useGlobalStore } from '@stores/global';

const props = withDefaults(defineProps<{
  type: string,
  items?: SkillsItem[],
}>(), {
  type: '',
  items: () => [],
});

const store = useGlobalStore();
</script>

<template>
  <div
    v-if="props.items.length"
    class="skills__list"
    :class="props.type ? `skills__list--${props.type}`: ''"
  >
    <div
      v-for="item in props.items"
      :key="item.id"
      class="skills__item"
    >
      <div
        v-if="(props.type === 'hard')"
        class="skills__header"
      >
        <div class="skills__logo">
          <img
            :src="`/images/skills/${item.id}.svg`"
            :alt="item.title"
          >
        </div>
      </div>
      <div
        v-else
        class="skills__holder"
      />
      <div class="skills__main">
        <div
          class="skills__title"
          :class="(props.type === 'soft') ? store.getGradient() : ''"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.skills__list {
  @apply grid gap-4 md:gap-6;
}

.skills__list--hard {
  @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6;
}

.skills__list--hard .skills__title {
  @apply relative text-[4.5vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[1.15vw];
}

.skills__list--soft {
  @apply sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4;
}

.skills__list--soft .skills__title {
  @apply absolute top-0 left-0 flex flex-col items-center justify-center py-4 px-5 text-[7vw] md:text-[3.25vw] lg:text-[2.25vw] xl:text-[1.65vw] 2xl:text-[1.35vw] text-transparent bg-clip-text bg-gradient-to-r;
}

.skills__item {
  @apply relative overflow-hidden w-full h-full flex flex-col items-center justify-between text-center bg-white dark:bg-neutral-900 rounded-2xl py-4 px-5;
}

.skills__header {
  @apply relative w-1/2 pb-[50%] mt-1 mb-4;
}

.skills__holder {
  @apply w-full pb-[25%] md:pb-[50%];
}

.skills__logo {
  @apply w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center;
}

.skills__logo img {
  @apply max-h-full object-contain object-center;
}

.skills__title {
  @apply w-full h-full font-black leading-tight sm:text-[3.25vw];
}
</style>
