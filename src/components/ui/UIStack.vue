<script setup lang="ts">
const props = withDefaults(defineProps<{
  items?: StackItem[],
}>(), {
  items: () => [],
});
</script>

<template>
  <div class="stack">
    <div
      v-if="props.items.length"
      class="stack__list"
    >
      <span
        v-for="item in props.items"
        :key="item.id"
        class="stack__item"
      >
        {{ item.title }}
      </span>
    </div>
  </div>
</template>

<style>
.stack {}

.stack__list {
  @apply mt-2 -mb-1;
}

.stack__item {
  @apply inline-block px-2 py-1.5 text-[0.825rem] leading-[1.15] text-center text-white whitespace-nowrap align-baseline font-bold bg-sky-600 rounded mr-1.5 mb-1.5 last:mr-0;
}
</style>
