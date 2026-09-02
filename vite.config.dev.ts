import { type UserConfig } from 'vite';

export function createDevConfig(): UserConfig {
    return {
        server: {
            port: 5000,
            open: true,
        },
    };
}
