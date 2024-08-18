<script setup lang="ts">
const props = withDefaults(defineProps<{
  rounded?: boolean;
  size?: GridSize;
}>(), {
  size: '1/4',
});
</script>

<template>
  <div
    class="grid__item"
    :class="[`grid__item--${size}`, {
      'grid__item--rounded': props.rounded
    }]"
  >
    <div class="grid__item-outer">
      <div class="grid__item-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.grid__item {
  @apply block absolute w-full opacity-0 transition-opacity duration-700 w-full px-3 pb-4 md:pb-6;
}

.grid__item--1\/2 {
  @apply sm:w-full 2xl:w-1/2;
}

.grid__item--1\/3 {
  @apply md:w-1/2 lg:w-full xl:w-1/2 2xl:w-1/3;
}

.grid__item--1\/4 {
  @apply sm:w-1/2 2xl:w-1/4;
}

.grid__item--hidden {
  z-index: 0;
}
.grid__item--visible {
  z-index: 1;
}
.grid__item--releasing {
  z-index: 2;
}
.grid__item--dragging {
  z-index: 3;
}

.grid__item-outer {
  @apply relative w-full;
}

.grid__item-inner {
  @apply w-full overflow-hidden;
}

.grid__item--rounded .grid__item-inner {
  @apply rounded-xl;
}
</style>
