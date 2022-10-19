<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  rounded?: boolean;
  size?: GridSize;
}>(), {
  size: '1/4',
});

const classes = computed<string>(() => {
  const size = props.size.toString();
  const arr = ['w-full px-3 pb-4 md:pb-6'];

  if (size === '1/2') {
    arr.push('sm:w-full 2xl:w-1/2');
  }

  if (size === '1/3') {
    arr.push('md:w-1/2 lg:w-full xl:w-1/2 2xl:w-1/3');
  }

  if (size === '1/4') {
    arr.push('sm:w-1/2 2xl:w-1/4');
  }

  return arr.join(' ');
});
</script>

<template>
  <div
    class="block absolute w-full opacity-0 transition-opacity duration-700"
    :class="classes"
  >
    <div class="relative w-full">
      <div
        class="w-full overflow-hidden"
        :class="[
          props.rounded ? `rounded-xl` : ''
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
