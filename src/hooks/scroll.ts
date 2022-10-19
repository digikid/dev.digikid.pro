import { ref } from 'vue';

const elements = [document.documentElement, document.body];

export const useScroll = (duration = 300) => {
  const y = ref<number>(window.scrollY);
  const isDisabled = ref<boolean>(elements.some((el) => el.classList.contains('is-locked')));

  const disable = () => {
    y.value = window.scrollY;

    setTimeout(() => {
      elements.forEach((el) => el.classList.add('is-locked'));

      isDisabled.value = true;
    }, duration);
  };

  const enable = () => {
    elements.forEach((el) => el.classList.remove('is-locked'));

    isDisabled.value = false;

    window.scrollTo(0, y.value);
  };

  return {
    y,
    isDisabled,
    enable,
    disable,
  };
};
