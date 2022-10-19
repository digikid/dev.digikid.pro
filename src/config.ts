const { MODE: mode, DEV: dev, PROD: prod } = import.meta.env;

export default {
  prefix: 'DK_SITE',
  yandexMetrikaId: 47234313,
  gradients: [
    'from-purple-600 to-sky-600',
    'from-sky-600 to-blue-600',
    'from-fuchsia-600 to-purple-600',
    'from-amber-600 to-rose-600',
    'from-pink-600 to-rose-600',
    'from-rose-600 to-red-500',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-sky-600',
  ],
  mode,
  dev,
  prod,
};
