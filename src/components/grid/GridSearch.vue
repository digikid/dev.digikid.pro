<script setup lang="ts">
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
  <div class="relative">
    <input
      type="text"
      class="peer block w-full h-full text-left text-lg dark:text-dusky-50 xl:text-2xl font-bold outline-none cursor-pointer pl-12 md:pl-14 pr-2 md:pr-3 py-3 bg-white dark:bg-neutral-900 rounded-xl border border-transparent focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-600 placeholder:text-neutral-200 dark:placeholder:text-dusky-800"
      :value="props.value"
      :placeholder="props.placeholder"
      @input="onInput"
    >
    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-neutral-200 dark:text-dusky-700 peer-focus:text-sky-600">
      <svg
        aria-hidden="true"
        class="w-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      /></svg>
    </div>
  </div>
</template>
