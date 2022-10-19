import { createYandexMetrika } from '@plugins/YandexMetrika';

import config from '@src/config';

const { mode, yandexMetrikaId: id } = config;

const { metrika, plugin } = createYandexMetrika({
  id,
  mode,
  debug: (mode === 'development'),
});

export {
  metrika,
};

export default plugin;
