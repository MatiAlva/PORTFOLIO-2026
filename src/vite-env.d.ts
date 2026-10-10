/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_ANALYTICS_PROVIDER?: string;
  readonly VITE_ANALYTICS_ID?: string;
  readonly VITE_ANALYTICS_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
