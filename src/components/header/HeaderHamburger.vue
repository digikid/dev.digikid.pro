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
  <div class="lg:hidden w-16">
    <UIHamburger
      :active="props.active"
      :duration="props.duration"
      :color="store.colorMode === 'dark' ? 'white' : 'black'"
      @toggle="emit('toggle')"
    />
  </div>
</template>
