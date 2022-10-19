<script setup lang="ts">
import { computed } from 'vue';

import { useGlobalStore } from '@stores/global';
import { useLocale } from '@hooks/locale';
import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import WidgetContacts from '@components/widgets/WidgetContacts.vue';

const store = useGlobalStore();

const { t } = useLocale();
const { items: data } = useData<ContactData, ContactsLocalize>('contacts');

const items = computed(() => data.value.filter((item) => item.id !== 'socials').map((item) => {
  if (item.id === 'location' && item.items.length) {
    // eslint-disable-next-line no-param-reassign
    item.items[0].title = t('location');
  }

  return item;
}));
</script>

<template>
  <UISection
    id="contacts"
  >
    <div class="grid md:grid-cols-2 lg:grid-cols-none xl:grid-cols-2 2xl:grid-rows-2 2xl:grid-flow-col gap-4 md:gap-6">
      <WidgetContacts
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :text="item.text"
        :large="(item.id === 'location')"
      >
        <div
          v-if="(item.id === 'location')"
          class="w-full text-center text-neutral-200 dark:text-neutral-800 mb-6 2xl:mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-20 h-20"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
            <circle
              cx="12"
              cy="6"
              r="3"
            />
          </svg>
        </div>
        <component
          :is="(item.id === 'location') ? 'div' : 'a'"
          v-for="subitem in item.items"
          :key="subitem.id"
          :href="subitem.url"
          :target="(subitem.url && !subitem.url.includes('mailto')) ? '_blank' : null"
          class="block font-black 2xl:max-w-[90%] mx-auto mb-1 last:mb-0"
          :class="(item.id === 'location') ? `!leading-[1.15] text-4xl xs:text-5xl xl:text-7xl` : `cursor-pointer text-transparent bg-clip-text bg-gradient-to-r ${store.getGradient()} !leading-[1.25] text-3xl xs:text-4xl`"
        >
          {{ subitem.title }}
        </component>
      </WidgetContacts>
    </div>
  </UISection>
</template>
