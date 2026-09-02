import { type UserConfig } from 'vite';

export function createProdConfig(): UserConfig {
    return {
        build: {
            sourcemap: false,
        },
    };
}
