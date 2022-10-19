<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  text?: string;
  date?: string;
  url?: string;
  gradient?: string;
  large?: boolean;
}>(), {
  text: '',
  date: '',
  url: '',
  gradient: '',
  large: false,
});
</script>

<template>
  <div
    class="relative"
    :class="(props.large ? '2xl:col-span-2' : '')"
  >
    <component
      :is="props.url ? 'a' : 'div'"
      :href="props.url || null"
      :target="props.url ? '_blank' : null"
      class="relative flex flex-col justify-end w-full h-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl py-4 px-5 transition-transform duration-400 hover:scale-[97%]"
    >
      <div
        v-if="props.date"
        class="absolute top-0 right-0 text-white bg-gradient-to-r px-3 py-1.5 rounded-bl-2xl"
        :class="(props.large ? 'from-rose-500 to-amber-600' : 'from-fuchsia-600 to-purple-600')"
      >
        {{ props.date }}
      </div>
      <div>
        <div
          v-if="$slots.logo"
          class="w-1/2 mb-6"
        >
          <slot name="logo" />
        </div>
        <div
          class="font-black leading-snug lg:leading-tight sm:text-[3.25vw] md:text-[2.5vw] lg:text-[1.75vw] xl:text-[1.5vw] pr-12"
          :class="(props.large ? 'text-[7.5vw] 2xl:text-[1.75vw]' : 'text-[5.25vw] 2xl:text-[1.25vw]')"
        >
          {{ props.title }}
        </div>
      </div>
      <div
        v-if="props.text"
        class="mt-2"
      >
        <div class="flex items-center text-neutral-400 dark:text-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="relative top-0.5 shrink-0 self-start w-5 h-5 mr-1.5"
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
            <path d="M12 12v.01" />
            <path d="M19.071 4.929c-1.562 -1.562 -5.994 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 5.994 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9" />
            <path d="M4.929 4.929c-1.562 1.562 .337 5.994 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -5.994 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242" />
          </svg>
          {{ props.text }}
        </div>
      </div>
    </component>
  </div>
</template>
