<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '@hooks/locale';

import { Float } from '@headlessui-float/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

import IconChevron from '@components/icons/IconChevron.vue';

const props = withDefaults(defineProps<{
  items?: GridFilter[],
}>(), {
  items: () => [],
});

const emit = defineEmits<{ (e: 'update', id: string): void }>();

const { t } = useLocale();

const current = computed<string>(() => {
  const id = props.items.find(({ active }) => active)?.id;

  return t(`categories.${id}`);
});

const onClick = (id: string, cb?: CallbackFunction) => {
  emit('update', id);

  if (typeof cb === 'function') {
    cb();
  }
};
</script>

<template>
  <div
    v-if="props.items.length"
    class="grid__categories"
  >
    <Popover
      v-slot="{ open }"
      class="grid__categories-popover"
    >
      <Float
        placement="bottom-start"
        :offset="{
          mainAxis: 15
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
          class="grid__categories-button"
          :class="{
            'grid__categories-button--active': open
          }"
        >
          <div class="grid__categories-current">
            <span class="grid__categories-title">
              {{ current }}
            </span>
            <IconChevron class="grid__categories-icon" />
          </div>
        </PopoverButton>
        <PopoverPanel
          v-slot="{ close }"
          class="grid__categories-dropdown"
        >
          <ul class="grid__categories-list">
            <li
              v-for="item in props.items"
              :key="item.id"
              class="grid__categories-item"
            >
              <a
                href="#"
                class="grid__categories-link"
                role="menuitem"
                @click.prevent="onClick(item.id, close)"
              >
                <div class="grid__categories-title">
                  {{ item.title }}
                  <span class="grid__categories-counter">{{ item.total }}</span>
                </div>
              </a>
            </li>
          </ul>
        </PopoverPanel>
      </Float>
    </Popover>
  </div>
</template>

<style>
.grid__categories {}

button.grid__categories-button {
  @apply w-full text-left text-lg dark:text-dusky-50 xl:text-2xl font-bold outline-none cursor-pointer pl-4 md:pl-5 pr-2 md:pr-3 py-3 bg-white dark:bg-neutral-900 rounded-xl border-2 border-transparent;
}

button.grid__categories-button--active {
  @apply border-sky-600;
}

.grid__categories-current {
  @apply flex items-center justify-between;
}

.grid__categories-title {
  @apply whitespace-nowrap;
}

.grid__categories-icon {
  @apply translate-y-0.5 w-7 stroke-neutral-200 dark:stroke-dusky-700 ml-3;
}

.grid__categories-button--active .grid__categories-icon {
  @apply stroke-sky-600 dark:stroke-sky-600;
}

.grid__categories-dropdown {
  @apply bg-white dark:bg-neutral-900 rounded-xl shadow overflow-hidden shadow-neutral-300 dark:shadow-black;
}

.grid__categories-list {
  @apply block list-none;
}

.grid__categories-item {}

.grid__categories-link {
  @apply block py-1.5 px-4 md:text-lg hover:bg-neutral-100 dark:text-dusky-400 dark:hover:bg-neutral-800 dark:hover:text-white transition;
}

.grid__categories-title {
  @apply flex items-center whitespace-nowrap;
}

.grid__categories-counter {
  @apply inline-flex justify-center items-center ml-2 w-5 h-5 text-[12px] font-semibold text-sky-600 dark:text-sky-400 bg-neutral-200 dark:bg-neutral-800 rounded-full;
}
</style>
