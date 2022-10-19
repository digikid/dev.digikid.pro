import type { App } from 'vue';

const defaults = {
  mode: 'development',
  debug: false,
  useRouter: false,
  accurateTrackBounce: true,
  childIframe: false,
  clickmap: true,
  defer: false,
  ecommerce: false,
  params: [],
  userParams: {},
  trackHash: false,
  trackLinks: true,
  type: 0,
  webvisor: false,
  triggerEvent: false,
};

const methods: (keyof YandexMetrika.Counter)[] = [
  'addFileExtension',
  'extLink',
  'file',
  'getClientID',
  'hit',
  'notBounce',
  'params',
  'reachGoal',
  'replacePhones',
  'setUserID',
  'userParams',
];

const createPlugin = (metrika: YandexMetrika.Counter, useRouter = false) => (app: App) => {
  const { $router } = app.config.globalProperties;

  if (useRouter && $router) {
    $router.afterEach((to: any, from: any) => {
      const params: Record<string, any> = {
        title: document.title,
      };

      if (to.path !== from.path) {
        params.referer = from.path;
      }

      metrika.hit(to.path, params);
    });
  }

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$metrika = metrika;

  app.provide('metrika', metrika);
};

export const createYandexMetrika = (options: YandexMetrika.PluginOptions): YandexMetrika.Return => {
  const {
    id, debug, mode, useRouter, ...initOptions
  } = ({ ...defaults, ...options });

  if (!window.ymCounters) {
    window.ymCounters = {};
  }

  if (!window.ymCounters[id]) {
    if ((typeof id === 'number') && (mode === 'production')) {
      (function (m, e, t, r, i, k, a) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign,prefer-rest-params
        m[i] = m[i] || function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign,prefer-rest-params
          (m[i].a = m[i].a || []).push(arguments);
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        m[i].l = 1 * new Date();
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-sequences,no-param-reassign,prefer-destructuring,
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
      }(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym'));

      if (typeof window.ym === 'function') {
        window.ym(id, 'init', initOptions);
      }
    }

    window.ymCounters[id] = methods.reduce((acc, key) => {
      acc[key] = function (...args: any[]) {
        if (typeof id === 'number') {
          if (debug) {
            console.info(`[Yandex Metrika #${id}] ${key}: `, args);
          }

          if ((typeof window.ym === 'function') && (mode === 'production')) {
            window.ym(id, key as any, ...(args as []));
          }
        } else {
          console.warn(`[Yandex Metrika | ${key}]: Counter id is required.`);
        }
      };

      return acc;
    }, {} as YandexMetrika.Counter);
  }

  const metrika = window.ymCounters[id];

  return {
    metrika,
    plugin: createPlugin(metrika, useRouter),
  };
};
