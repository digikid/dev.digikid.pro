<script setup lang="ts">
import IconSearch from '@components/icons/IconSearch.vue';

const props = withDefaults(defineProps<{
  value?: string;
  placeholder?: string;
}>(), {
  value: '',
  placeholder: '',
});

const emit = defineEmits<{ (e: 'update', value: string): void }>();

const onInput = (e: Event) => emit('update', (<HTMLInputElement>(e.target)).value);
</script>

<template>
  <div class="grid__search">
    <input
      type="text"
      class="grid__search-input"
      :value="props.value"
      :placeholder="props.placeholder"
      @input="onInput"
    >
    <div class="grid__search-holder">
      <IconSearch class="grid__search-icon" />
    </div>
  </div>
</template>

<style>
.grid__search {
  @apply relative;
}

input.grid__search-input {
  @apply block w-full h-full text-left text-lg dark:text-dusky-50 xl:text-2xl font-bold outline-none cursor-pointer pl-12 md:pl-14 pr-2 md:pr-3 py-3 bg-white dark:bg-neutral-900 rounded-xl border border-transparent focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-600 placeholder:text-neutral-200 dark:placeholder:text-dusky-800;
}

.grid__search-holder {
  @apply flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-neutral-200 dark:text-dusky-700;
}

input.grid__search-input:focus + .grid__search-holder {
  @apply text-sky-600;
}

.grid__search-icon {
  @apply w-7;
}
</style>
