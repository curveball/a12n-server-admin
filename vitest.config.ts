import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        globals: true,
        include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
        exclude: ['node_modules/**/*', 'src/tests/integration/**/*'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
