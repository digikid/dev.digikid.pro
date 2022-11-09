<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string;
  items: NavItem[];
}>(), {
  items: () => [],
});

const emit = defineEmits<{ (e: 'route', itemId: string, menuId: string): void }>();

const getHref = ({ id }: NavItem) => {
  if (props.id === 'main') {
    return (id === 'home') ? '/' : id;
  }

  return `#${id}`;
};
</script>

<template>
  <nav
    v-if="props.items.length"
    :class="['nav', `nav--${props.id}`]"
    role="navigation"
  >
    <div
      v-for="item in props.items"
      :key="item.id"
      class="nav__item"
      :class="{
        'is-active': item.active
      }"
    >
      <a
        class="nav__link"
        :href="getHref(item)"
        @click.prevent="emit('route', item.id, props.id)"
      >
        {{ item.title }}
      </a>
    </div>
  </nav>
</template>

<style>
.nav {}

.nav__item {
  @apply block leading-normal text-base text-dusky-300 dark:text-dusky-300;
}

.nav__item.is-active {
  @apply text-coral-500 dark:text-coral-500 !important;
}

.nav--main .nav__item {
  @apply font-extrabold text-[8vw] xs:text-[6vw] sm:text-[5vw] lg:text-lg text-neutral-900 dark:text-neutral-400;
}

.nav__link {
  @apply cursor-pointer;
}
</style>
