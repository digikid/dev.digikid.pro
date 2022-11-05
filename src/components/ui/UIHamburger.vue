<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  active?: boolean;
  locked?: boolean;
  duration?: number;
  size?: number;
  color?: string;
}>(), {
  active: false,
  locked: false,
  duration: 400,
  size: 5,
  color: 'black',
});

const emit = defineEmits([
  'toggle',
  'animationStart',
  'animationEnd',
]);

const isAnimated = ref<boolean>(false);

watch(() => props.active, () => {
  isAnimated.value = true;

  emit('animationStart');

  setTimeout(() => {
    isAnimated.value = false;

    emit('animationEnd');
  }, props.duration);
});
</script>

<template>
  <div
    class="hamburger"
    :class="{
      'hamburger--locked': isAnimated || props.locked,
      'hamburger--active': props.active
    }"
  >
    <a
      href="#"
      class="hamburger__wrapper"
      @click.prevent="emit('toggle')"
    >
      <svg
        class="hamburger__bars"
        :style="`transition-duration: ${props.duration}ms`"
        viewBox="0 0 100 100"
      >
        <g transform="scale(1.5) translate(-15, -17.5)">
          <path
            class="hamburger__bar hamburger__bar--1"
            :style="`transition: stroke-dasharray ${props.duration}ms, stroke-dashoffset ${props.duration}ms, stroke ${props.duration}ms`"
            fill="none"
            :stroke="props.color"
            :stroke-width="props.size"
            stroke-linecap="round"
            stroke-dasharray="40 160"
            :stroke-dashoffset="props.active ? '-64' : 0"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          />
          <path
            class="hamburger__bar hamburger__bar--2"
            :style="`transition: stroke ${props.duration}ms`"
            fill="none"
            :stroke="props.color"
            :stroke-width="props.size"
            stroke-linecap="round"
            stroke-dasharray="40 142"
            d="m 30,50 h 40"
          />
          <path
            class="hamburger__bar hamburger__bar--3"
            :style="`transition: transform ${props.duration}ms, stroke-dashoffset ${props.duration}ms, stroke ${props.duration}ms`"
            fill="none"
            :stroke="props.color"
            :stroke-width="props.size"
            stroke-linecap="round"
            stroke-dasharray="40 85"
            :stroke-dashoffset="props.active ? '-64' : 0"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          />
        </g>
      </svg>
    </a>
  </div>
</template>

<style>
.hamburger {
  @apply w-full h-full flex items-center justify-center;
}

.hamburger__wrapper {
  @apply block p-2;
}

.hamburger--locked .hamburger__wrapper {
  @apply pointer-events-none;
}

.hamburger__bars {
  @apply w-full h-full select-none transition-transform;
}

.hamburger--active .hamburger__bars {
  @apply rotate-45;
}

.hamburger__bar {}
.hamburger__bar--1 {}

.hamburger__bar--2 {
  @apply transition-transform origin-[50%];
}

.hamburger--active .hamburger__bar--2 {
  @apply rotate-90;
}

.hamburger__bar--3 {
  @apply origin-[50%];
}
</style>
