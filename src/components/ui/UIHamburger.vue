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
  <div class="w-full h-full flex items-center justify-center">
    <a
      href="#"
      class="block p-2"
      :class="{
        'pointer-events-none': isAnimated || props.locked
      }"
      @click.prevent="emit('toggle')"
    >
      <svg
        class="w-full h-full select-none transition-transform"
        :style="`transition-duration: ${props.duration}ms`"
        :class="{
          'rotate-45': props.active
        }"
        viewBox="0 0 100 100"
      >
        <g transform="scale(1.5) translate(-15, -17.5)">
          <path
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
            class="transition-transform middle origin-[50%]"
            :class="{
              'rotate-90': props.active
            }"
            :style="`transition: stroke ${props.duration}ms`"
            fill="none"
            :stroke="props.color"
            :stroke-width="props.size"
            stroke-linecap="round"
            stroke-dasharray="40 142"
            d="m 30,50 h 40"
          />
          <path
            class="bottom origin-[50%]"
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
