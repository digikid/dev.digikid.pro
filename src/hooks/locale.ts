import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLocale = () => {
  const { t, locale, messages: i18nMessages } = useI18n();

  const messages = computed(() => i18nMessages.value[locale.value]);

  const code = computed<string>(() => (messages.value ? (messages.value.code as string) : ''));

  return {
    t,
    code,
    locale,
    messages,
    i18nMessages,
  };
};
