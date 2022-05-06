/// <reference types="vite/client" />

interface Window {
    ethereum: any
}

interface ImportMetaEnv {
    readonly VITE_CLAIM_YEAR: number;
    readonly VITE_DAPP_URL: string;
    readonly VITE_CONTRACT_ADDRESS: string;
    readonly VITE_CLAIM_ADDRESS: string;
    readonly VITE_NETWORK: string;
    readonly VITE_DEADLINE: string;
    readonly VITE_PUBLIC_PRICE: number;
    readonly VITE_SERVER_URL: string;
    readonly VITE_BUILD_PATH?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}