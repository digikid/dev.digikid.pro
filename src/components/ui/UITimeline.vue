<script setup lang="ts">
import { getHostname } from '@utils/url';

import IconPointer from '@components/icons/IconPointer.vue';
import IconUser from '@components/icons/IconUser.vue';
import IconTime from '@components/icons/IconTime.vue';

const props = withDefaults(defineProps<{
  items?: TimelineItem[];
}>(), {
  items: () => [],
});
</script>

<template>
  <div
    v-if="props.items.length"
    class="timeline"
  >
    <ol
      class="timeline__list"
    >
      <li
        v-for="item in props.items"
        :key="item.id"
        class="timeline__item"
      >
        <span
          v-if="$slots.marker"
          class="timeline__marker"
        >
          <slot name="marker" />
        </span>
        <div class="timeline__header">
          <h3 class="timeline__title">
            {{ item.title }}<span
              v-if="item.label"
              class="timeline__label"
            >
              {{ item.label }}
            </span>
          </h3>
          <div class="timeline__info">
            <div class="timeline__date">
              <IconTime class="timeline__icon timeline__icon--time" />
              <div class="timeline__text">
                <time v-if="item.date">{{ item.date }}</time><span v-if="item.finish"> — <time>{{ item.finish }}</time></span>
              </div>
            </div>
            <div
              v-if="item.subtitle"
              class="timeline__subtitle"
            >
              <IconUser class="timeline__icon timeline__icon--user" />
              <div class="timeline__text">
                {{ item.subtitle }}
              </div>
            </div>
          </div>
        </div>
        <div class="timeline__main">
          <div
            v-if="item.text"
            class="timeline__content"
          >
            <p>
              {{ item.text }}
            </p>
          </div>
          <div
            v-if="item.url"
            class="timeline__more"
          >
            <a
              :href="item.url"
              target="_blank"
              class="timeline__button"
            >
              <IconPointer class="timeline__icon timeline__icon--pointer" />
              {{ getHostname(item.url) }}</a>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<style>
.timeline {
  @apply relative border-l border-white dark:border-neutral-700 ml-6 mt-10 lg:mb-0;
}

.timeline__list {}

.timeline__item {
  @apply relative mb-10 last:mb-0 pl-10;
}

.timeline__marker {
  @apply flex absolute -left-3.5 top-1 md:top-1.5 justify-center items-center w-6 h-6 bg-neutral-200 rounded-full ring-8 ring-white dark:ring-neutral-900 dark:bg-dusky-900;
}

.timeline__marker svg {
  @apply w-3.5 h-3.5 text-coral-600;
}

.timeline__title {
  @apply flex items-center text-2xl sm:text-3xl font-black;
}

.timeline__label {
  @apply bg-coral-100 text-coral-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-coral-200 dark:text-coral-800 ml-3;
}

.timeline__info {
  @apply flex flex-wrap items-center text-neutral-400 dark:text-neutral-500 mt-2 mb-3;
}

.timeline__content {
  @apply mb-4 sm:text-lg font-normal xl:max-w-[75%];
}

.timeline__more {
  @apply mt-6;
}

.timeline__button {
  @apply inline-flex items-center py-2.5 px-5 font-bold text-neutral-900 bg-amber-400 rounded-lg outline-none;
}

.timeline__icon {
  @apply relative;
}

.timeline__icon--time,
.timeline__icon--user {
  @apply top-1 self-start inline-block w-4 h-4 mr-1.5;
}

.timeline__icon--pointer {
  @apply w-6 h-6 mr-2;
}

.timeline__date {
  @apply w-full sm:w-auto flex items-center sm:mr-6 mb-1;
}

.timeline__subtitle {
  @apply w-full sm:w-auto flex items-center mb-1;
}
</style>
