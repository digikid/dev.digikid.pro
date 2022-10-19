<script setup lang="ts">
import { useLocale } from '@hooks/locale';

const { t } = useLocale();
</script>

<template>
  <div class="text-xs tracking-wide">
    <div>&copy; 2016 &mdash; {{ new Date().getFullYear() }} @digikid</div>
    <div class="mt-1">
      {{ t('main.copyright') }} (c)
    </div>
  </div>
</template>
