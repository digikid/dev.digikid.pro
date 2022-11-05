<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGlobalStore } from '@stores/global';

import IconColor from '@components/icons/IconColor.vue';

const store = useGlobalStore();

const isDarkMode = ref<boolean>(store.colorMode === 'dark');

watch(isDarkMode, (value) => {
  store.colorMode = value ? 'dark' : 'light';
});
</script>

<template>
  <div class="mode">
    <label
      for="color-mode"
      class="mode__visual"
    >
      <IconColor class="mode__icon" />
    </label>
    <label class="mode__control">
      <input
        id="color-mode"
        v-model="isDarkMode"
        type="checkbox"
        class="mode__input"
      >
      <span class="mode__figure mode__figure--sun" />
      <span class="mode__figure mode__figure--moon" />
    </label>
  </div>
</template>

<style>
.mode {
  @apply relative flex items-center;
}

.mode__visual {
  @apply text-sm text-neutral-300 dark:text-dusky-800 font-medium cursor-pointer mr-2;
}

.mode__icon {
  @apply h-8 lg:h-6;
}

.mode__control {
  @apply relative block w-[54px] lg:w-[45px] h-[30px] lg:h-[25px] rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer transition duration-300;
}

input.mode__input {
  @apply hidden;
}

.mode__figure {
  @apply block absolute top-[5px] lg:top-[3.5px] w-[20px] lg:w-[18px] transition duration-300 h-[20px] lg:h-[18px] rounded-full;
}

.mode__figure--sun {
  @apply left-[5px] lg:left-[3.5px] bg-amber-400;
}

.mode__input:checked ~ .mode__figure--sun {
  @apply bg-sky-400 translate-x-[24px] lg:translate-x-[20px];
}

.mode__figure--moon {
  @apply left-[-14.5px] lg:left-[-14.5px] bg-neutral-200 scale-[0.00001];
}

.mode__input:checked ~ .mode__figure--moon {
  @apply bg-neutral-800 translate-x-[32px] lg:translate-x-[30px] scale-100;
}
</style>
