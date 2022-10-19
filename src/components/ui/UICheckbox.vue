<script setup lang="ts">
import { id as randomId } from '@utils/random';

const id = randomId();

const props = withDefaults(defineProps<{
  checked?: boolean;
  label?: string;
}>(), {
  checked: false,
  label: '',
});

const emit = defineEmits<{ (e: 'update', value: boolean): void }>();

const onChange = (e: Event) => emit('update', (<HTMLInputElement>(e.target)).checked);
</script>

<template>
  <div class="w-full h-full">
    <label
      :for="id"
      class="inline-flex relative items-center cursor-pointer"
    >
      <input
        :id="id"
        type="checkbox"
        class="sr-only peer"
        :value="true"
        :checked="props.checked"
        @input="onChange"
      >
      <div class="w-[57px] h-[32px] bg-white dark:bg-neutral-800 rounded-full transition-all peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[2px] after:bg-green-600 after:rounded-full after:w-[26px] after:h-[26px] after:transition-all peer-checked:bg-green-600 peer-checked:after:bg-white" />
      <span
        v-if="props.label"
        class="ml-3 text-lg font-medium dark:text-dusky-100"
      >{{ props.label }}</span>
    </label>
  </div>
</template>
