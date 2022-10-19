<script setup lang="ts">
const props = withDefaults(defineProps<{
  toggle?: boolean;
}>(), {
  toggle: false,
});
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="duration-150 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    :leave-active-class="['ease-in', (props.toggle ? 'duration-150' : 'duration-0')].join(' ')"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <slot />
  </Transition>
</template>
