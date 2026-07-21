/// <reference types="vite/client" />

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onRegistered?: (
      swRegistration: ServiceWorkerRegistration | undefined,
    ) => void;
    onRegisterError?: (error: unknown) => void;
    onOfflineReady?: () => void;
    onNeedRefresh?: () => void;
  }

  export function registerSW(options?: RegisterSWOptions): () => Promise<void>;
}
