<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string;
  items: NavItem[];
}>(), {
  items: () => [],
});

const emit = defineEmits<{ (e: 'route', itemId: string, menuId: string): void }>();
</script>

<template>
  <nav
    v-if="props.items.length"
    class="nav"
    role="navigation"
  >
    <div
      v-for="item in props.items"
      :key="item.id"
      class="block transition leading-normal text-base text-dusky-300 hover:text-coral-500 dark:hover:text-coral-500 mb-1 lg:mb-0"
      :class="item.active ? 'text-coral-500 dark:text-coral-500' : 'text-neutral-900 dark:text-dusky-300'"
    >
      <a
        class="cursor-pointer"
        :href="`#${item.id}`"
        @click.prevent="emit('route', item.id, props.id)"
      >
        {{ item.title }}
      </a>
    </div>
  </nav>
</template>
