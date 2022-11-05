<script setup lang="ts">
import { useLocale } from '@hooks/locale';

import { Float } from '@headlessui-float/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const { locale, messages, i18nMessages } = useLocale();

const setLocale = (code: string, cb?: CallbackFunction) => {
  locale.value = code;

  if (typeof cb === 'function') {
    cb();
  }
};
</script>

<template>
  <Popover class="locale">
    <Float
      placement="bottom-start"
      :offset="{
        mainAxis: 15,
        crossAxis: 0
      }"
      :shift="6"
      :flip="10"
      portal
      enter="transition duration-200 ease-out"
      enter-from="opacity-0 -translate-y-1"
      enter-to="opacity-100 translate-y-0"
      leave="transition duration-150 ease-in"
      leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 -translate-y-1"
    >
      <PopoverButton class="locale__button">
        <img
          :src="`/images/locale/${messages.code}.svg`"
          :alt="messages.title.toString()"
          class="locale__icon"
        >
        {{ messages.title }}
      </PopoverButton>
      <PopoverPanel
        v-slot="{ close }"
        class="locale__dropdown"
      >
        <ul class="locale__list">
          <li
            v-for="(item, code) in i18nMessages"
            :key="code"
            class="locale__item"
            :class="{
              'locale__item--active': (code === locale)
            }"
          >
            <a
              href="#"
              class="locale__link"
              role="menuitem"
              @click.prevent="setLocale(code, close)"
            >
              <img
                :src="`/images/locale/${item.code}.svg`"
                :alt="item.title.toString()"
                aria-hidden="true"
                class="locale__icon"
              >
              <div class="locale__title">
                {{ item.title }}
              </div>
            </a>
          </li>
        </ul>
      </PopoverPanel>
    </Float>
  </Popover>
</template>

<style>
.locale {
  @apply relative;
}

button.locale__button {
  @apply flex items-center justify-center font-medium rounded-md py-2 px-3 lg:p-2 lg:text-sm text-neutral-900 dark:text-dusky-100 outline-none cursor-pointer bg-neutral-200 dark:bg-neutral-800;
}

.locale__button .locale__icon {
  @apply w-5 h-5 mr-2.5;
}

.locale__dropdown {
  @apply bg-white dark:bg-neutral-800 rounded-md shadow overflow-hidden shadow-neutral-300 dark:shadow-black;
}

.locale__list {
  @apply block list-none;
}

.locale__item {}

.locale__link {
  @apply flex items-center whitespace-nowrap py-2 px-3 lg:p-2 lg:text-sm hover:bg-neutral-100 dark:text-dusky-400 dark:hover:bg-neutral-700 dark:hover:text-white transition text-neutral-900 dark:text-white;
}

.locale__item--active .locale__link {
  @apply text-neutral-500 hover:text-neutral-900;
}

.locale__dropdown .locale__icon {
  @apply h-4 w-4 rounded-full mr-2.5;
}

.locale__title {}
</style>
