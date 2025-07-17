export {};

interface MutationObserverMock extends MutationObserver {
  trigger(mutations: Partial<MutationRecord>[]): void;
}

declare global {
  namespace NodeJS {
    interface Global {
      track: () => void;
      config: object;
      MutationObserver: object;
    }
  }
  interface Window {
    config: {
      iam: {
        clientId: string;
        oauthDomain: string;
      };
      tracker: {
        appId: string;
        host: string;
        jsFile: string;
      };
      apiServices: {
        [key: string]: string;
      };
    };
    _mutation_observers: MutationObserverMock[];
  }
  function track(param1?: string, param2?: Object, param3?: Object): () => void;
}
