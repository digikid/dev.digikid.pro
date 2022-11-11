import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useGlobalStore } from '@stores/global';

import { updateTitle } from '@utils/dom';

import { metrika } from '@metrika/index';

import i18n from '@i18n/index';

import Home from '@pages/Home.vue';
import Projects from '@pages/Projects.vue';
import Tools from '@pages/Tools.vue';
import Contacts from '@pages/Contacts.vue';
import NotFound from '@pages/NotFound.vue';

const { BASE_URL } = import.meta.env;

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'home',
  component: Home,
}, {
  path: '/projects',
  alias: '/portfolio',
  name: 'projects',
  component: Projects,
}, {
  path: '/tools',
  name: 'tools',
  component: Tools,
}, {
  path: '/contacts',
  name: 'contacts',
  component: Contacts,
}, {
  path: '/404',
  name: '404',
  component: NotFound,
}, {
  path: '/:pathMatch(.*)*',
  redirect: '404',
}];

const router = createRouter({
  routes,
  history: createWebHistory(BASE_URL),
});

router.beforeEach((to, from, next) => {
  const store = useGlobalStore();

  setTimeout(() => {
    if (store.isHeaderActive) {
      store.isHeaderActive = false;
    }

    document.getElementById('app')?.scrollTo(0, 0);
  }, 150);

  next();
});

router.afterEach((to, from) => {
  const { messages, locale, t } = i18n.global;
  const { pages } = (messages as any).value[(locale as any).value];

  const page = Array.isArray(pages) ? pages.find((item) => (item.id === to.name)) : null;
  const title = (page && page.title) ? page.title : t('main.title');
  const description = (page && page.text) ? page.text : t('main.description');

  updateTitle(`${title} — ${t('main.title')}`, description);

  if (from.name !== to.name) {
    const options: Record<string, string> = {
      title,
    };

    if (from.name) {
      options.referer = from.path;
    }

    metrika.hit(to.path, options);
  }
});

export default router;
