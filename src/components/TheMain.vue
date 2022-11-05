<script setup lang="ts">
import UITransition from '@components/ui/UITransition.vue';
</script>

<template>
  <main
    class="main"
    role="main"
  >
    <RouterView v-slot="{ Component }">
      <UITransition>
        <component :is="Component" />
      </UITransition>
    </RouterView>
  </main>
</template>

<style>
.main {
  @apply relative flex flex-col z-[1] mb-[84px] lg:mb-0 grow bg-neutral-200 dark:bg-black;
}
</style>
