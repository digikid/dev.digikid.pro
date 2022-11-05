<script setup lang="ts">
import WidgetCopyright from '@components/widgets/WidgetCopyright.vue';
</script>

<template>
  <footer class="footer">
    <div class="footer__copyright">
      <WidgetCopyright />
    </div>
  </footer>
</template>

<style>
.footer {
  @apply fixed left-0 bottom-0 z-[0] w-full block lg:hidden p-6 text-center text-neutral-400 dark:text-dusky-700 bg-white dark:bg-dusky-900;
}
</style>
