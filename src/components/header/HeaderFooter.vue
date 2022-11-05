<script setup lang="ts">
import WidgetSocials from '@components/widgets/WidgetSocials.vue';
import WidgetMode from '@components/widgets/WidgetMode.vue';
import WidgetLocale from '@components/widgets/WidgetLocale.vue';
import WidgetCopyright from '@components/widgets/WidgetCopyright.vue';
import WidgetFacts from '@components/widgets/WidgetFacts.vue';
</script>

<template>
  <div class="header__footer">
    <div class="header__footer-facts">
      <WidgetFacts />
    </div>
    <div class="header__footer-socials">
      <WidgetSocials />
    </div>
    <div class="header__footer-grid">
      <div class="header__footer-locale">
        <WidgetLocale />
      </div>
      <div class="header__footer-mode">
        <WidgetMode />
      </div>
    </div>
    <div class="header__footer-copyright">
      <WidgetCopyright />
    </div>
  </div>
</template>

<style>
.header__footer {
  @apply p-6 lg:py-8 lg:px-[42px];
}

.header__footer-facts {
  @apply hidden lg:block mb-6;
}

.header__footer-socials {
  @apply mb-6;
}

.header__footer-grid {
  @apply inline-flex lg:w-full flex-wrap items-center lg:justify-between gap-6 lg:gap-3 mb-6;
}

.header__footer-copyright {
  @apply text-neutral-400 dark:text-dusky-700;
}
</style>
