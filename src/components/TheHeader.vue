<script setup lang="ts">
import { ref, watch } from 'vue';

import { useGlobalStore } from '@stores/global';
import { setStyle, mediaMin } from '@utils/dom';

import HeaderFooter from '@components/header/HeaderFooter.vue';
import HeaderNav from '@components/header/HeaderNav.vue';
import HeaderHeading from '@components/header/HeaderHeading.vue';
import HeaderHamburger from '@components/header/HeaderHamburger.vue';

const props = withDefaults(defineProps<{
  duration?: number;
  breakpoint?: number;
}>(), {
  duration: 300,
  breakpoint: 1024,
});

const store = useGlobalStore();

const $main = ref<HTMLElement>();

watch(() => store.isHeaderActive, (value) => {
  if (mediaMin(props.breakpoint)) {
    return;
  }

  const mainEl = $main.value;

  const styles = {
    transition: `opacity ${props.duration}ms ease-in-out`,
    'pointer-events': store.isHeaderActive ? 'auto' : 'none',
    opacity: store.isHeaderActive ? '1' : '0',
  };

  if (mainEl) {
    Object.entries(styles).forEach(([prop, value]) => setStyle(mainEl, prop, value));

    setTimeout(() => {
      const props: string[] = ['transition'];

      if (!value) {
        props.push('pointer-events', 'opacity');
      }

      props.forEach((prop) => setStyle(mainEl, prop));
    }, props.duration);
  }
});

const onHamburgerToggle = () => {
  store.isHeaderActive = !store.isHeaderActive;
};
</script>

<template>
  <header
    class="header"
  >
    <div class="header__panel">
      <HeaderHeading />
      <HeaderHamburger
        :active="store.isHeaderActive"
        :duration="duration"
        @toggle="onHamburgerToggle"
      />
    </div>
    <div
      ref="$main"
      class="header__main"
    >
      <HeaderNav />
      <HeaderFooter />
    </div>
  </header>
</template>

<style>
.header {
  @apply lg:fixed top-0 left-0 w-full lg:w-[320px] lg:h-full flex flex-col z-[2];
}

.header__panel {
  @apply fixed top-0 left-0 lg:static z-[99] w-full flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 sm:px-4 sm:py-2 lg:p-8 lg:px-[42px];
}

.header__main {
  @apply fixed top-0 left-0 lg:static pointer-events-none lg:pointer-events-auto z-[98] flex pt-16 lg:pt-0 w-full h-full lg:h-auto opacity-0 lg:opacity-100 grow flex-col text-center overflow-y-auto no-scrollbar lg:text-left bg-white dark:bg-dusky-900;
}
</style>
