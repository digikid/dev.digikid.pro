export const browser = (() => {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(
    /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
  ) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

    return {
      name: 'ie',
      version: tem[1] || '',
    };
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

    if (tem !== null) {
      return {
        name: tem[1].replace('OPR', 'opera'),
        version: tem[2],
      };
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }

  return {
    name: M[0].toLowerCase(),
    version: M[1],
  };
})();

export const safari = browser.name === 'safari';
export const chrome = browser.name === 'chrome';
export const firefox = browser.name === 'firefox';
export const ie = (browser.name === 'ie');
export const edge = (browser.name === 'edge');

const browsers = ['safari', 'chrome', 'firefox', 'ie', 'edge'].reduce((acc, key) => {
  acc[key] = (browser.name === key);

  return acc;
}, {} as Record<string, boolean>);

const platforms = Object.entries({
  android: 'Android',
  blackBerry: 'BlackBerry',
  windowsMobile: 'IEMobile',
  ios: 'iPhone|iPad|iPod',
}).reduce((acc, [key, value]) => {
  acc[key] = (new RegExp(value, 'i')).test(navigator.userAgent);

  return acc;
}, {} as Record<string, boolean>);

export const apple = platforms.ios || browsers.safari;
export const microsoft = (browsers.ie || browsers.edge || platforms.windowsMobile);

export const mobile = ['android', 'blackBerry', 'windowsMobile', 'ios'].some((key) => platforms[key]);

export const desktop = !mobile;

export const locale = (navigator.userLanguage || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage || 'en').substring(0, 2).toLowerCase();

export const colorMode = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export default {
  ...browsers,
  ...platforms,
  browser,
  microsoft,
  mobile,
  desktop,
  locale,
  colorMode,
};
