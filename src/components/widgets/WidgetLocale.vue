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
  <Popover class="relative">
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
      <PopoverButton
        class="flex items-center justify-center font-medium rounded-md py-2 px-3 lg:p-2 lg:text-sm text-neutral-900 dark:text-dusky-100 outline-none cursor-pointer bg-neutral-200 dark:bg-neutral-800"
      >
        <img
          :src="`/images/locale/${messages.code}.svg`"
          class="w-5 h-5 mr-2.5"
          :alt="messages.title.toString()"
        >
        {{ messages.title }}
      </PopoverButton>
      <PopoverPanel
        v-slot="{ close }"
        class="bg-white dark:bg-neutral-800 rounded-md shadow overflow-hidden shadow-neutral-300 dark:shadow-black"
      >
        <ul class="block list-none">
          <li
            v-for="(item, code) in i18nMessages"
            :key="code"
          >
            <a
              href="#"
              class="block py-2 px-3 lg:p-2 lg:text-sm hover:bg-neutral-100 dark:text-dusky-400 dark:hover:bg-neutral-700 dark:hover:text-white transition"
              role="menuitem"
              :class="code === locale ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-900 dark:text-white'"
              @click.prevent="setLocale(code, close)"
            >
              <div class="flex items-center whitespace-nowrap">
                <img
                  :src="`/images/locale/${item.code}.svg`"
                  :alt="item.title.toString()"
                  class="h-4 w-4 rounded-full mr-2.5"
                  aria-hidden="true"
                >
                <div>
                  {{ item.title }}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </PopoverPanel>
    </Float>
  </Popover>
</template>
