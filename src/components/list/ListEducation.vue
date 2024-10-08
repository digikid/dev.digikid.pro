<script setup lang="ts">
import IconEducation from '@components/icons/IconEducation.vue';

const props = withDefaults(defineProps<{
  items?: EducationItem[],
}>(), {
  items: () => [],
});

const isMain = (item: EducationItem) => (item.id === 'main');
</script>

<template>
  <div
    v-if="props.items.length"
    class="education__list"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="education__item"
      :class="{
        'education__item--main': isMain(item)
      }"
    >
      <component
        :is="item.url ? 'a' : 'div'"
        :href="item.url || null"
        :target="item.url ? '_blank' : null"
        class="education__wrapper"
      >
        <div
          v-if="item.start"
          class="education__date"
        >
          {{ new Date(item.start).getFullYear() }}
        </div>
        <div class="education__header">
          <div
            v-if="isMain(item)"
            class="education__logo"
          >
            <img :src="`/images/education/logo.svg`">
          </div>
          <div class="education__title">
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="item.text"
          class="education__main"
        >
          <div class="education__text">
            <IconEducation />
            {{ item.text }}
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<style>
.education__list {
  @apply grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-8 sm:mt-12;
}

.education__item {
  @apply relative;
}

.education__item--main {
  @apply 2xl:col-span-2;
}

.education__wrapper {
  @apply relative flex flex-col justify-end w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl transition-transform duration-300 hover:scale-[97%] py-4 px-5 z-[1];
}

.education__date {
  @apply block absolute top-0 right-0 text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-bl-2xl px-3 py-1.5;
}

.education__item--main .education__date {
  @apply from-rose-500 to-amber-600;
}

.education__title {
  @apply font-black leading-snug lg:leading-tight pr-12 text-[5.25vw] sm:text-[3.25vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.5vw] 2xl:text-[1.25vw];
}

.education__item--main .education__title {
  @apply leading-tight text-[7vw] sm:text-[3.25vw] md:text-[2.5vw] xl:text-[2vw] 2xl:text-[1.75vw];
}

.education__text {
  @apply flex items-center text-neutral-400 dark:text-neutral-600;
}

.education__text svg {
  @apply relative top-0.5 shrink-0 self-start w-5 h-5 mr-1.5;
}

.education__header {}

.education__main {
  @apply mt-2;
}

.education__logo {
  @apply w-1/2 mb-6;
}
</style>
