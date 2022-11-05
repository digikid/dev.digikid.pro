<script setup lang="ts">
import { useLocale } from '@hooks/locale';

const { t } = useLocale();
</script>

<template>
  <div class="copyright">
    <div class="copyright__header">
      &copy; 2016 &mdash; {{ new Date().getFullYear() }} @digikid
    </div>
    <div class="copyright__main">
      {{ t('main.copyright') }} (c)
    </div>
  </div>
</template>

<style>
.copyright {
  @apply text-xs tracking-wide;
}

.copyright__header {}

.copyright__main {
  @apply mt-1;
}
</style>
