interface ImportMetaEnv {
    readonly VITE_BASE_API: string;
    readonly VITE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
