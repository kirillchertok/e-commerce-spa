import { type UserConfig } from 'vite';

export function createDevConfig(): UserConfig {
    return {
        server: {
            port: 5173,
            open: true,
        },
    };
}
