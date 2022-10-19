<script setup lang="ts">
import WidgetSocials from '@components/widgets/WidgetSocials.vue';
import WidgetMode from '@components/widgets/WidgetMode.vue';
import WidgetLocale from '@components/widgets/WidgetLocale.vue';
import WidgetCopyright from '@components/widgets/WidgetCopyright.vue';
import WidgetFacts from '@components/widgets/WidgetFacts.vue';
</script>

<template>
  <div class="header-footer p-6 lg:py-8 lg:px-[42px]">
    <WidgetFacts class="hidden lg:block mb-6" />
    <WidgetSocials class="mb-6" />
    <div class="inline-flex lg:w-full flex-wrap items-center lg:justify-between gap-6 lg:gap-3 mb-6">
      <WidgetLocale />
      <WidgetMode />
    </div>
    <WidgetCopyright class="text-neutral-400 dark:text-dusky-700" />
  </div>
</template>
