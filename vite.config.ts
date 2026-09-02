import { defineConfig, mergeConfig } from 'vite';

import { createBaseConfig } from './vite.config.base.ts';
import { createDevConfig } from './vite.config.dev.ts';
import { createProdConfig } from './vite.config.prod.ts';

export default defineConfig(({ mode }) => {
    const baseConfig = createBaseConfig();
    const envConfig = mode === 'production' ? createProdConfig() : createDevConfig();

    return mergeConfig(baseConfig, envConfig);
});
