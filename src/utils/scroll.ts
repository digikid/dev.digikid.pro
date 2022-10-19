import { easeInOutCubic } from '@utils/easing';

const getTop = (el: Element, start: number) => ((el.nodeName === 'HTML') ? -start : el.getBoundingClientRect().top + start);

type ScrollOptions = {
  offset?: number;
  duration?: number;
  container?: Element | Window;
  easingFunction?: EasingFunction;
};

const defaults = {
  offset: 0,
  duration: 400,
  container: window,
  easingFunction: easeInOutCubic,
};

export const smoothScroll = (el: any, options: ScrollOptions = {}) => {
  const container = options.container || defaults.container;
  const offset = options.offset || defaults.offset;
  const duration = options.duration || defaults.duration;
  const easingFunction = options.easingFunction || defaults.easingFunction;

  const clock = Date.now();
  const start = (container === window) ? window.scrollY : (container as HTMLElement).scrollTop;

  let end = offset || 0;

  if ((typeof el === 'string') || (el instanceof HTMLElement)) {
    const target = (typeof el === 'string') ? document.querySelector(el) : el;

    if (target) {
      end += getTop(target, start);
    } else return;
  } else if (typeof el === 'number') {
    end += el;
  } else return;

  const step = () => {
    const elapsed = Date.now() - clock;
    const scrolling = elapsed < duration;
    const position = scrolling ? start + (end - start) * easingFunction(elapsed / duration) : end;

    if (scrolling) {
      requestAnimationFrame(step);
    }

    if (container === window) {
      container.scrollTo(0, position);
    } else if (container instanceof HTMLElement) {
      container.scrollTop = position;
    }
  };

  step();
};
