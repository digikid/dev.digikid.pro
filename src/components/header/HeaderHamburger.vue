<script setup lang="ts">
import { useGlobalStore } from '@stores/global';

import UIHamburger from '@components/ui/UIHamburger.vue';

const props = withDefaults(defineProps<{
  active?: boolean;
  duration?: number;
}>(), {
  active: false,
  duration: 300,
});

const emit = defineEmits(['toggle']);

const store = useGlobalStore();
</script>

<template>
  <div class="header__hamburger">
    <UIHamburger
      :active="props.active"
      :duration="props.duration"
      :color="store.colorMode === 'dark' ? 'white' : 'black'"
      @toggle="emit('toggle')"
    />
  </div>
</template>

<style>
.header__hamburger {
  @apply w-16 lg:hidden;
}
</style>
