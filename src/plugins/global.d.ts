import { App } from 'vue';

declare global {
  declare namespace YandexMetrika {
    interface InitOptions {
      accurateTrackBounce?: boolean | number;
      childIframe?: boolean;
      clickmap?: boolean;
      defer?: boolean;
      ecommerce?: boolean | string | any[];
      params?: VisitOptions | VisitOptions[];
      userParams?: UserOptions;
      trackHash?: boolean;
      trackLinks?: boolean;
      trustedDomains?: string[];
      type?: number;
      ut?: 'noindex';
      webvisor?: boolean;
      triggerEvent?: boolean;
    }

    interface PluginOptions extends InitOptions {
      id: number;
      mode?: string;
      debug?: boolean;
      useRouter?: boolean;
    }

    interface NotBounceOptions {
      callback: () => void;
      ctx?: any;
    }

    interface VisitOptions {
      order_price?: number;
      currency?: string;

      [key: string]: any;
    }

    interface UserOptions {
      UserID?: number;

      [key: string]: any;
    }

    interface ExtLinkOptions<T> {
      callback?(this: T): void;
      ctx?: T;
      params?: VisitOptions;
      title?: string;
    }

    interface FileOptions<T> {
      callback?(this: T): void;
      ctx?: T;
      params?: VisitOptions;
      referer?: string;
      title?: string;
    }

    interface HitOptions<T> {
      callback?(this: T): void;
      ctx?: T;
      params?: VisitOptions;
      referer?: string;
      title?: string;
    }

    interface NotBounceOptions<T> {
      callback?(this: T): void;
      ctx?: T;
    }

    interface Event {
      (id: number, eventName: 'init', options: InitOptions): void;
      (id: number, eventName: 'addFileExtension', extensions: string | string[]): void;
      <T>(id: number, eventName: 'extLink', url: string, options?: ExtLinkOptions<T>): void;
      <T>(id: number, eventName: 'file', url: string, options?: FileOptions<T>): void;
      (id: number, eventName: 'getClientID', callback: (clientID: string) => void): void;
      <T>(id: number, eventName: 'hit', url: string, options?: HitOptions<T>): void;
      <T>(id: number, eventName: 'notBounce', options?: NotBounceOptions<T>): void;
      (id: number, eventName: 'params', options: VisitOptions | VisitOptions[]): void;
      <T>(id: number, eventName: 'reachGoal', target: string, options?: VisitOptions, callback?: (this: T) => void, ctx?: T): void;
      (id: number, eventName: 'replacePhones'): void;
      (id: number, eventName: 'setUserID', userID: string): void;
      (id: number, eventName: 'userParams', options: UserOptions): void;
    }

    interface Counter {
      addFileExtension(extensions: string | string[]): void;

      extLink<T>(url: string, options?: ExtLinkOptions<T>): void;

      file<T>(url: string, options?: FileOptions<T>): void;

      getClientID(callback: (clientID: string) => void): void;

      hit<T>(url: string, options?: HitOptions<T>): void;

      notBounce<T>(options?: NotBounceOptions<T>): void;

      params(options: VisitOptions | VisitOptions[]): void;

      reachGoal<T>(target: string, options?: VisitOptions, callback?: (this: T) => void, ctx?: T): void;

      replacePhones(): void;

      setUserID(userID: string): void;

      userParams(options: UserOptions): void;
    }

    interface Return {
      metrika: Counter;
      plugin: (app: App) => void;
    }
  }

  declare interface Window {
    ym: YandexMetrika.Event;
    ymCounters?: Record<string, YandexMetrika.Counter>;
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $metrika: YandexMetrika.Counter;
  }
}

export default global;
