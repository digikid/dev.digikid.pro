<script setup lang="ts">
const props = withDefaults(defineProps<{
  items?: LinkItem[],
}>(), {
  items: () => [],
});
</script>

<template>
  <div
    v-if="props.items.length"
    class="links"
  >
    <div class="links__list">
      <span
        v-for="(item, i) in props.items"
        :key="item.id"
        class="links__item"
      >
        <span
          v-if="i"
          class="links__divider"
        > | </span>
        <a
          :href="item.url"
          class="links__link"
          target="_blank"
        >
          {{ item.title }}
        </a>
      </span>
    </div>
  </div>
</template>

<style>
.links {}

.links__list {
  @apply text-lg lg:text-base;
}

.links__item {
  @apply align-middle;
}

.links__divider {
  @apply inline-block mx-2 text-neutral-200 dark:text-neutral-800;
}

.links__link {
  @apply inline text-coral-600 hover:text-coral-500 dark:text-red-600 dark:hover:text-red-600;
}
</style>
