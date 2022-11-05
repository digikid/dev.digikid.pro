<script setup lang="ts">
import { useLocale } from '@hooks/locale';

const { t } = useLocale();
</script>

<template>
  <div class="heading">
    <div class="heading__header">
      <RouterLink
        to="/"
        class="heading__logo"
      >
        <img
          src="/images/logo.svg"
          :alt="t('main.title')"
        >
      </RouterLink>
    </div>
    <div class="heading__main">
      <div class="heading__title">
        {{ t('main.title') }}
      </div>
      <div class="heading__text">
        {{ t('main.description') }}
      </div>
    </div>
  </div>
</template>

<style>
.heading {
  @apply relative flex items-center lg:items-start lg:flex-col overflow-hidden;
}

.heading__header {}

.heading__main {
  @apply ml-4 sm:ml-5 lg:ml-0;
}

.heading__logo {}

.heading__logo img {
  @apply block w-6 lg:w-12 lg:mb-6;
}

.heading__title {
  @apply font-black text-[5.5vw] xs:text-xl lg:text-[28px] leading-[1.15] lg:leading-tight;
}

.heading__text {
  @apply text-neutral-400 dark:text-dusky-400 text-[4.25vw] xs:text-sm lg:text-base lg:mt-3;
}
</style>
