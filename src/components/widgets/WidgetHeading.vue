<script setup lang="ts">
import { useLocale } from '@hooks/locale';

const { t } = useLocale();
</script>

<template>
  <div class="relative flex items-center lg:items-start lg:flex-col overflow-hidden">
    <div>
      <RouterLink to="/">
        <img
          src="/images/logo.svg"
          :alt="t('main.title')"
          class="block w-6 lg:w-12 lg:mb-6"
        >
      </RouterLink>
    </div>
    <div class="ml-4 sm:ml-5 lg:ml-0">
      <div class="font-black text-[5.5vw] xs:text-xl lg:text-[28px] leading-[1.15] lg:leading-tight">
        {{ t('main.title') }}
      </div>
      <div class="text-neutral-400 dark:text-dusky-400 text-[4.25vw] xs:text-sm lg:text-base lg:mt-3">
        {{ t('main.description') }}
      </div>
    </div>
  </div>
</template>
