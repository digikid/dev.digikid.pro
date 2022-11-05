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
  <div class="checkbox">
    <label
      :for="id"
      class="checkbox__wrapper"
    >
      <input
        :id="id"
        type="checkbox"
        class="checkbox__input"
        :value="true"
        :checked="props.checked"
        @input="onChange"
      >
      <div class="checkbox__label" />
      <span
        v-if="props.label"
        class="checkbox__title"
      >{{ props.label }}</span>
    </label>
  </div>
</template>

<style>
.checkbox {
  @apply w-full h-full;
}

.checkbox__wrapper {
  @apply inline-flex relative items-center cursor-pointer;
}

.checkbox__input {
  @apply sr-only;
}

.checkbox__input:checked ~ .checkbox__label {
  @apply bg-green-600;
}

.checkbox__input:checked ~ .checkbox__label:after {
@apply translate-x-full bg-white;
}

.checkbox__label {
  @apply w-[57px] h-[32px] bg-white dark:bg-neutral-800 rounded-full transition-all after:content-[''] after:absolute after:top-[3px] after:left-[2px] after:bg-green-600 after:rounded-full after:w-[26px] after:h-[26px] after:transition-all;
}

.checkbox__title {
  @apply ml-3 text-lg font-medium dark:text-dusky-100;
}
</style>
