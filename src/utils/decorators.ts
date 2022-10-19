export const debounce = (fn: CallbackFunction, delay = 200): CallbackFunction => {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    const context = this as any;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const throttle = (fn: CallbackFunction, delay = 67): CallbackFunction => {
  let timeout: ReturnType<typeof setTimeout>;
  let timestamp: number;

  return function (this: any, ...args: any[]) {
    const context = this as any;

    const run = () => {
      fn.apply(context, args);

      timestamp = Date.now();
    };

    if (timestamp) {
      const ms = delay - (Date.now() - timestamp);

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        if (Date.now() - timestamp >= delay) {
          run();
        }
      }, ms);
    } else {
      run();
    }
  };
};
