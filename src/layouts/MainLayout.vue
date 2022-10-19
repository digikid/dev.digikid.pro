<script setup lang="ts">
import TheHeader from '@components/TheHeader.vue';
import TheMain from '@components/TheMain.vue';
import TheFooter from '@components/TheFooter.vue';
</script>

<template>
  <TheHeader />
  <div class="inner relative w-full min-h-full flex flex-col pt-16 lg:pt-0 lg:pl-[320px]">
    <TheMain />
    <TheFooter />
  </div>
</template>
