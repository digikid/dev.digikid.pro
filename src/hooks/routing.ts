import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export const useRouting = () => {
  const route = useRoute();
  const router = useRouter();

  const { t, locale, messages } = useI18n();

  const aliases = router.options.routes.reduce((acc, item) => {
    const { name, path, alias } = item;

    if (name && (typeof name === 'string') && alias) {
      const aliases = Array.isArray(alias) ? alias : [alias];

      aliases.forEach((alias) => {
        acc[alias] = path;
      });
    }

    return acc;
  }, {} as Record<string, string>);

  const path = computed<string>(() => ((route.path in aliases) ? aliases[route.path] : route.path));

  const breadcrumbs = computed<NavItem[]>(() => {
    const parts = [...new Set(path.value.split('/'))];

    const { pages } = messages.value[locale.value];

    const items = parts.reduce((acc, key) => {
      const id = (!key && ['home', '404'].includes(route.name as string)) ? route.name?.toString() : key;

      if (Array.isArray(pages)) {
        const page = pages.find((item) => item.id === id);

        if (page) {
          acc.push(page);
        }
      }

      return acc;
    }, [] as NavItem[]);

    return items;
  });

  const title = computed<string>(() => {
    const parts = breadcrumbs.value.reverse().map(({ title }) => title);

    return (route.name === 'home') ? t('main.title') : [...parts, t('main.title')].join(' | ');
  });

  const page = computed<NavItem>(() => breadcrumbs.value.reverse()[0]);

  return {
    route,
    router,
    path,
    aliases,
    breadcrumbs,
    title,
    page,
  };
};
