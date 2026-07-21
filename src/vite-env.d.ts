/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onRegistered?: (swRegistration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: any) => void;
    onOfflineReady?: () => void;
    onNeedRefresh?: () => void;
  }

  export function registerSW(options?: RegisterSWOptions): () => Promise<void>;
}
