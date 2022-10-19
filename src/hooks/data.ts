import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useDataStore } from '@stores/data';

export const useData = <T extends Record<'id', string>, L>(id: string, reverse = false) => {
  const { locale, messages } = useI18n();

  const dataStore = useDataStore();

  const data = computed(() => dataStore[id as keyof typeof dataStore] as T);

  const items = computed<(T & L)[]>(() => {
    if (Array.isArray(data.value)) {
      const localized = messages.value[locale.value][id];

      if (Array.isArray(localized)) {
        const result = data.value.filter(({ active }) => active).reduce((acc, item) => {
          const { id, ...data } = item;

          const localize = localized.find((item) => item.id === id) as L;

          const result = localize ? {
            id,
            ...data,
            ...localize,
          } : item;

          acc.push(result);

          return acc;
        }, []);

        return reverse ? result.reverse() : result;
      }

      return reverse ? data.value.reverse() : data.value;
    }

    return [];
  });

  const getItem = (id: string) => (items.value as (T & L)[]).find((item) => item.id === id);

  return {
    items,
    getItem,
  };
};
