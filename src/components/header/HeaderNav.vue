<script setup lang="ts">
import { computed } from 'vue';

import { useRouting } from '@hooks/routing';
import { useLocale } from '@hooks/locale';
import { useGlobalStore } from '@stores/global';
import { smoothScroll } from '@utils/scroll';

import WidgetNav from '@components/widgets/WidgetNav.vue';
import WidgetChapters from '@components/widgets/WidgetChapters.vue';
import UITransition from '@components/ui/UITransition.vue';

const store = useGlobalStore();

const { route, router } = useRouting();
const { messages } = useLocale();

const navItems = computed<NavItem[]>(() => {
  const { pages } = messages.value;

  return router.options.routes.filter(({ name }) => (name && (name !== '404'))).reduce((acc, { name }) => {
    if (Array.isArray(pages)) {
      const page = pages.find((item) => item.id === name);

      if (page) {
        const { id, title } = page;

        const active = route.name === id;

        acc.push({
          id,
          title,
          active,
        });
      }
    }

    return acc;
  }, [] as NavItem[]);
});

const onNavClick = (id: string) => {
  router.push(`/${id === 'home' ? '' : id}`);
};

const onChaptersClick = (id: string) => {
  const el = document.querySelector(`#${id}`);
  const container = document.querySelector('#app');

  if (el && container) {
    smoothScroll(
      el,
      {
        container,
        offset: -30,
      },
    );
  }
};
</script>

<template>
  <div class="header-nav grow flex flex-col justify-center lg:justify-start p-6 pb-0 lg:pt-8 lg:px-[42px]">
    <WidgetNav
      id="main"
      :items="navItems"
      @route="onNavClick"
    />
    <div class="hidden lg:block mt-6 empty:hidden">
      <UITransition toggle>
        <WidgetChapters
          id="chapters"
          :items="store.chapters"
          @route="onChaptersClick"
        />
      </UITransition>
    </div>
  </div>
</template>
